# API Documentation

This document provides details about the API endpoints available in the project, including routes for users and captains. Each endpoint is described with its method, URL, required data, and responses.

## User Routes

### Register User

**POST** `/register`

- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "fullname": { "firstname": "string" },
    "email": "string",
    "password": "string"
  }
  ```
- **Validation**:
  - `email`: Must be a valid email.
  - `fullname.firstname`: Minimum 3 characters.
  - `password`: Minimum 6 characters.

### Login User

**POST** `/login`

- **Description**: Logs in an existing user.
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Validation**:
  - `email`: Must be a valid email.
  - `password`: Minimum 6 characters.

### Get User Profile

**GET** `/profile`

- **Description**: Fetches the profile of the logged-in user.
- **Authorization**: Requires Bearer token.

### Logout User

**GET** `/logout`

- **Description**: Logs out the user by blacklisting the token.
- **Authorization**: Requires Bearer token.

## Captain Routes

### Register Captain

**POST** `/register`

- **Description**: Registers a new captain.
- **Request Body**:
  ```json
  {
    "fullname": { "firstname": "string", "lastname": "string" },
    "email": "string",
    "password": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "vehicleType": "string"
    }
  }
  ```
- **Validation**:
  - `email`: Must be a valid email.
  - `fullname.firstname`: Minimum 3 characters.
  - `password`: Minimum 6 characters.
  - `vehicle.color`: Minimum 3 characters.
  - `vehicle.plate`: Minimum 6 characters.
  - `vehicle.capacity`: Minimum value of 1.
  - `vehicle.vehicleType`: Minimum 3 characters.

### Login Captain

**POST** `/login`

- **Description**: Logs in an existing captain.
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Validation**:
  - `email`: Must be a valid email.
  - `password`: Minimum 6 characters.

### Get Captain Profile

**GET** `/profile`

- **Description**: Fetches the profile of the logged-in captain.
- **Authorization**: Requires Bearer token.

### Logout Captain

**GET** `/logout`

- **Description**: Logs out the captain by blacklisting the token.
- **Authorization**: Requires Bearer token.

## Models

### User Model

- `fullname`: Object containing:
  - `firstname`: String (required)
  - `lastname`: String
- `email`: String (unique, required)
- `password`: String (hashed, required)
- `role`: String (e.g., "user", "captain")
- `profile`: Object containing additional details.

### Captain Model

- `fullname`: Object containing:
  - `firstname`: String (required)
  - `lastname`: String
- `email`: String (unique, required)
- `password`: String (hashed, required)
- `vehicle`: Object containing:
  - `color`: String (required)
  - `plate`: String (required, minimum length 6)
  - `capacity`: Number (required, minimum value 1)
  - `vehicleType`: String (required, e.g., "car", "motorbike", "auto")
- `status`: Enum ["active", "inactive"] (default: "inactive")
- `location`: Object containing:
  - `latitude`: Number
  - `longitude`: Number

## Middleware

### `authUser`

- Verifies the user's token and attaches the user information to the request.

### `authCaptain`

- Verifies the captain's token and attaches the captain information to the request.

## Services

### `createCaptain`

- Creates a new captain in the database.
- **Input**: Required fields for a captain.
- **Output**: Created captain object.

## Token Management

- Tokens are generated using JWT.
- Tokens can be blacklisted upon logout to prevent reuse.

## Environment Variables

- `JWT_SECRET`: Secret key for signing tokens.
- `NODE_ENV`: Environment (e.g., "production").

Ensure all environment variables are set before running the project.
