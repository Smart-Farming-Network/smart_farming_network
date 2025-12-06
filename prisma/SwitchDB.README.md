### 1. Update DATABASE_URL in .env
### 2. Remove old SQLite files and migrations
```bash
rm prisma/dev.db
rm -rf prisma/migrations
```

### 3. Create new migration for Postgres
```bash
npx prisma migrate dev --name init
```

### 4. Optional: Seed
```bash
npx prisma db seed
```

### 5. Verify connection
```bash
npx prisma studio
```
