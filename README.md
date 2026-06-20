# Mini HRMS System

## Prerequisites

- Node.js (v18+)
- PostgreSQL

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/alessaaandraaa/mini-hrms-system
cd mini-hrms-system
```

### 2. Install dependencies

**Backend**

```bash
cd backend
npm install
```

**Frontend**

```bash
cd frontend
npm install
```

### 3. Set up environment variables

**Backend** — copy and fill in the values:

```bash
cd backend
cp .env.example .env
```

Open `.env` and fill in:

```
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/mini_hrms
BETTER_AUTH_SECRET=any-random-secret-string
BETTER_AUTH_URL=http://localhost:3000
```

**Frontend** — copy and fill in the values:

```bash
cd frontend
cp .env.example .env
```

Open `.env` and fill in:

```
VITE_API_URL=http://localhost:3000
```

### 4. Set up the database

Make sure PostgreSQL is running and you have created a database named `mini_hrms`.

```bash
cd backend
npx prisma migrate dev
npx prisma generate
```

Then run the BetterAuth migration — go to your PostgreSQL client and run the SQL file located at

```
backend/better-auth_migrations/
```

### 5. Seed the admin user

```bash
cd backend
npx prisma db seed
```

This creates the default admin account.

### 6. Run the application

Return to the root folder and run `npm run dev`

### 7. Access the application

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Default Admin Credentials

- Email: admin@test.com
- Password: admin123
