# Architecture and Operations Decisions

## 1. Single EC2 host

**Decision:** use one EC2 host for v1.

**Reason:** keep Linux, Docker, Nginx, networking, and deployment behavior visible and understandable.

## 2. Docker Compose

**Decision:** use Docker Compose for the single application service.

**Reason:** the runtime definition is simple and version-controlled without introducing an orchestration platform.

## 3. Multi-stage Docker build

**Decision:** use `deps`, `builder`, and `runner` stages.

**Reason:** cache dependency installation and keep the production image focused.

## 4. Non-root container

**Decision:** run the application as `nextjs`.

**Reason:** avoid unnecessary root privileges inside the container.

## 5. Localhost-only application port

**Decision:** bind the host port as `127.0.0.1:3000:3000`.

**Reason:** Nginx is the public entry point.

## 6. Nginx reverse proxy

**Decision:** expose Nginx on port 80 and proxy to the local application.

**Reason:** provides a clear public-to-application boundary.

## 7. Exact-commit deployment

**Decision:** GitHub Actions passes the CI-tested commit SHA to `deploy.sh`.

**Reason:** deploy the same revision that passed CI.

## 8. Preflight validation

**Decision:** validate Git state, Compose configuration, and port mapping before replacement.

**Reason:** catch configuration mistakes before changing the running service.

## 9. Health-gated deployment

**Decision:** wait for both Docker health and HTTP readiness.

**Reason:** a process being started does not mean the service is ready.

## 10. Rollback

**Decision:** preserve the previous image and attempt rollback when the new container fails health verification.

**Reason:** provide a simple recovery path on a single host.

## 11. GitHub environment secrets

Deployment uses the GitHub `production` environment for:

```text
EC2_HOST
EC2_USER
DEPLOY_SSH_KEY
SSH_KNOWN_HOSTS
```

## 12. SSH host verification

**Decision:** use a managed `known_hosts` entry.

**Reason:** retain SSH host verification rather than disabling it.

## 13. 2 GiB swap

**Decision:** add persistent 2 GiB swap.

**Reason:** the EC2 host previously ran out of memory during the Next.js production build.

## 14. Elastic IP

**Decision:** associate one Elastic IP with the EC2 instance.

**Reason:** keep a stable public address across stop/start operations.

Current address:

```text
16.113.102.9
```

## 15. Terraform deferred

**Decision:** Terraform is excluded from v1.

**Reason:** finish the operational system while keeping the current AWS footprint and learning scope small.

## 16. HTTPS deferred

**Decision:** HTTPS is outside v1.

**Reason:** final domain/DNS setup is deferred.

v1 therefore should not be described as a fully hardened public production environment.
