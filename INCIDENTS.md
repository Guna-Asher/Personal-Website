# Incident and Recovery Log

## Incident 1 — Nginx 502 from port mismatch

### Symptom

Nginx returned:

```text
502 Bad Gateway
```

### Change

Compose was changed from:

```text
127.0.0.1:3000:3000
```

to:

```text
127.0.0.1:3001:3000
```

while Nginx still proxied to port 3000.

### Diagnosis

Direct checks showed:

```text
:3001 → 200
:3000 → connection refused
```

Nginx logs showed an upstream connection failure.

### Root cause

Nginx and Docker disagreed about the host port.

### Recovery

Restore the 3000 mapping and redeploy.

### Lesson

A reverse proxy can fail even when the application container itself is healthy.

---

## Incident 2 — Deployment readiness race

### Symptom

An immediate HTTP check after:

```bash
docker compose up -d
```

failed while the container was still starting.

### Root cause

The deployment assumed startup was instantaneous.

### Recovery

Add retries and require:

```text
Docker health = healthy
AND
HTTP endpoint = reachable
```

### Lesson

Started, ready, and healthy are different states.

---

## Incident 3 — EC2 OOM during Docker build

### Symptom

The deployment failed during:

```text
RUN npm run build
```

with:

```text
signal SIGKILL
```

### Diagnosis

The host had about 1.9 GiB RAM and no swap. Kernel logs explicitly recorded the OOM killer terminating the Next.js build process.

### Recovery

Added a persistent 2 GiB swap file and verified the same Docker build completed successfully.

### Lesson

For SIGKILL on Linux, inspect kernel OOM logs before assuming an application defect.

---

## Incident 4 — deploy.sh executable bit lost

### Symptom

GitHub Actions reached EC2 but received:

```text
./deploy.sh: Permission denied
```

### Diagnosis

Git tracked the file as `100644` rather than `100755`.

### Recovery

Restore the executable bit, stage it, commit it, and push it.

### Lesson

File permissions are part of the Git artifact and can break automation.

---

## Incident response method

```text
1. Read the failing workflow step.
2. Identify the exact failing boundary.
3. Check the corresponding logs.
4. Change only that layer.
5. Re-test the smallest affected component.
6. Re-run the pipeline.
7. Verify production independently.
```
