# Project Structure & Architecture

## Directory Layout

```
src/
├── app.module.ts           # Root application module
├── app.controller.ts       # Root controller (health check)
├── app.service.ts          # Root service
├── main.ts                 # Application entry point
│
├── config/
│   └── typeorm.config.ts   # TypeORM database configuration
│
├── users/                  # Users module (feature module)
│   ├── users.module.ts     # Module definition
│   ├── users.controller.ts # REST endpoints
│   ├── users.service.ts    # Business logic
│   ├── users.controller.spec.ts
│   ├── users.service.spec.ts
│   ├── dto/
│   │   ├── create-user.dto.ts
│   │   └── update-user.dto.ts
│   └── entities/
│       └── user.entity.ts  # TypeORM entity
│
├── events/                 # Events module (feature module)
│   ├── events.module.ts    # Module definition
│   ├── events.controller.ts
│   ├── events.service.ts
│   ├── events.controller.spec.ts
│   ├── events.service.spec.ts
│   ├── dto/
│   │   ├── create-event.dto.ts
│   │   └── update-event.dto.ts
│   └── entities/
│       └── event.entity.ts
│
└── migrations/             # Database migrations (TypeORM)
    ├── 1782781182511-CreateUsersTable.ts
    └── 1782781725469-CreateEventsTable.ts

test/
├── app.e2e-spec.ts         # E2E tests
└── jest-e2e.json           # Jest configuration for E2E tests
```

## Architectural Patterns

### Module Organization
- **Feature Modules**: Each domain (users, events) has its own module
- **Barrel Exports**: Use index files for clean imports
- **Dependency Injection**: NestJS DI container handles service provisioning

### Layered Architecture
Each feature module follows a 3-layer pattern:
1. **Controller Layer**: HTTP request handling, routing, parameter validation
2. **Service Layer**: Business logic, data processing, domain rules
3. **Data Layer**: TypeORM entities and database operations

### Entity-Driven Design
- Entities defined in `entities/` directory with TypeORM decorators
- DTOs in `dto/` directory for input/output validation and transformation
- One module per entity/feature

## Naming Conventions

### Files
- Controllers: `{feature}.controller.ts`
- Services: `{feature}.service.ts`
- Modules: `{feature}.module.ts`
- Entities: `{feature}.entity.ts`
- DTOs: `create-{feature}.dto.ts`, `update-{feature}.dto.ts`
- Tests: `{file}.spec.ts` (unit/integration), `{feature}.e2e-spec.ts` (E2E)

### Classes & Exports
- Controllers: `UsersController`, `EventsController`
- Services: `UsersService`, `EventsService`
- Modules: `UsersModule`, `EventsModule`
- Entities: `User`, `Event`
- DTOs: `CreateUserDto`, `UpdateUserDto`, `CreateEventDto`, `UpdateEventDto`

### Routes
- Base path follows module name: `/users`, `/events`
- RESTful conventions: POST (create), GET (read), PUT/PATCH (update), DELETE (delete)

## Code Organization Rules

### Module Structure
- Each feature module is self-contained
- Module imports database entity via `TypeOrmModule.forFeature([Entity])`
- Modules declare controllers and providers
- Cross-module communication through DI only

### Service Implementation
- Services inject repositories via TypeORM
- Business logic isolated from HTTP concerns
- Async/await patterns for database operations
- No HTTP-specific logic (status codes, headers) in services

### Controller Implementation
- Inject service via constructor
- Handle HTTP concerns: route params, request/response
- Use DTOs for validation and type safety
- Decorators for HTTP verbs and routes

### Entity Design
- TypeORM decorators define columns and relationships
- Entities are data representations of database tables
- PrimaryGeneratedColumn for auto-increment IDs
- Column decorators specify constraints and types

### DTO Patterns
- Class-validator decorators for validation rules
- Separate Create and Update DTOs
- DTOs act as both input validation and API documentation
- Use class-transformer for serialization if needed

## Testing Strategy

### Unit Tests (`*.spec.ts`)
- Located alongside implementation files
- Test services and controllers in isolation
- Use Jest mocking for dependencies
- Test file naming: `{module}.spec.ts`

### E2E Tests (`test/`)
- Located in dedicated `test/` directory
- Test complete request/response cycles
- Use supertest for HTTP assertions
- Separate Jest configuration (`jest-e2e.json`)

### Test Coverage
- Aim for comprehensive coverage of business logic
- Services and controllers should have corresponding spec files
- Use mock data and database fixtures

## Configuration & Environment

### Environment Variables (`.env` file)
- `DATABASE_URL`: PostgreSQL connection string
- `STAGE`: Application environment (dev/prod)
- Other feature-specific variables as needed

### Configuration Files
- `nest-cli.json`: NestJS CLI configuration
- `tsconfig.json`: TypeScript compiler options
- `eslint.config.mjs`: Linting rules
- `.prettierrc`: Code formatting rules
- `jest.config.ts`: Test framework configuration

## Database & Migrations

### TypeORM Migrations
- Stored in `src/migrations/`
- Naming: `{timestamp}-{DescriptiveName}.ts`
- Auto-run on application startup (via `migrationsRun: true`)
- Generate from entity changes: `pnpm run migration:generate`
- Revert if needed: `pnpm run migration:revert`

### Entity Files Location
- Entities colocated with feature modules
- Path pattern: `src/{feature}/entities/{feature}.entity.ts`
- TypeORM auto-loads from pattern: `src/**/*.entity.{js,ts}`

## Import Patterns

### Absolute Imports
- Use tsconfig-paths for clean imports
- Example: `import { UsersService } from 'src/users/users.service'`
- Avoid relative paths (`../../../`) in larger modules

### Module Imports
- Feature modules imported into AppModule
- Internal module imports via TypeOrmModule.forFeature()
- Cross-module dependencies through DI only

## Build Artifacts

### Compilation Output (`dist/`)
- Generated from `pnpm run build`
- Compiled JavaScript (`.js` files)
- Source maps for debugging
- Ready for production deployment

### Ignored Directories
- `node_modules/`: Dependencies (excluded from repo)
- `dist/`: Build output (excluded from repo)
- `coverage/`: Test coverage (excluded from repo)
