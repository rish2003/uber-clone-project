# User Routes Documentation

This document outlines the user-related routes available in the application. All routes use the `express-validator` middleware for validation and custom middleware for authentication where required.

## Routes

### 1. Register User

**Endpoint:** `/register`

**Method:** `POST`

**Description:** Allows a new user to register by providing the required details.

**Request Body:**

```json
{
  "email": "user@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "password123"
}
```

**Validation Rules:**

- `email`: Must be a valid email address.
- `fullname.firstname`: Must be at least 3 characters long.
- `password`: Must be at least 6 characters long.

**Response:**

- `201`: User created successfully.
- `400`: Validation errors or missing required fields.

---

### 2. Login User

**Endpoint:** `/login`

**Method:** `POST`

**Description:** Authenticates a user and returns a token for accessing protected routes.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Validation Rules:**

- `email`: Must be a valid email address.
- `password`: Must be at least 6 characters long.

**Response:**

- `200`: Login successful, returns user details and token.
- `401`: Invalid email or password.
- `400`: Validation errors.

---

### 3. Get User Profile

**Endpoint:** `/profile`

**Method:** `GET`

**Description:** Fetches the profile of the authenticated user.

**Authentication:** Requires `Authorization` header with a valid Bearer token or cookie token.

**Response:**

- `200`: Returns user profile.
- `401`: Unauthorized or invalid token.

---

### 4. Logout User

**Endpoint:** `/logout`

**Method:** `GET`

**Description:** Logs out the user by clearing the authentication token and adding it to a blacklist.

**Authentication:** Requires `Authorization` header with a valid Bearer token or cookie token.

**Response:**

- `200`: Successfully logged out.
- `400`: Token not provided.
- `401`: Unauthorized or invalid token.

---

## Middleware

### Authentication Middleware

**Name:** `authUser`

**Description:** Ensures the user is authenticated by verifying the token from the `Authorization` header or cookies.

### Validation Middleware

**Library:** `express-validator`

**Description:** Validates request body fields based on specified rules for each route.
