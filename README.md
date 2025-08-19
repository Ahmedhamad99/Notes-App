# Notes-App

A full-featured Notes application with user authentication, REST and GraphQL APIs, and file upload support. Built with Node.js, Express, MongoDB, and modern best practices.

## Features

- **User Authentication**
  - Register, login, and logout
  - JWT-based authentication with token revocation
  - Password reset via OTP sent to email
- **User Profile**
  - Upload and update profile picture
- **Notes Management**
  - Create, read, update, and delete notes (CRUD)
  - Each note has a title, content, and is linked to its owner
- **API Support**
  - RESTful API endpoints for all major operations
  - GraphQL API for flexible queries and mutations
- **File Uploads**
  - Profile pictures and note attachments (if extended)
- **Security**
  - Input validation with Joi
  - Passwords hashed with bcrypt
  - CORS enabled

## Technologies Used

- Node.js, Express
- MongoDB, Mongoose
- GraphQL, express-graphql
- JWT (jsonwebtoken)
- Multer (file uploads)
- Joi (validation)
- Nodemailer (email/OTP)
- bcrypt (password hashing)

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB instance (local or cloud)
- npm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ahmedhamad99/Notes-App.git
   cd Notes-App
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Copy `config/.env.example` to `config/.env` and fill in your values (MongoDB URI, JWT secret, email credentials, etc.)

4. **Start the server:**
   ```bash
   npm start
   or
   nodemon start
   ```

   The server will run on the port specified in your `.env` (default: 3000).

## API Endpoints

### Authentication

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive JWT
- `POST /api/auth/forgotPassword` — Request password reset OTP
- `POST /api/auth/resetPassword` — Reset password with OTP

### User

- `POST /api/user/logout` — Logout and revoke token
- `PATCH /api/user/upload-profile-pic` — Upload/update profile picture

### Notes (REST)

- `POST /api/notes-rest/` — Create a note
- `GET /api/notes-rest/` — Get all notes for the user
- `GET /api/notes-rest/:id` — Get a note by ID
- `PATCH /api/notes-rest/:id` — Update a note
- `DELETE /api/notes-rest/:id` — Delete a note

### Notes (GraphQL)

- Endpoint: `/api/notes-graph`
- Use GraphiQL interface for queries and mutations

## Example GraphQL Query

```graphql
query {
  notes {
    id
    title
    content
    createdAt
  }
}
```

## File Uploads

- Uploaded files (profile pictures) are stored in `/uploads`
- Access via `/uploads/<filename>`

## License

This project is licensed under the ISC License.