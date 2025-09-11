-- Database initialization script for Awan Keusahawanan
-- This script runs when the PostgreSQL container starts for the first time

-- Create the main database if it doesn't exist
-- (This is handled by POSTGRES_DB environment variable in docker-compose.yml)

-- Set up extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";

-- Create indexes for better performance
-- These will be created after the Prisma schema is applied

-- Set up basic monitoring
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updatedAt = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Grant necessary permissions
-- These are handled by the POSTGRES_USER and POSTGRES_PASSWORD environment variables

-- Log successful initialization
DO $$
BEGIN
    RAISE NOTICE 'Awan Keusahawanan database initialized successfully';
END
$$;
