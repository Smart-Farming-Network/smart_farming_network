# Prisma Migrations Guide

This document provides a quick reference for managing Prisma schema and database migrations across **development** and **production** environments.

---

## 📁 Directory Overview

- **`schema.prisma`** — Main Prisma schema definition.
- **`migrations/`** — Contains generated migration files.
- **`.env` / `.env.production`** — Holds database connection URLs for different environments.

---

## 🧩 Development Commands

Use these while building locally.

### 1. Create or Apply Migrations
```bash
npx prisma migrate dev
```

#### What it does:
- Creates new migration files (if schema changes).
- Applies pending migrations to your local database.
- Regenerates the Prisma Client automatically.

### 2. Reset Database (⚠️ Dev Only)

```bash
npx prisma migrate reset

```

#### What it does:
- Drops and recreates the database.
- Re-applies all migrations.
- Reseeds data (if a seed script exists).



## 🚀 Production Commands
Use these on your live or staging environment.
### 1. Apply Existing Migrations
npx prisma migrate deploy

#### What it does:
- Applies already-generated migrations only.
- Does not create new migration files.
- Does not automatically regenerate Prisma Client.


### 2. Generate Prisma Client (if needed)
npx prisma generate


## 🌍 Switching Between Environments
Prisma reads the database connection from your `.env` file:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/dev_db"
```

For production, you can use a separate file (e.g. .env.production):
```env
DATABASE_URL="postgresql://user:password@prod-host:5432/prod_db"
```

Then run:
```bash
DATABASE_URL=$(cat .env.production | grep DATABASE_URL | cut -d '=' -f2-) npx prisma migrate deploy
```

or set your environment variable another way before deployment.

## 🧠 Quick Tips
- Always commit your migration files before deploying.
- Never use migrate dev on production.
- Run prisma generate after schema changes if needed.
- Check migration status:
```bash
npx prisma migrate status
```




Author: DEV Team / Smart Farming Network
Last Updated: November 2025

---

Would you like me to make this file auto-detect your environment (so it reads `.env` or `.env.production` dynamically in your npm scripts)? I can add a short `package.json` script section for that too.
