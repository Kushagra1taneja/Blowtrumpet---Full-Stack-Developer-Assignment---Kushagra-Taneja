markdown

Collapse

Wrap

Copy
# Backend Assignment

A NestJS backend application with user authentication, profile management, and campaign joining features, built with MongoDB Atlas.

## Setup Instructions

### Prerequisites
- Node.js (v20.13.1 or later recommended)
- MongoDB Atlas account
- Git installed

### Installation
1. **Clone the repository**:
  ```bash
  git clone https://github.com/<username>/<repo-name>.git
  cd <repo-name>
  ```

2. **Install dependencies**:
  ```bash
  npm install
  ```

3. **Configure MongoDB Atlas**:
  - Create a cluster on MongoDB Atlas.
  - Set up a database user and allow network access (e.g., 0.0.0.0/0 for development).
  - Get the connection string (e.g., `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/assignment?...`).

4. **Set environment variables**:
  - Create `.env` with your MongoDB URI and JWT secret:
    ```text
    MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/assignment?retryWrites=true&w=majority&appName=<cluster-name>
    JWT_SECRET=<your-secret-key>
    ```

5. **Run the application**:
  ```bash
  npm run start
  ```
  The app will be available at [http://localhost:3000](http://localhost:3000).

6. **Run tests**:
  ```bash
  npm run test
  ```
  Includes unit tests for `AuthService.login` covering successful login, user not found, and incorrect password scenarios.

## API Usage Examples

### Using `curl`

#### Register User:
```bash
curl -X POST http://localhost:3000/api/auth/register -H "Content-Type: application/json" -d "{\"name\": \"John Doe\", \"email\": \"john@example.com\", \"username\": \"johndoe\", \"password\": \"password123\", \"bio\": \"Hello, I am John!\"}"
```

#### Login User:
```bash
curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d "{\"username\": \"johndoe\", \"password\": \"password123\"}"
```

#### Get Profile (replace `<token>` with JWT from login):
```bash
curl -X GET http://localhost:3000/api/profile -H "Authorization: Bearer <token>"
```

#### Update Profile:
```bash
curl -X PUT http://localhost:3000/api/profile -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d "{\"name\": \"John Updated\", \"bio\": \"Updated bio\"}"
```

#### Get Campaigns:
```bash
curl -X GET "http://localhost:3000/api/campaigns?status=active"
```

#### Get Campaign by ID:
```bash
curl -X GET http://localhost:3000/api/campaigns/<campaign-id>
```

#### Join Campaign:
```bash
curl -X POST http://localhost:3000/api/campaigns/<campaign-id>/join -H "Authorization: Bearer <token>"
```

#### Leave Campaign:
```bash
curl -X POST http://localhost:3000/api/campaigns/<campaign-id>/leave -H "Authorization: Bearer <token>"
```

### Notes
- Replace `<token>` with the JWT from the login response.
- Replace `<campaign-id>` with an actual campaign ID from the `GET /api/campaigns` response.
- Screenshots are stored in the `screenshots/` directory.

## Design Decisions

### Technology Stack:
- **NestJS**: Chosen for its modular architecture, TypeScript support, and built-in tools like dependency injection and testing utilities.
- **MongoDB Atlas**: Used for a scalable, cloud-hosted database with flexible schemas, avoiding local setup complexity.

### Authentication:
- Implemented JWT-based authentication with `@nestjs/jwt` and `passport-jwt` for secure, stateless user sessions.
- Passwords are hashed with `bcrypt` for security.

### Database Pre-population:
- Sample campaigns are inserted on app startup (`main.ts`) if the database is empty, avoiding a creation endpoint as per requirements.

### Minimal Setup:
- Focused on core logic (auth, profile, campaigns) without extras like file uploads or real-time features.
- Used environment variables (via `dotenv`) for configuration flexibility.

### Testing:
- Included unit tests for `AuthService.login` covering success and failure cases, ensuring basic functionality verification.

### Error Handling:
- Added null checks and HTTP exceptions for robustness (e.g., campaign/user not found).
