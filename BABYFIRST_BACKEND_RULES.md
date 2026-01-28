# BABYFIRST BACKEND DEVELOPMENT RULES

> [!IMPORTANT]
> All developers and AI agents MUST read and follow these rules strictly before implementing any code.

## 1. Core Philosophy
- **Develop slowly, code correctly**: Quality and scalability are prioritized over speed. No "quick fixes" or hacks.
- **Backend as Single Source of Truth**: All business rules, calculations, and security checks must reside in the Backend. The Frontend should only be a consumer of these rules.
- **Stateless Backend**: The system must be stateless. All session-related information must be handled via JWT or similar tokens.
- **Stateless logic**: Each request should be independent and verifiable on its own.

## 2. Architecture & Layering
- **Clean Architecture mandatory**:
    - `Api`: Entry point, Controllers, Middlewares. No business logic.
    - `Application`: Use Cases, DTOs, Interfaces. This is where business processes live.
    - `Domain`: Entities, Value Objects, Domain Rules. No dependencies on frameworks (EF, etc.).
    - `Infrastructure`: External implementations (EF Core, Redis, File Storage, External APIs).
- **Dependency Flow**: Dependencies must point inward: `Api` -> `Application` -> `Domain`. `Infrastructure` also depends on `Application` and `Domain`.

## 3. Data & Communication
- **No UI Logic**: The Backend does not concern itself with how data is displayed. It returns structured data (JSON).
- **REST Standards**: Use proper HTTP verbs (GET, POST, PUT, DELETE) and status codes (200, 201, 400, 401, 403, 404, 500).
- **No Entity Exposure**: Never return Domain Entities directly in API responses. Use DTOs (Data Transfer Objects).
- **Validation**: Every request must be validated at the Application layer.

## 4. Security
- **Authentication**: JWT is the standard.
- **Authorization**: Must be checked on the Backend for every protected resource.
- **Secrets Management**: Never commit hardcoded connection strings or API keys. Use environment variables or secret managers.

## 5. Coding Standards
- **Naming**: Use clear, semantic names. Follow C#/.NET conventions (PascalCase for classes/methods).
- **Logging**: Use structured logging (Serilog). Log meaningful events, not just errors.
- **Error Handling**: Use a Global Exception Handler. Return consistent error responses:
  ```json
  {
    "status": 400,
    "message": "User-friendly message",
    "errorCode": "SPECIFIC_CODE",
    "details": []
  }
  ```

---
*Signed: BabyFirst Core Team*
