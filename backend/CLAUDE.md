# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server
npm run dev

# Run tests
npm test

# Database operations
npx prisma migrate dev
npx prisma generate
npx prisma db seed
```

## Architecture Overview

This is a PetPal Health backend API built with Express.js, Prisma ORM, and PostgreSQL. The application manages pet health records including pets, health logs, and medications.

### Core Models

- **User**: Pet owners with authentication
- **Pet**: Animals owned by users (name, species, breed, age, weight, notes)  
- **HealthLog**: Medical records for pets (date, notes, condition, medications, vet visits)
- **Medication**: Prescription tracking (drug name, dosage, duration, instructions, purpose)

### Project Structure

- `app.js` - Express app configuration with CORS, Morgan logging, and route setup
- `server.js` - Server startup and port configuration
- `controllers/` - Business logic for users, pets, health logs, and medications
- `routes/` - API endpoint definitions with JWT authentication
- `middleware/authMiddleware.js` - JWT token validation
- `prisma/schema.prisma` - Database schema with PostgreSQL
- `test/` - Jest test suites for all controllers and routes
- `docs/api.md` - API endpoint documentation

### Authentication

All routes except user registration/login require Bearer token authentication. JWT tokens are validated via `authMiddleware.js`.

### Database Relationships

- Users have many Pets (1:N)
- Pets have many HealthLogs and Medications (1:N each)
- HealthLogs cascade delete when Pet is removed
- All data is scoped to the authenticated user

### Testing

Jest with Supertest for API testing. Prisma client is mocked in `__mocks__/@prisma/client.js`. Tests cover full CRUD operations for all models.

### Key Implementation Details

- Uses ES modules (`"type": "module"`)
- Async route loading for pets in `app.js`
- ISO date handling in health log updates
- Cascading deletes for pet-related records
- Comprehensive error handling and validation