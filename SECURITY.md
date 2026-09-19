# Security and Production Posture

## Current protections

### Secrets

Deployment credentials are kept in the GitHub `production` environment and are not committed to the repository.

### SSH host verification

GitHub Actions uses a `known_hosts` value rather than disabling host verification.

### Non-root container

The application runs as the `nextjs` user inside the container.

### Network exposure

The application port is bound to:

```text
127.0.0.1:3000
```

Only Nginx is intended to serve public application traffic.

### Health checks

The container has a Docker health check and the deployment also checks HTTP readiness.

### Exact-commit deployment

The deployment workflow passes the CI-tested commit SHA to the server.

## Current limitations

This is a learning-oriented production-style deployment, not a fully hardened enterprise environment.

### HTTP only

The current public endpoint is HTTP. HTTPS is deferred until a domain/DNS setup is available.

### SSH exposure

The current EC2 security group permits SSH from the public internet. This should be tightened later.

### Single host

There is no load balancer, auto scaling, or failover host.

### Single container

There is only one application container.

### Manual AWS infrastructure

EC2 and network resources are managed manually for v1. Terraform is deferred.

### Small compute instance

The host is intentionally small and uses swap for build headroom.

## Security rules

Never commit:

```text
*.pem
.env
.env.local
private keys
AWS access keys
GitHub tokens
passwords
```

Do not disable SSH host verification simply to make deployment work.

Do not expose port 3000 publicly unless the architecture is intentionally changed.

## Future hardening

Potential future improvements:

```text
HTTPS + certificate
domain/DNS
restricted SSH ingress
least-privilege AWS identity
centralized logging
resource monitoring
backups
Infrastructure as Code
```
