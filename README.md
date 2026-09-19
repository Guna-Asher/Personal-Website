# Personal Website — Production Infrastructure

A production-style personal portfolio application used as the workload for a hands-on DevOps / infrastructure project.

The application is a Next.js portfolio site. The infrastructure around it demonstrates a complete delivery path from GitHub to an AWS EC2 host.

```text
Developer
   │
   ▼
GitHub main
   │
   ├── CI
   │    ├── npm ci
   │    ├── lint
   │    └── production build
   │
   └── Deploy
        │
        ▼
     SSH to EC2
        │
        ▼
   deploy.sh <exact commit>
        │
        ├── validate Compose
        ├── validate port mapping
        ├── save previous image
        ├── Docker build
        ├── start container
        └── wait for health + HTTP
        │
        ▼
      Nginx :80
        │
        ▼
  127.0.0.1:3000
        │
        ▼
   Next.js container
        │
        ▼
 Production Smoke Test
```

## What this project demonstrates

- Linux administration on Ubuntu
- AWS EC2 deployment
- Docker multi-stage builds
- Docker Compose
- Non-root container execution
- Docker health checks
- Nginx reverse proxying
- Localhost-only application port binding
- Git and GitHub workflow
- GitHub Actions CI/CD
- SSH deployment with host-key verification
- Exact-commit deployments
- Deployment preflight validation
- Readiness checks
- Basic automated rollback
- Production smoke testing
- Incident diagnosis and recovery
- Resource troubleshooting on a small EC2 instance

## Application stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide
- Node.js 22 runtime in Docker

The Next.js production configuration uses standalone output.

## Production architecture

```text
Internet
   │
   ▼
AWS EC2
   │
   ├── Nginx :80
   │      │
   │      ▼
   │  127.0.0.1:3000
   │      │
   │      ▼
   │  Docker Compose
   │      │
   │      ▼
   │  Next.js container
   │
   └── SSH :22
```

The application port is deliberately bound to loopback:

```yaml
ports:
  - "127.0.0.1:3000:3000"
```

Nginx is the public HTTP entry point.

## AWS infrastructure

The current v1 deployment uses:

- EC2 instance type: `t3.small`
- Region: `ap-south-2` (Asia Pacific — Hyderabad)
- Ubuntu Linux
- Elastic IP: `16.113.102.9`
- Nginx public listener: `80`
- Application listener: `127.0.0.1:3000`
- EBS root volume: gp3

The Elastic IP provides a stable public address across EC2 stop/start operations.

## Docker design

The Dockerfile has three stages:

1. `deps` — installs dependencies with `npm ci`
2. `builder` — runs the Next.js production build
3. `runner` — contains the standalone production runtime

The final container runs as the non-root user `nextjs`.

A Docker health check requests `/` on `127.0.0.1:3000`.

## CI/CD

### CI

`.github/workflows/ci.yml` runs on pushes and pull requests to `main`.

It performs:

```text
checkout
→ Node.js 22
→ npm ci
→ npm run lint
→ npm run build
```

### Deployment

`.github/workflows/deploy.yml` starts after a successful CI workflow on `main`.

It configures SSH from the GitHub `production` environment, verifies the connection, and calls:

```bash
./deploy.sh '<CI commit SHA>'
```

The deployment script receives the exact SHA tested by CI.

### Production smoke test

`.github/workflows/smoke-test.yml` runs after a successful deployment and checks the public production endpoint with `curl`.

## Deployment behavior

`deploy.sh` validates:

```text
clean Git working tree
→ fetch repository
→ resolve requested commit
→ checkout exact commit
→ docker compose config --quiet
→ verify 127.0.0.1:3000 mapping
```

It then preserves the currently running image, builds the new image, starts the service, and waits for:

```text
Docker health = healthy
AND
HTTP http://127.0.0.1:3000 = successful
```

When a newly started container fails health verification, the script attempts to restore the previous image.

A Docker build failure occurs before `docker compose up`, so the existing running container is not intentionally replaced by that failed build.

## Health checks

On EC2:

```bash
cd ~/Personal-Website
bash scripts/healthcheck.sh
```

The script checks:

1. container exists
2. container health is `healthy`
3. application HTTP endpoint responds
4. Nginx/public endpoint responds

## Local development

```bash
npm install
npm run dev
npm run lint
npm run build
npm run start
```

Docker:

```bash
docker build -t guna-portfolio .
docker compose up --build
```

## Documentation

- `ARCHITECTURE.md` — system structure and traffic flow
- `RUNBOOK.md` — operational procedures
- `DECISIONS.md` — design decisions
- `INCIDENTS.md` — failures and recovery
- `SECURITY.md` — security posture and known limitations

## v1 status

v1 is the stable production baseline when:

```text
CI                    ✅
Deployment            ✅
Production smoke      ✅
Docker health         ✅
Application HTTP      ✅
Nginx                 ✅
localhost binding     ✅
```

Terraform is intentionally excluded from v1. Infrastructure as Code can be revisited in a later version.
