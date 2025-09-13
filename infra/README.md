# Infra

This folder contains container and orchestration assets for local development.

## Layout

- docker/
  - backend.Dockerfile: Flask backend image
  - frontend.Dockerfile: Vite frontend image
  - docker-compose.yml: Runs Postgres, backend, frontend

## Usage

Prerequisites: Docker Desktop running.

From repo root:

```bash
# Build and start
docker compose -f infra/docker/docker-compose.yml up -d --build

# Tail logs
docker compose -f infra/docker/docker-compose.yml logs -f backend

docker compose -f infra/docker/docker-compose.yml logs -f frontend

# Stop
docker compose -f infra/docker/docker-compose.yml down

# Stop and remove DB volume
docker compose -f infra/docker/docker-compose.yml down -v
```

Endpoints:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000/health
- Postgres: localhost:5432 (db: prompt_builder, user: postgres, pass: postgres)
