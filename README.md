# Guna R — Personal Portfolio

Personal portfolio site for Guna R, a Cloud & DevOps engineer. Built as a single-page, statically-rendered Next.js app with an editorial layout, scroll-driven reveals, and a lightweight ambient background system.

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide

## Projects

- Strangers Club
- Self-Service Deployment Portal
- AWS Log Monitoring & Archival System
- Portfolio Infrastructure Platform

## Run locally

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run the production build locally:

```bash
npm run start
```

## Run with Docker

```bash
docker build -t guna-portfolio .
docker run --rm -p 3000:3000 guna-portfolio
```

## Run with Docker Compose

```bash
docker compose up --build
```

Either way, the site is available at [http://localhost:3000](http://localhost:3000).

Stop the Compose service with:

```bash
docker compose down
```
