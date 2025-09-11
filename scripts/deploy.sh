#!/bin/bash
# Script to deploy the Next.js app to multiple cloud providers

set -e

# Configuration
APP_NAME=${APP_NAME:-"multi-cloud-app"}
ENVIRONMENT=${ENVIRONMENT:-"production"}
BUILD_DIR=${BUILD_DIR:-"./build"}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting deployment to multi-cloud providers...${NC}"
echo "App Name: $APP_NAME"
echo "Environment: $ENVIRONMENT"
echo "Build Directory: $BUILD_DIR"

# Function to check if command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Function to deploy to AWS
deploy_aws() {
  echo -e "${YELLOW}Deploying to AWS...${NC}"

  if ! command_exists aws; then
    echo -e "${RED}AWS CLI not found. Please install AWS CLI first.${NC}"
    return 1
  fi

  # Check AWS credentials
  if ! aws sts get-caller-identity >/dev/null 2>&1; then
    echo -e "${RED}AWS credentials not configured or invalid.${NC}"
    return 1
  fi

  # Build the application
  echo "Building application..."
  npm run build

  # Create S3 bucket if it doesn't exist
  BUCKET_NAME="${APP_NAME}-${ENVIRONMENT}-$(date +%Y%m%d-%H%M%S)"
  aws s3 mb "s3://${BUCKET_NAME}" --region us-east-1

  # Upload build files to S3
  echo "Uploading files to S3 bucket: ${BUCKET_NAME}"
  aws s3 sync "${BUILD_DIR}" "s3://${BUCKET_NAME}" --delete

  # Enable static website hosting
  aws s3 website "s3://${BUCKET_NAME}" --index-document index.html --error-document error.html

  echo -e "${GREEN}AWS deployment completed!${NC}"
  echo "S3 Website URL: http://${BUCKET_NAME}.s3-website-us-east-1.amazonaws.com"
}

# Function to deploy to Azure
deploy_azure() {
  echo -e "${YELLOW}Deploying to Azure...${NC}"

  if ! command_exists az; then
    echo -e "${RED}Azure CLI not found. Please install Azure CLI first.${NC}"
    return 1
  fi

  # Check Azure login
  if ! az account show >/dev/null 2>&1; then
    echo -e "${RED}Not logged in to Azure. Please run 'az login' first.${NC}"
    return 1
  fi

  # Build the application
  echo "Building application..."
  npm run build

  # Set variables
  RESOURCE_GROUP="${APP_NAME}-rg"
  STORAGE_ACCOUNT="${APP_NAME}storage${RANDOM}"
  CONTAINER_NAME="${APP_NAME}-container"

  # Create resource group
  echo "Creating resource group: ${RESOURCE_GROUP}"
  az group create --name "${RESOURCE_GROUP}" --location eastus

  # Create storage account
  echo "Creating storage account: ${STORAGE_ACCOUNT}"
  az storage account create --name "${STORAGE_ACCOUNT}" --resource-group "${RESOURCE_GROUP}" --sku Standard_LRS

  echo -e "${GREEN}Azure deployment completed!${NC}"
  echo "Resource Group: ${RESOURCE_GROUP}"
  echo "Storage Account: ${STORAGE_ACCOUNT}"
}

# Main deployment logic
case "${1:-all}" in
  "aws")
    deploy_aws
    ;;
  "azure")
    deploy_azure
    ;;
  "all")
    echo "Deploying to all cloud providers..."
    deploy_aws || echo -e "${RED}AWS deployment failed${NC}"
    deploy_azure || echo -e "${RED}Azure deployment failed${NC}"
    ;;
  *)
    echo -e "${RED}Usage: $0 {aws|azure|all}${NC}"
    exit 1
    ;;
esac

echo -e "${GREEN}Deployment process completed!${NC}"
