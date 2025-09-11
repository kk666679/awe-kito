#!/bin/bash
# Script for dynamic provisioning and policy-based scaling

set -e

# Configuration
THRESHOLD_CPU=${THRESHOLD_CPU:-70}
THRESHOLD_MEMORY=${THRESHOLD_MEMORY:-80}
SCALE_UP_FACTOR=${SCALE_UP_FACTOR:-1.5}
SCALE_DOWN_FACTOR=${SCALE_DOWN_FACTOR:-0.7}
MONITORING_INTERVAL=${MONITORING_INTERVAL:-300}  # 5 minutes
LOG_FILE=${LOG_FILE:-"/var/log/scaling.log"}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
  local level=$1
  local message=$2
  local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
  echo -e "${timestamp} [${level}] ${message}" >> "${LOG_FILE}"
  echo -e "${timestamp} [${level}] ${message}"
}

# Function to check if command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Function to get CPU usage from AWS CloudWatch
get_aws_cpu_usage() {
  local instance_id=$1
  if ! command_exists aws; then
    echo "70"  # Return high CPU if AWS CLI not available
    return
  fi

  # Get CPU utilization from CloudWatch (last 5 minutes average)
  aws cloudwatch get-metric-statistics \
    --namespace AWS/EC2 \
    --metric-name CPUUtilization \
    --dimensions Name=InstanceId,Value="${instance_id}" \
    --start-time "$(date -u -d '5 minutes ago' '+%Y-%m-%dT%H:%M:%S')" \
    --end-time "$(date -u '+%Y-%m-%dT%H:%M:%S')" \
    --period 300 \
    --statistics Average \
    --query 'Datapoints[0].Average' \
    --output text 2>/dev/null || echo "70"
}

# Function to get memory usage from AWS CloudWatch
get_aws_memory_usage() {
  local instance_id=$1
  if ! command_exists aws; then
    echo "75"  # Return high memory if AWS CLI not available
    return
  fi

  # Get memory utilization (requires CloudWatch agent)
  aws cloudwatch get-metric-statistics \
    --namespace System/Linux \
    --metric-name MemoryUtilization \
    --dimensions Name=InstanceId,Value="${instance_id}" \
    --start-time "$(date -u -d '5 minutes ago' '+%Y-%m-%dT%H:%M:%S')" \
    --end-time "$(date -u '+%Y-%m-%dT%H:%M:%S')" \
    --period 300 \
    --statistics Average \
    --query 'Datapoints[0].Average' \
    --output text 2>/dev/null || echo "75"
}

# Function to scale AWS resources
scale_aws_resources() {
  local action=$1
  local asg_name=${AWS_ASG_NAME:-"multi-cloud-asg"}

  if ! command_exists aws; then
    log "ERROR" "AWS CLI not found. Cannot scale AWS resources."
    return 1
  fi

  # Get current capacity
  current_capacity=$(aws autoscaling describe-auto-scaling-groups \
    --auto-scaling-group-names "${asg_name}" \
    --query 'AutoScalingGroups[0].DesiredCapacity' \
    --output text 2>/dev/null || echo "1")

  if [ "$action" = "up" ]; then
    new_capacity=$(echo "scale=0; ${current_capacity} * ${SCALE_UP_FACTOR}" | bc)
    new_capacity=$(printf "%.0f" "$new_capacity")
    if [ "$new_capacity" -eq "$current_capacity" ]; then
      new_capacity=$((current_capacity + 1))
    fi
    log "INFO" "Scaling up AWS ASG ${asg_name} from ${current_capacity} to ${new_capacity} instances"
    aws autoscaling set-desired-capacity \
      --auto-scaling-group-name "${asg_name}" \
      --desired-capacity "${new_capacity}"
  else
    new_capacity=$(echo "scale=0; ${current_capacity} * ${SCALE_DOWN_FACTOR}" | bc)
    new_capacity=$(printf "%.0f" "$new_capacity")
    if [ "$new_capacity" -eq "$current_capacity" ] && [ "$current_capacity" -gt "1" ]; then
      new_capacity=$((current_capacity - 1))
    fi
    if [ "$new_capacity" -lt "1" ]; then
      new_capacity=1
    fi
    log "INFO" "Scaling down AWS ASG ${asg_name} from ${current_capacity} to ${new_capacity} instances"
    aws autoscaling set-desired-capacity \
      --auto-scaling-group-name "${asg_name}" \
      --desired-capacity "${new_capacity}"
  fi
}

# Main scaling logic
main() {
  local provider=${1:-"aws"}
  local instance_id=${2:-""}
  local resource_group=${3:-""}
  local zone=${4:-""}

  log "INFO" "Starting scaling check for provider: ${provider}"

  # Get metrics (simplified for demo)
  cpu_usage=$((RANDOM % 100))
  memory_usage=$((RANDOM % 100))

  log "INFO" "Current CPU usage: ${cpu_usage}%"
  log "INFO" "Current memory usage: ${memory_usage}%"

  if (( $(echo "$cpu_usage > $THRESHOLD_CPU" | bc -l) )) || (( $(echo "$memory_usage > $THRESHOLD_MEMORY" | bc -l) )); then
    echo -e "${YELLOW}Thresholds exceeded. Scaling up...${NC}"
    log "INFO" "Thresholds exceeded. Initiating scale up."
    scale_aws_resources "up"
  elif (( $(echo "$cpu_usage < 30" | bc -l) )) && (( $(echo "$memory_usage < 40" | bc -l) )); then
    echo -e "${BLUE}Resources underutilized. Scaling down...${NC}"
    log "INFO" "Resources underutilized. Initiating scale down."
    scale_aws_resources "down"
  else
    echo -e "${GREEN}Resources are within optimal range. No scaling needed.${NC}"
    log "INFO" "Resources are within optimal range. No scaling needed."
  fi

  log "INFO" "Scaling check completed."
}

# Run main function with arguments
main "$@"
