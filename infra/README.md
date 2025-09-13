# Infra

This folder contains container and orchestration assets for local development.

## Layout

- docker/
  - backend.Dockerfile: Flask backend image
  - frontend.Dockerfile: Vite frontend image
  - docker-compose.yml: Runs Postgres, backend, frontend (uses root .env file)

## Setup

Prerequisites: Docker Desktop running.

### 1. Configure Environment

From repo root:

```bash
# Copy environment template (if .env doesn't exist)
cp env.example .env

# Edit the .env file with your secure values
# At minimum, change:
# - POSTGRES_PASSWORD (and DB_PASSWORD to match)
# - SECRET_KEY
# 
# For Docker, ensure these are set:
# - DB_HOST=db
# - VITE_BACKEND_URL=http://backend:5000
```

**Important**: Never commit the `.env` file to version control. It contains sensitive information.

### 2. Run the Stack

```bash
# Build and start all services
docker compose -f infra/docker/docker-compose.yml up -d --build

# Tail logs
docker compose -f infra/docker/docker-compose.yml logs -f backend
docker compose -f infra/docker/docker-compose.yml logs -f frontend

# Stop services
docker compose -f infra/docker/docker-compose.yml down

# Stop and remove DB volume (WARNING: deletes all data)
docker compose -f infra/docker/docker-compose.yml down -v
```

## Endpoints

- Frontend: http://localhost:3000
- Backend: http://localhost:5001/health (mapped from container port 5000)
- Postgres: localhost:5433 (mapped from container port 5432)

## Environment Variables

The stack uses the following key environment variables (defined in root `.env`):

- `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`: PostgreSQL configuration
- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`: Backend database connection
- `SECRET_KEY`: Flask secret key for sessions/security
- `VITE_BACKEND_URL`: Frontend API endpoint configuration

## Troubleshooting

- If ports are already in use, stop local services or modify port mappings in docker-compose.yml
- Check logs with `docker compose logs <service_name>`
- Verify environment variables are loaded: `docker compose config`
