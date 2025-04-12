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

## API Usage Examples (with output screenshots)

### Using `curl`

#### Register User:
```bash
curl -X POST http://localhost:3000/api/auth/register -H "Content-Type: application/json" -d "{\"name\": \"John Doe\", \"email\": \"john@example.com\", \"username\": \"johndoe\", \"password\": \"password123\", \"bio\": \"Hello, I am John!\"}"
```
![image](https://github.com/user-attachments/assets/97f0938a-a00d-4ad8-91ce-638b06ed02b2)


#### Login User:
```bash
curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d "{\"username\": \"johndoe\", \"password\": \"password123\"}"
```
![image](https://github.com/user-attachments/assets/87e9bb09-2d54-4988-9ca9-52dbf391a977)


#### Logout User:
```bash
curl -X POST http://localhost:3000/api/auth/logout
```
![image](https://github.com/user-attachments/assets/75eb2278-1d08-41cb-a013-e525f3f749c1)


#### Get Profile (replace `<token>` with JWT from login):
```bash
curl -X GET http://localhost:3000/api/profile -H "Authorization: Bearer <token>"
```
![image](https://github.com/user-attachments/assets/8586ce5a-12ad-4682-8ab5-27e27d59e332)

#### Update Profile:
```bash
curl -X PUT http://localhost:3000/api/profile -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d "{\"name\": \"John Updated\", \"bio\": \"Updated bio\"}"
```
![image](https://github.com/user-attachments/assets/62751be9-7596-4f75-b537-66cb0efa02cc)


#### Get Campaigns:
```bash
curl -X GET "http://localhost:3000/api/campaigns?status=active"
```
![image](https://github.com/user-attachments/assets/d1d1386a-b842-4195-9e1a-470aff81faa4)


#### Get Campaign by ID:
```bash
curl -X GET http://localhost:3000/api/campaigns/<campaign-id>
```
![image](https://github.com/user-attachments/assets/bbac4dfd-1d42-43ec-ae90-fb943d158fe9)

#### Join Campaign:
```bash
curl -X POST http://localhost:3000/api/campaigns/<campaign-id>/join -H "Authorization: Bearer <token>"
```
![image](https://github.com/user-attachments/assets/aa58ee38-1239-421d-b255-c5eccb7412b1)

#### Leave Campaign:
```bash
curl -X POST http://localhost:3000/api/campaigns/<campaign-id>/leave -H "Authorization: Bearer <token>"
```
![image](https://github.com/user-attachments/assets/28805b9d-3e58-4fbc-aa18-ac2f59bdaf81)

### Notes
- Replace `<token>` with the JWT from the login response.
- Replace `<campaign-id>` with an actual campaign ID from the `GET /api/campaigns` response.

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
