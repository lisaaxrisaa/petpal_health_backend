# PetPal Health 🐾

A fullstack web app for collaborative pet care. Track health records, upload documents, check symptoms using AI, and share responsibilities with family members — all in real time.

---

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js, Express
- **Database:** PostgreSQL, Prisma ORM
- **AI Integration:** OpenAI or Claude (planned)
- **Real-Time Updates:** WebSockets / AppSync (planned)
- **Authentication:** JWT
- **Testing:** Jest (planned)
- **Project Management:** Jira (sprint planning & documentation)

---

## Project Setup

### 1. Clone & Install

```bash
git clone https://github.com/lisafujita/petpal_health.git
cd petpal_health/backend
npm install
```

### 2. Environment Variables

Create a .env file in /backend:

```bash
DATABASE_URL="postgresql://<your-username>:<your-password>@localhost:5432/petpal"
```

### 3. Prisma Setup

Create a .env file in /backend:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Run the Backend Server

Create a .env file in /backend:

```bash
npx nodemon server.js
# or
node server.js
```

## Testing Routes (Manual)

You can test backend API routes using a tool like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/).

### Test GET /users

### 1. Start the backend server:

```bash
npm run dev
```

### 2. In Postman, send a GET request to:

```bash
http://localhost:3000/users
```

### 3. You should see a list of dummy users returned from the database.

If you see [], make sure you’ve run the seed script:

```bash
node seed.js
```

### This confirms that:

- The server is running

- The /users route is correctly wired

- Prisma is able to fetch from the database

# 📘 API Routes – PetPal Health

These routes power the PetPal Health backend. All endpoints that modify or access user-specific data require a valid JWT token.

---

## Auth & Users

### `POST /users` – Register a new user

Registers a new user account.

- **Method:** `POST`
- **Endpoint:** `/users`
- **Request Body:**

```json
{
  "firstName": "Emma",
  "lastName": "Fujita",
  "email": "emma@example.com",
  "password": "securePassword123"
}
```

- **Response (201 Created):**

```json
{
  "id": 1,
  "firstName": "Emma",
  "lastName": "Fujita",
  "email": "emma@example.com",
  "createdAt": "2025-06-13T15:24:00.000Z"
}
```

---

### `POST /login` – Authenticate a user

Returns a JWT token upon successful login.

- **Method:** `POST`
- **Endpoint:** `/login`
- **Request Body:**

```json
{
  "email": "emma@example.com",
  "password": "securePassword123"
}
```

- **Response:**

```json
{
  "message": "Login successful",
  "token": "<jwt_token>",
  "user": {
    "id": 1,
    "email": "emma@example.com",
    "firstName": "Emma",
    "lastName": "Fujita"
  }
}
```

---

## Pets

### `GET /pets` – Get all pets for logged-in user

- **Method:** `GET`
- **Endpoint:** `/pets`
- **Headers:**

  - `Authorization: Bearer <your_token_here>`

- **Response:**

```json
[
  {
    "id": 1,
    "name": "Emma",
    "species": "Dog",
    "breed": "Mini Schnauzer",
    "age": 7,
    "userId": 4,
    "createdAt": "2025-06-13T19:09:53.000Z"
  }
]
```

---

### `PUT /pets/:id` – Update pet

- **Method:** `PUT`
- **Endpoint:** `/pets/:id`
- **Headers:**
  - `Authorization: Bearer <your_token_here>`
- **Request Body:**

```json
{
  "name": "Emma",
  "species": "Dog",
  "breed": "Mini Schnauzer",
  "age": 8
}
```

- **Response:**

```json
{
  "message": "Pet updated"
}
```

---

### `DELETE /pets/:id` – Delete pet

- **Method:** `DELETE`
- **Endpoint:** `/pets/:id`
- **Headers:**

  - `Authorization: Bearer <your_token_here>`

- **Response:**

```json
{
  "message": "Pet deleted"
}
```

---

## Notes

- Passwords are securely hashed with bcrypt.
- All sensitive routes require a valid JWT token in the `Authorization` header.
- Duplicate email registration returns a `409 Conflict`.

## Testing

This project uses [Jest](https://jestjs.io/) to run unit tests for backend logic.

### How to Run Tests

Make sure dependencies are installed:

```bash
npm install
```

Then run the test suite:

```bash
npm test
```

### Test Structure

- Tests live inside the /test folder.

- Controllers are tested with mocked Prisma clients using jest.unstable_mockModule().

- Example test files:

- test/userController.test.js

- test/userController.create.test.js

### What’s Covered

- getAllUsers: Ensures it returns a 200 status and user list

- createUser: Tests success (201), and conflict cases (409)

### Note on Mocks

The Prisma client is mocked using a file at:

```bash
backend/__mocks__/@prisma/client.js
```

This allows us to test controller behavior without hitting the actual database.

## Development Notes

- Sprint planning and tasks tracked via Jira

- Features are being developed in documented sprints

- Testing (Jest + Supertest) to be added after initial route development
