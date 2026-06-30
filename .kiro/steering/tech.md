# Tech Stack & Build System

## Core Dependencies
- **NestJS 11.x**: Progressive Node.js framework for building scalable server-side applications
- **TypeScript 5.x**: Type-safe language superset of JavaScript
- **TypeORM 1.x**: Object-Relational Mapper for database interactions
- **PostgreSQL**: Primary database (via `pg` driver)
- **Swagger/OpenAPI**: API documentation and interactive UI

## Development Tools
- **Package Manager**: pnpm (use `pnpm install`, `pnpm run`)
- **Linter**: ESLint with prettier integration
- **Code Formatter**: Prettier
- **Test Framework**: Jest with ts-jest for TypeScript support
- **E2E Testing**: Supertest for HTTP assertion

## Validation & Transformation
- **class-validator**: Decorator-based validation
- **class-transformer**: DTO transformation and serialization

## Configuration
- **dotenv**: Environment variable management (reads `.env` file)
- **@nestjs/config**: NestJS configuration module

## Build & Runtime Commands

### Development
```bash
pnpm run start          # Start application (single run)
pnpm run start:dev      # Start with watch mode (recommended for development)
pnpm run start:debug    # Start with debugger attached and watch mode
```

### Build & Production
```bash
pnpm run build          # Compile TypeScript to dist/
pnpm run start:prod     # Run compiled application (requires build first)
```

### Code Quality
```bash
pnpm run lint           # Run ESLint and auto-fix issues
pnpm run format         # Format code with Prettier
```

### Testing
```bash
pnpm run test           # Run unit tests (watches for changes in test environment)
pnpm run test:watch     # Run tests in watch mode
pnpm run test:cov       # Generate coverage report
pnpm run test:debug     # Debug tests with Node inspector
pnpm run test:e2e       # Run end-to-end tests (separate jest config)
```

### Database Migrations
```bash
pnpm run migration:generate -- ./src/migrations/MigrationName
# Generate migration from entity changes (auto-detects differences)

pnpm run migration:create -- ./src/migrations/MigrationName
# Create empty migration template manually

pnpm run migration:run
# Execute all pending migrations

pnpm run migration:revert
# Revert last executed migration
```

## Database Configuration
- **Type**: PostgreSQL
- **Connection**: URL-based via `DATABASE_URL` environment variable
- **Synchronize**: Disabled (use migrations instead)
- **Auto-load Entities**: Enabled (entities auto-loaded from modules)
- **Migrations**: Run automatically on startup (`migrationsRun: true`)
- **SSL**: Enabled in production (`STAGE === 'prod'`)
- **UTC**: Enabled for consistent timezone handling
- **Logging**: Enabled for SQL query visibility

## TypeScript Configuration
- **Paths**: Configured for absolute imports (tsconfig-paths)
- **Root Dir**: `src/`
- **Output Dir**: `dist/`
- **Module**: CommonJS
- **Target**: ES2021+
- **Strict Mode**: Enabled

## Project Structure Configuration
- **Main Entry**: `src/main.ts`
- **Build Output**: `dist/`
- **Test Pattern**: `**/*.spec.ts` files in `src/`
- **E2E Pattern**: `test/**/*.e2e-spec.ts`
- **Coverage Path**: `coverage/`

## Key Environment Variables (see `.env`)
- `DATABASE_URL`: PostgreSQL connection string
- `STAGE`: Application stage (`dev` or `prod`) - controls SSL behavior
- Other app-specific configurations as needed

## Docker Support
- Dockerfile for containerization
- compose.yaml for docker-compose orchestration
- .dockerignore for optimized builds
