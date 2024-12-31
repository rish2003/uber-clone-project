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

# Ride and Maps Routes README

This document outlines the usage and setup for the **Ride Routes** and **Maps Routes** in the project. Additionally, it explains the integration of the Google Maps JavaScript API.

---

## **Ride Routes**

### **Base URL**

`/api/rides`

### **Endpoints**

#### 1. **Create a Ride**

- **Endpoint:** `POST /`
- **Description:** Creates a new ride request in the system.
- **Request Body:**
  ```json
  {
    "pickup": "<pickup_location>",
    "dropoff": "<dropoff_location>",
    "userId": "<user_id>",
    "fare": <fare_amount>
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "ride": {
      "id": "<ride_id>",
      "pickup": "<pickup_location>",
      "dropoff": "<dropoff_location>",
      "userId": "<user_id>",
      "fare": <fare_amount>
    }
  }
  ```

#### 2. **Get All Rides**

- **Endpoint:** `GET /`
- **Description:** Fetches all rides available in the system.
- **Response:**
  ```json
  [
    {
      "id": "<ride_id>",
      "pickup": "<pickup_location>",
      "dropoff": "<dropoff_location>",
      "userId": "<user_id>",
      "fare": <fare_amount>
    },
    ...
  ]
  ```

#### 3. **Get a Single Ride**

- **Endpoint:** `GET /:id`
- **Description:** Fetches details of a specific ride by its ID.
- **Response:**
  ```json
  {
    "id": "<ride_id>",
    "pickup": "<pickup_location>",
    "dropoff": "<dropoff_location>",
    "userId": "<user_id>",
    "fare": <fare_amount>
  }
  ```

#### 4. **Delete a Ride**

- **Endpoint:** `DELETE /:id`
- **Description:** Deletes a ride by its ID.
- **Response:**
  ```json
  {
    "success": true,
    "message": "Ride deleted successfully."
  }
  ```

---

## **Maps Routes**

### **Base URL**

`/api/maps`

### **Endpoints**

#### 1. **Get Directions**

- **Endpoint:** `POST /directions`
- **Description:** Fetches directions between two locations using Google Maps API.
- **Request Body:**
  ```json
  {
    "origin": "<origin_location>",
    "destination": "<destination_location>"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "directions": {
      "steps": [
        "Head north on Main St",
        "Turn right onto 2nd Ave",
        ...
      ]
    }
  }
  ```

---

## **Google Maps JavaScript API Integration**

### **Setup Instructions**

1. **Enable APIs**

   - Go to the [Google Cloud Console](https://console.cloud.google.com/).
   - Enable the following APIs:
     - **Maps JavaScript API**
     - **Directions API** (if required for routing)

2. **Obtain API Key**

   - Navigate to **APIs & Services > Credentials**.
   - Create an API Key.
   - Restrict the key to specific domains and APIs for security.

3. **Include API in Your Application**

   - Add the Google Maps script to your HTML or React component:
     ```html
     <script
       src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
       async
       defer
     ></script>
     ```
   - Replace `YOUR_API_KEY` with your actual key.

4. **Using the API**
   - Initialize the map in your JavaScript/React code:
     ```javascript
     function initMap() {
       const map = new google.maps.Map(document.getElementById("map"), {
         center: { lat: -34.397, lng: 150.644 },
         zoom: 8,
       });
     }
     ```

---

## **Error Troubleshooting**

- **MissingSchemaError**

  - Ensure that all required Mongoose schemas are registered before being used.
  - Example:
    ```javascript
    const UserSchema = new mongoose.Schema({
      /* schema definition */
    });
    mongoose.model("User", UserSchema);
    ```

- **Google Maps ApiProjectMapError**
  - Verify that the API key is valid, billing is enabled, and required APIs are enabled in the Google Cloud Console.

---

## **Testing**

1. **Ride Routes:**

   - Use Postman or a similar tool to test the endpoints.
   - Ensure that the backend is running and connected to the database.

2. **Maps Routes:**
   - Verify API responses by checking if directions or location data are returned correctly.
   - Ensure that the API key is configured correctly.

---

For further assistance, refer to the official documentation:

- [Google Maps JavaScript API Documentation](https://developers.google.com/maps/documentation/javascript)

Ensure all environment variables are set before running the project.
