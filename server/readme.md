# API Documentation: `/users/register`

## Endpoint Overview

The `/users/register` endpoint is used to register a new user in the system. It accepts user details such as full name, email, and password, hashes the password, creates a new user record in the database, and returns an authentication token along with the created user data.

---

## Endpoint Details

- **URL**: `/users/register`
- **Method**: `POST`
- **Content-Type**: `application/json`

---

## Request Structure

### **Headers**

- `Content-Type`: `application/json`

### **Request Body**

The body of the request must be a JSON object containing the following fields:

| Field     | Type   | Required | Description                                   |
| --------- | ------ | -------- | --------------------------------------------- |
| fullname  | Object | Yes      | An object containing the user's full name.    |
| firstname | String | Yes      | The user's first name (minimum 3 characters). |
| lastname  | String | Yes      | The user's last name (minimum 3 characters).  |
| email     | String | Yes      | The user's email address (must be unique).    |
| password  | String | Yes      | The user's password (minimum 6 characters).   |

#### **Example Request Body**

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

---

## Response Structure

### **Successful Response**

**Status Code**: `201 Created`

The response includes the created user data and an authentication token.

#### **Example Successful Response**

```json
{
  "user": {
    "_id": "64b9c1234f0b6a2c8d7f9123",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "<hashed_password>"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### **Validation Error Response**

**Status Code**: `400 Bad Request`

Returned if the input data fails validation (e.g., missing fields, invalid email).

#### **Example Validation Error Response**

```json
{
  "errors": [
    {
      "msg": "Email must be a valid email address",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### **Internal Server Error Response**

**Status Code**: `500 Internal Server Error`

Returned if there is an unexpected error while processing the request.

#### **Example Internal Server Error Response**

```json
{
  "error": "An unexpected error occurred"
}
```

---

## Validation Rules

1. **Fullname Validation**:
   - `firstname` and `lastname` must each be at least 3 characters long.
2. **Email Validation**:

   - Must be a valid email format.
   - Must be unique.

3. **Password Validation**:
   - Must be at least 6 characters long.

---

## Notes

- Ensure that the `JWT_SECRET` environment variable is set in your server to enable token generation.
- Always hash passwords before saving them to the database.
