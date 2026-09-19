# Architecture

## Overview

The project separates the application workload from the delivery and runtime infrastructure around it.

The workload is a Next.js portfolio application.

The infrastructure provides source control, validation, containerization, deployment, reverse proxying, health verification, rollback behavior, and production smoke testing.

## Runtime topology

```text
                         Internet
                            │
                            │ HTTP :80
                            ▼
                    ┌─────────────────┐
                    │     AWS EC2     │
                    │    Ubuntu       │
                    │                 │
                    │  ┌───────────┐  │
                    │  │   Nginx   │  │
                    │  │    :80    │  │
                    │  └─────┬─────┘  │
                    │        │         │
                    │        ▼         │
                    │  127.0.0.1:3000 │
                    │        │         │
                    │  ┌─────▼──────┐  │
                    │  │   Docker    │  │
                    │  │  Compose    │  │
                    │  └─────┬──────┘  │
                    │        │         │
                    │  ┌─────▼──────┐  │
                    │  │   Next.js   │  │
                    │  │  container  │  │
                    │  └────────────┘  │
                    └─────────────────┘
```

The application is bound to `127.0.0.1:3000`, so internet clients do not connect directly to the container port.

## Deployment topology

```text
                 Git push / PR
                       │
                       ▼
                GitHub Actions
                       │
                       ▼
                      CI
              ┌────────┴────────┐
              │                 │
            lint              build
              │                 │
              └────────┬────────┘
                       │ success
                       ▼
                    Deploy
                       │
                  SSH to EC2
                       │
                       ▼
             deploy.sh <commit>
                       │
           ┌───────────┴───────────┐
           │                       │
       preflight                build
           │                       │
           │                       ▼
           │                 Docker image
           │                       │
           └──────────────┬────────┘
                          ▼
                     container
                          │
                  health + HTTP
                          │
                          ▼
                  Production Smoke
```

## Nginx

Nginx is the public HTTP entry point and proxies to `http://127.0.0.1:3000`.

The current configuration includes:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Docker

The image uses:

```text
deps
  ↓
builder
  ↓
runner
```

The runner contains the Next.js standalone output and runs as the `nextjs` non-root user.

## Health model

Three layers are checked:

1. Docker container health
2. host-local application HTTP
3. Nginx/public HTTP

GitHub also runs a production smoke test after a successful deployment.

## Failure boundaries

```text
Git failure
   ↓
stop

Compose validation failure
   ↓
stop

Port mapping mismatch
   ↓
stop

Docker build failure
   ↓
existing container remains

New container health failure
   ↓
rollback attempt
```
