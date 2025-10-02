# Uber Backend API Documentation

## Overview

This is the backend API for the Uber application built with Node.js, Express.js, and MongoDB.

## Base URL

```
http://localhost:3000
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Tokens are returned upon successful registration/login.

---

## API Endpoints

### User Registration

**Endpoint:** `POST /users/register`

**Description:** Register a new user account in the system.

#### Request Body

The request body must be in JSON format with the following structure:

```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string"
}
```

#### Request Body Parameters

| Parameter            | Type   | Required | Validation         | Description                           |
| -------------------- | ------ | -------- | ------------------ | ------------------------------------- |
| `fullname`           | Object | Yes      | -                  | User's full name object               |
| `fullname.firstname` | String | Yes      | Min 3 characters   | User's first name                     |
| `fullname.lastname`  | String | No       | -                  | User's last name                      |
| `email`              | String | Yes      | Valid email format | User's email address (must be unique) |
| `password`           | String | Yes      | Min 6 characters   | User's password (will be hashed)      |

#### Example Request

```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "securepassword123"
  }'
```

#### Response Formats

##### Success Response

**Status Code:** `200 OK`

**Example Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTJhYjhjOWQxZTJmM2E0YjVjNmQ3ZTgiLCJpYXQiOjE2OTc0MDUwMDl9.xYz123ABC...",
  "user": {
    "_id": "652ab8c9d1e2f3a4b5c6d7e8",
    "fullname": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null,
    "__v": 0
  }
}
```

**Response Fields:**

- `token`: JWT authentication token for future API requests
- `user`: Complete user object created in the database
- `user._id`: Unique MongoDB ObjectId for the user
- `user.fullname`: Object containing firstName and lastName
- `user.email`: User's registered email address
- `user.socketId`: WebSocket connection ID (null initially)

##### Validation Error Response

**Status Code:** `400 Bad Request`

**Example Response (Multiple validation errors):**

```json
{
  "errors": [
    {
      "type": "field",
      "value": "invalid-email",
      "msg": "invalid email",
      "path": "email",
      "location": "body"
    },
    {
      "type": "field",
      "value": "ab",
      "msg": "first name must be 3 character long",
      "path": "fullname.firstname",
      "location": "body"
    },
    {
      "type": "field",
      "value": "123",
      "msg": "Password must be 6 chacter long",
      "path": "password",
      "location": "body"
    }
  ]
}
```

**Example Response (Single validation error):**

```json
{
  "errors": [
    {
      "type": "field",
      "value": "test@",
      "msg": "invalid email",
      "path": "email",
      "location": "body"
    }
  ]
}
```

##### Server Error Response

**Status Code:** `400 Bad Request`

**Example Response (Missing required fields):**

```json
{
  "error": "All fields are required"
}
```

**Example Response (Duplicate email):**

```json
{
  "error": "E11000 duplicate key error collection: users index: email_1 dup key: { email: \"john.doe@example.com\" }"
}
```

##### Internal Server Error Response

**Status Code:** `500 Internal Server Error`

**Example Response:**

```json
{
  "error": "Database connection failed"
}
```

#### Status Codes

| Status Code | Description                                                | Example Scenario                                        |
| ----------- | ---------------------------------------------------------- | ------------------------------------------------------- |
| `200`       | Success - User registered successfully                     | Valid request with all required fields                  |
| `400`       | Bad Request - Validation errors or missing required fields | Invalid email format, short password, missing firstname |
| `500`       | Internal Server Error - Database or server issues          | MongoDB connection failure, server crash                |

#### Common Error Scenarios

1. **Invalid Email Format:**

   ```json
   { "error": "invalid email" }
   ```

2. **Short First Name:**

   ```json
   { "error": "first name must be 3 character long" }
   ```

3. **Short Password:**

   ```json
   { "error": "Password must be 6 chacter long" }
   ```

4. **Missing Required Fields:**

   ```json
   { "error": "All fields are required" }
   ```

5. **Duplicate Email:**
   ```json
   { "error": "User with this email already exists" }
   ```

### User Login

**Endpoint:** `POST /users/login`

**Description:** Authenticate an existing user and receive a JWT token for accessing protected routes.

#### Request Body

The request body must be in JSON format with the following structure:

```json
{
  "email": "string",
  "password": "string"
}
```

#### Request Body Parameters

| Parameter  | Type   | Required | Validation         | Description                     |
| ---------- | ------ | -------- | ------------------ | ------------------------------- |
| `email`    | String | Yes      | Valid email format | User's registered email address |
| `password` | String | Yes      | Min 6 characters   | User's password                 |

#### Example Request

```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "securepassword123"
  }'
```

#### Response Formats

##### Success Response

**Status Code:** `200 OK`

**Example Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTJhYjhjOWQxZTJmM2E0YjVjNmQ3ZTgiLCJpYXQiOjE2OTc0MDUwMDl9.xYz123ABC...",
  "user": {
    "_id": "652ab8c9d1e2f3a4b5c6d7e8",
    "fullname": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null,
    "__v": 0
  }
}
```

**Response Fields:**

- `token`: JWT authentication token for accessing protected routes
- `user`: Complete user object from the database (password excluded)

##### Validation Error Response

**Status Code:** `400 Bad Request`

**Example Response (Invalid email format):**

```json
{
  "errors": [
    {
      "type": "field",
      "value": "invalid-email",
      "msg": "invalid email",
      "path": "email",
      "location": "body"
    }
  ]
}
```

**Example Response (Short password):**

```json
{
  "errors": [
    {
      "type": "field",
      "value": "123",
      "msg": "Password must be 6 chacter long",
      "path": "password",
      "location": "body"
    }
  ]
}
```

##### Authentication Error Response

**Status Code:** `401 Unauthorized`

**Example Response (User not found):**

```json
{
  "message": "invalid email or password"
}
```

**Status Code:** `400 Bad Request`

**Example Response (Wrong password):**

```json
{
  "message": "invalid password"
}
```

#### Status Codes

| Status Code | Description                                       | Example Scenario                                     |
| ----------- | ------------------------------------------------- | ---------------------------------------------------- |
| `200`       | Success - User logged in successfully             | Valid email and password combination                 |
| `400`       | Bad Request - Validation errors or wrong password | Invalid email format, short password, wrong password |
| `401`       | Unauthorized - User not found                     | Email not registered in the system                   |

#### Common Error Scenarios

1. **Invalid Email Format:**

   ```json
   { "errors": [{ "msg": "invalid email" }] }
   ```

2. **Short Password:**

   ```json
   { "errors": [{ "msg": "Password must be 6 chacter long" }] }
   ```

3. **User Not Found:**

   ```json
   { "message": "invalid email or password" }
   ```

4. **Wrong Password:**
   ```json
   { "message": "invalid password" }
   ```

### Get User Profile

**Endpoint:** `GET /users/profile`

**Description:** Get the current authenticated user's profile information.

**Authentication:** Required - JWT token must be provided

#### Headers

| Header        | Type   | Required | Description                        |
| ------------- | ------ | -------- | ---------------------------------- |
| Authorization | String | Yes      | Bearer token: `Bearer <jwt_token>` |

**Alternative:** JWT token can also be sent via cookies as `token`

#### Example Request

```bash
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

#### Response Formats

##### Success Response

**Status Code:** `200 OK`

**Example Response:**

```json
{
  "_id": "652ab8c9d1e2f3a4b5c6d7e8",
  "fullname": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "socketId": null,
  "__v": 0
}
```

##### Authentication Error Response

**Status Code:** `401 Unauthorized`

**Example Response (No token provided):**

```json
{
  "message": "Unauthorized"
}
```

**Example Response (Invalid/Expired token):**

```json
{
  "message": "Unauthorized"
}
```

#### Status Codes

| Status Code | Description                          | Example Scenario                    |
| ----------- | ------------------------------------ | ----------------------------------- |
| `200`       | Success - Profile retrieved          | Valid JWT token provided            |
| `401`       | Unauthorized - Authentication failed | No token, invalid, or expired token |

### User Logout

**Endpoint:** `GET /users/logout`

**Description:** Logout the current authenticated user and invalidate their JWT token.

**Authentication:** Required - JWT token must be provided

#### Headers

| Header        | Type   | Required | Description                        |
| ------------- | ------ | -------- | ---------------------------------- |
| Authorization | String | Yes      | Bearer token: `Bearer <jwt_token>` |

**Alternative:** JWT token can also be sent via cookies as `token`

#### Example Request

```bash
curl -X GET http://localhost:3000/users/logout \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

#### Response Formats

##### Success Response

**Status Code:** `200 OK`

**Example Response:**

```json
{
  "message": "Logged out"
}
```

**Side Effects:**

- JWT token is added to blacklist
- Cookie `token` is cleared (if using cookie authentication)

##### Authentication Error Response

**Status Code:** `401 Unauthorized`

**Example Response (No token provided):**

```json
{
  "message": "Unauthorized"
}
```

#### Status Codes

| Status Code | Description                          | Example Scenario                         |
| ----------- | ------------------------------------ | ---------------------------------------- |
| `200`       | Success - User logged out            | Valid JWT token provided and blacklisted |
| `401`       | Unauthorized - Authentication failed | No token, invalid, or expired token      |

#### Important Notes

- After logout, the JWT token becomes invalid and cannot be used for future requests
- The token is added to a blacklist to prevent reuse
- If using cookie authentication, the cookie is automatically cleared

### Captain Registration

**Endpoint:** `POST /captains/register`

**Description:** Register a new captain (driver) account in the system with vehicle information.

#### Request Body

The request body must be in JSON format with the following structure:

```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
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

#### Request Body Parameters

| Parameter             | Type   | Required | Validation                           | Description                              |
| --------------------- | ------ | -------- | ------------------------------------ | ---------------------------------------- |
| `fullname`            | Object | Yes      | -                                    | Captain's full name object               |
| `fullname.firstname`  | String | Yes      | Min 3 characters                     | Captain's first name                     |
| `fullname.lastname`   | String | No       | -                                    | Captain's last name                      |
| `email`               | String | Yes      | Valid email format                   | Captain's email address (must be unique) |
| `password`            | String | Yes      | Min 6 characters                     | Captain's password (will be hashed)      |
| `vehicle`             | Object | Yes      | -                                    | Vehicle information object               |
| `vehicle.color`       | String | Yes      | Min 3 characters                     | Vehicle color                            |
| `vehicle.plate`       | String | Yes      | Min 3 characters                     | Vehicle license plate number             |
| `vehicle.capacity`    | Number | Yes      | Integer, min 1                       | Vehicle seating capacity                 |
| `vehicle.vehicleType` | String | Yes      | Must be: "car", "auto", "motorcycle" | Type of vehicle                          |

#### Example Request

```bash
curl -X POST http://localhost:3000/captains/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Smith"
    },
    "email": "john.smith@example.com",
    "password": "password123",
    "vehicle": {
      "color": "Black",
      "plate": "ABC1234",
      "capacity": 4,
      "vehicleType": "car"
    }
  }'
```

#### Response Formats

##### Success Response

**Status Code:** `200 OK`

**Example Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTJhYjhjOWQxZTJmM2E0YjVjNmQ3ZTgiLCJpYXQiOjE2OTc0MDUwMDl9.xYz123ABC...",
  "captain": {
    "_id": "652ab8c9d1e2f3a4b5c6d7e8",
    "fullname": {
      "firstname": "John",
      "lastname": "Smith"
    },
    "email": "john.smith@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "Black",
      "plate": "ABC1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "location": {
      "lat": null,
      "lng": null
    },
    "__v": 0
  }
}
```

**Response Fields:**

- `token`: JWT authentication token for future API requests
- `captain`: Complete captain object created in the database
- `captain._id`: Unique MongoDB ObjectId for the captain
- `captain.fullname`: Object containing firstname and lastname
- `captain.email`: Captain's registered email address
- `captain.status`: Captain's current status (default: "inactive")
- `captain.vehicle`: Vehicle information object
- `captain.location`: GPS coordinates (initially null)

##### Validation Error Response

**Status Code:** `400 Bad Request`

**Example Response (Multiple validation errors):**

```json
{
  "errors": [
    {
      "type": "field",
      "value": "invalid-email",
      "msg": "invalid Email",
      "path": "email",
      "location": "body"
    },
    {
      "type": "field",
      "value": "ab",
      "msg": "first name should be 3 char long",
      "path": "fullname.firstname",
      "location": "body"
    },
    {
      "type": "field",
      "value": "truck",
      "msg": "Invalid vehicle type",
      "path": "vehicle.vehicleType",
      "location": "body"
    }
  ]
}
```

##### Server Error Response

**Status Code:** `400 Bad Request`

**Example Response (Captain already exists):**

```json
{
  "message": "Captain already exist"
}
```

**Example Response (Missing required fields):**

```json
{
  "error": "All fields are required"
}
```

#### Status Codes

| Status Code | Description                                               | Example Scenario                                                     |
| ----------- | --------------------------------------------------------- | -------------------------------------------------------------------- |
| `200`       | Success - Captain registered successfully                 | Valid request with all required fields                               |
| `400`       | Bad Request - Validation errors or captain already exists | Invalid email, short password, duplicate email, invalid vehicle type |

#### Common Error Scenarios

1. **Invalid Email Format:**

   ```json
   { "errors": [{ "msg": "invalid Email" }] }
   ```

2. **Short First Name:**

   ```json
   { "errors": [{ "msg": "first name should be 3 char long" }] }
   ```

3. **Short Password:**

   ```json
   { "errors": [{ "msg": "password should atleat 6 char long" }] }
   ```

4. **Invalid Vehicle Type:**

   ```json
   { "errors": [{ "msg": "Invalid vehicle type" }] }
   ```

5. **Captain Already Exists:**

   ```json
   { "message": "Captain already exist" }
   ```

6. **Invalid Vehicle Capacity:**
   ```json
   { "errors": [{ "msg": "Capacity atleast 1" }] }
   ```

### Captain Login

**Endpoint:** `POST /captains/login`

**Description:** Authenticate an existing captain and receive a JWT token for accessing protected routes.

#### Request Body

The request body must be in JSON format with the following structure:

```json
{
  "email": "string",
  "password": "string"
}
```

#### Request Body Parameters

| Parameter  | Type   | Required | Validation         | Description                        |
| ---------- | ------ | -------- | ------------------ | ---------------------------------- |
| `email`    | String | Yes      | Valid email format | Captain's registered email address |
| `password` | String | Yes      | Min 6 characters   | Captain's password                 |

#### Example Request

```bash
curl -X POST http://localhost:3000/captains/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.driver@example.com",
    "password": "password123"
  }'
```

#### Response Formats

##### Success Response

**Status Code:** `200 OK`

**Example Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTJhYjhjOWQxZTJmM2E0YjVjNmQ3ZTgiLCJpYXQiOjE2OTc0MDUwMDl9.xYz123ABC...",
  "captain": {
    "_id": "652ab8c9d1e2f3a4b5c6d7e8",
    "fullname": {
      "firstname": "John",
      "lastname": "Smith"
    },
    "email": "john.driver@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "Black",
      "plate": "ABC1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "location": {
      "lat": null,
      "lng": null
    },
    "__v": 0
  }
}
```

**Response Fields:**

- `token`: JWT authentication token for accessing protected routes
- `captain`: Complete captain object from the database (password excluded)
- **Side Effect**: JWT token is also set as a cookie named `token`

##### Validation Error Response

**Status Code:** `400 Bad Request`

**Example Response (Invalid email format):**

```json
{
  "errors": [
    {
      "type": "field",
      "value": "invalid-email",
      "msg": "Invalid email",
      "path": "email",
      "location": "body"
    }
  ]
}
```

**Example Response (Short password):**

```json
{
  "errors": [
    {
      "type": "field",
      "value": "123",
      "msg": "password should be 6 char long",
      "path": "password",
      "location": "body"
    }
  ]
}
```

##### Authentication Error Response

**Status Code:** `401 Unauthorized`

**Example Response (Captain not found or wrong password):**

```json
{
  "message": "Invalid email or password"
}
```

#### Status Codes

| Status Code | Description                              | Example Scenario                       |
| ----------- | ---------------------------------------- | -------------------------------------- |
| `200`       | Success - Captain logged in successfully | Valid email and password combination   |
| `400`       | Bad Request - Validation errors          | Invalid email format, short password   |
| `401`       | Unauthorized - Invalid credentials       | Email not registered or wrong password |

#### Common Error Scenarios

1. **Invalid Email Format:**

   ```json
   { "errors": [{ "msg": "Invalid email" }] }
   ```

2. **Short Password:**

   ```json
   { "errors": [{ "msg": "password should be 6 char long" }] }
   ```

3. **Invalid Credentials:**
   ```json
   { "message": "Invalid email or password" }
   ```

### Captain Logout

**Endpoint:** `GET /captains/logout`

**Description:** Logout the current authenticated captain and invalidate their JWT token.

**Authentication:** Required - JWT token must be provided

#### Headers

| Header        | Type   | Required | Description                        |
| ------------- | ------ | -------- | ---------------------------------- |
| Authorization | String | Yes      | Bearer token: `Bearer <jwt_token>` |

**Alternative:** JWT token can also be sent via cookies as `token`

#### Example Request

```bash
curl -X GET http://localhost:3000/captains/logout \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

#### Response Formats

##### Success Response

**Status Code:** `200 OK`

**Example Response:**

```json
{
  "message": "Logout successfully"
}
```

**Side Effects:**

- JWT token is added to blacklist to prevent reuse
- Cookie `token` is cleared (if using cookie authentication)

##### Authentication Error Response

**Status Code:** `401 Unauthorized`

**Example Response (No token provided):**

```json
{
  "message": "Unauthorized"
}
```

**Example Response (Invalid/Expired token):**

```json
{
  "message": "Unauthorized"
}
```

#### Status Codes

| Status Code | Description                          | Example Scenario                         |
| ----------- | ------------------------------------ | ---------------------------------------- |
| `200`       | Success - Captain logged out         | Valid JWT token provided and blacklisted |
| `401`       | Unauthorized - Authentication failed | No token, invalid, or expired token      |

#### Important Notes

- After logout, the JWT token becomes invalid and cannot be used for future requests
- The token is added to a blacklist to prevent reuse
- If using cookie authentication, the cookie is automatically cleared
- Captain must login again to access protected routes

---

## Data Models

### User Schema

```javascript
{
  fullname: {
    firstName: String (required, min: 3 characters),
    lastName: String (min: 1 character)
  },
  email: String (required, unique, min: 5 characters),
  password: String (required, hashed),
  socketId: String (optional)
}
```

### Captain Schema

```javascript
{
  fullname: {
    firstname: String (required, min: 3 characters),
    lastname: String (min: 2 characters)
  },
  email: String (required, unique, lowercase, valid email format),
  password: String (required, hashed),
  socketId: String (optional),
  status: String (enum: ["active", "inactive"], default: "inactive"),
  vehicle: {
    color: String (required, min: 3 characters),
    plate: String (required, min: 3 characters),
    capacity: Number (required, min: 1),
    vehicleType: String (required, enum: ["car", "auto", "motorcycle"])
  },
  location: {
    lat: Number (optional),
    lng: Number (optional)
  }
}
```

---

## Environment Variables

Make sure to set up the following environment variables in your `.env` file:

```env
PORT=3000
JWT_SECRET=your_jwt_secret_key
MONGODB_URI=your_mongodb_connection_string
```

---

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env` file
4. Start the server:
   ```bash
   npm start
   ```

### Dependencies

- express: Web framework
- mongoose: MongoDB object modeling
- bcrypt: Password hashing
- jsonwebtoken: JWT implementation
- express-validator: Request validation
- cors: Cross-origin resource sharing
- dotenv: Environment variable management

---

## Error Handling

The API includes comprehensive error handling:

- Input validation using express-validator
- Try-catch blocks for async operations
- Meaningful error messages and status codes
- Consistent error response format

---

## Security Features

- Password hashing using bcrypt
- JWT token-based authentication
- Input validation and sanitization
- CORS enabled for cross-origin requests

---

## Future Endpoints (Coming Soon)

- `PUT /users/profile` - Update user profile

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
