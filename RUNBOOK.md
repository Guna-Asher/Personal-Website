# Production Runbook

## Start EC2

AWS Console:

```text
EC2 → Instances → select portfolio instance → Instance state → Start
```

Wait for the instance to be running and its status checks to pass.

Current Elastic IP:

```text
16.113.102.9
```

## SSH

```bash
ssh -i ~/.ssh/personal-website-deploy ubuntu@16.113.102.9
```

Never commit the private key.

## Basic health check

```bash
cd ~/Personal-Website
bash scripts/healthcheck.sh
```

Expected:

```text
Container health: healthy
HTTP check: OK
Nginx check: OK
System health check passed
```

## Check runtime

```bash
docker compose ps
docker ps
sudo nginx -t
sudo ss -lntp
```

Expected application exposure:

```text
127.0.0.1:3000
```

Expected public web listener:

```text
0.0.0.0:80
[::]:80
```

## Check memory

```bash
free -h
swapon --show
```

v1 uses a persistent 2 GiB swap file at:

```text
/swapfile
```

It is persisted through `/etc/fstab`.

## Normal deployment

Production deployment is performed through:

```text
push to main
→ CI
→ Deploy
→ Production Smoke Test
```

Avoid manually running `./deploy.sh` during normal releases.

## Logs

Application:

```bash
docker compose logs --tail=100 portfolio
```

Follow:

```bash
docker compose logs -f portfolio
```

Nginx:

```bash
sudo tail -n 100 /var/log/nginx/error.log
sudo tail -n 100 /var/log/nginx/access.log
```

## 502 Bad Gateway

Run:

```bash
docker compose ps
curl -I http://127.0.0.1:3000
sudo tail -n 100 /var/log/nginx/error.log
```

Known failure mode:

```text
Docker host port = 3001
Nginx upstream = 3000
```

The fix is to make the Compose host port and Nginx upstream agree.

## Docker build killed with SIGKILL

Run:

```bash
free -h
swapon --show
sudo dmesg -T | grep -Ei 'oom|out of memory|killed process|memory cgroup' | tail -30
```

The v1 host previously hit the Linux OOM killer during `npm run build`. Persistent 2 GiB swap was added and the build subsequently succeeded.

## deploy.sh permission denied

Check:

```bash
git ls-files --stage deploy.sh
```

Expected:

```text
100755
```

Fix on the development machine:

```bash
chmod +x deploy.sh
git add deploy.sh
git commit -m "fix: preserve deploy script executable bit"
git push origin main
```

## Rollback

The deployment script stores the image ID of the currently running container before replacing it.

When a newly started container fails health verification, the script attempts to restore the previous image.

Inspect images:

```bash
docker images
```

Inspect the current container image:

```bash
docker inspect --format '{{.Image}}' "$(docker compose ps -q portfolio)"
```

## Stop EC2 for a break

```text
EC2 → Instances → select instance
→ Instance state → Stop instance
```

Starting later should keep the Elastic IP association.

## Recovery order

Use this order during incidents:

```text
1. EC2 state
2. Nginx
3. container state
4. container health
5. localhost HTTP
6. Nginx logs
7. Docker logs
8. memory/disk
9. Git/deployment state
```

Identify the failing layer before changing configuration.
