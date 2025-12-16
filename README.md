# Job Platform

A modern job platform built with React, TanStack Start, Node.js, TypeScript, and PostgreSQL.

## Features

- **Job Listings**: Display a list of open positions with filters for category, type, and location
- **Job Details**: View detailed information about each position including title, category, type, location, description, and requirements
- **Applications**: Submit applications for specific jobs or apply spontaneously
- **Admin Area**: Manage job postings and view all applications
- **Database**: PostgreSQL with DrizzleORM for data management

## Technologies Used

- **Frontend**: React 19, TanStack Start, Tailwind CSS, React Router
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL, DrizzleORM
- **API**: RESTful API with TypeScript
- **Dev Tools**: Vite, pnpm, Docker

## Local Setup

### Prerequisites

- Node.js 22+
- pnpm (or npm)
- Docker (for database)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd job-platform
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```
   DATABASE_URL=postgres://postgres:postgres@localhost:5432/job_platform
   PORT=3001
   ```

4. **Start PostgreSQL database**

   Using Docker:

   ```bash
   docker-compose up -d postgres
   ```

5. **Run database migration**

   ```bash
   pnpm migrate
   ```

6. **Seed the database with sample data**

   ```bash
   pnpm seed
   ```

7. **Start the backend server**

   ```bash
   pnpm dev:server
   ```

8. **Start the frontend development server**

   ```bash
   pnpm dev:frontend
   ```

9. **Access the application**

   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

### Using Docker Compose

Alternatively, you can run the entire stack using Docker Compose:

```bash
# Build and start all services
docker-compose up --build

# Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:3001
```

## Available Scripts

- `pnpm dev:frontend` - Start the frontend development server
- `pnpm dev:server` - Start the backend server
- `pnpm migrate` - Run database migrations
- `pnpm seed` - Seed the database with sample data
- `pnpm build:frontend` - Build the frontend for production
- `pnpm build:server` - Build the backend for production
- `pnpm test` - Run tests

## Project Structure

```
job-platform/
├── src/
│   ├── api/              # Backend API routes
│   ├── db/               # Database configuration and schema
│   ├── routes/           # Frontend routes
│   └── tailwind.css      # Tailwind CSS configuration
├── public/               # Static assets
├── index.html            # Main HTML file
├── package.json          # Dependencies and scripts
├── docker-compose.yml    # Docker configuration
├── Dockerfile            # Backend Dockerfile
├── Dockerfile.frontend   # Frontend Dockerfile
└── README.md             # This file
```

## API Endpoints

### Public Endpoints

- `GET /api/jobs` - Get list of active jobs (with optional filters)
- `GET /api/jobs/:id` - Get job details by ID
- `POST /api/applications` - Submit a new application

### Admin Endpoints

- `GET /api/admin/jobs` - Get all jobs (including inactive)
- `POST /api/admin/jobs` - Create a new job
- `PUT /api/admin/jobs/:id` - Update a job
- `DELETE /api/admin/jobs/:id` - Delete a job
- `GET /api/admin/applications` - Get all applications

## Usage

### User Experience

1. **Browse Jobs**: Visit the jobs page to see all open positions
2. **Filter Jobs**: Use the filters to narrow down by category, type, or location
3. **View Details**: Click on a job to see more information
4. **Apply**: Submit your application with your name, email, and resume
5. **Spontaneous Application**: Use the "Apply" page to submit a spontaneous application

### Admin Experience

1. **Access Admin Area**: Navigate to `/admin` (no authentication required in development)
2. **Manage Jobs**: Create, update, and delete job postings
3. **View Applications**: See all submitted applications and update their status

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string
- `PORT` - Backend server port (default: 3001)

## Deployment

### Production Build

1. Build the frontend:

   ```bash
   pnpm build:frontend
   ```

2. Build the backend:

   ```bash
   pnpm build:server
   ```

3. Run the production server:

   ```bash
   pnpm start
   ```

### Docker Deployment

```bash
docker-compose up -d
```

## Testing

```bash
pnpm test
```

## License

This project is for demonstration purposes only.
