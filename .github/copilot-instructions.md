# NestJS Products API - Copilot Instructions

## Architecture Overview
This is a **NestJS REST API** with a modular structure. The application follows NestJS patterns:
- **AppModule** (root) imports feature modules
- **ProductsModule** encapsulates a CRUD API for products at `/products` endpoint
- Services handle business logic; Controllers handle HTTP routing
- DTOs and Entities define data contracts

### Module Structure
```
src/
├── app.module.ts         # Root module (imports ProductsModule)
├── app.controller.ts     # GET / endpoint for health check
├── app.service.ts        # Root service
├── main.ts               # Bootstrap entry point
└── products/
    ├── products.module.ts      # Feature module (self-contained)
    ├── products.service.ts     # Business logic (CRUD in-memory)
    ├── products.controller.ts  # Route handlers (@Controller('products'))
    ├── dto/
    │   ├── create-product.dto.ts    # Request validation schema (empty stub)
    │   └── update-product.dto.ts    # Patch request schema
    └── entities/
        └── product.entity.ts         # Product model (id, name, price, description)
```

## Key Patterns & Conventions

### 1. Controller→Service Dependency Injection
Always inject services into controllers via constructor, never instantiate:
```typescript
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  findAll() {
    return this.productsService.findAll();
  }
}
```

### 2. Data Flow: Controller → Service → Repository
- **Controller** (@Get, @Post, @Patch, @Delete decorators) extracts HTTP params/body
- **Service** (@Injectable) holds business logic and data access
- **Products service** currently maintains in-memory `products: Product[]` array (no database)
- Example: `findOne(id)` converts string param to number: `@Param('id') id: string` → `+id`

### 3. DTO Usage
- **CreateProductDto** used in `@Post()` with `@Body()` decorator
- **UpdateProductDto** used in `@Patch()` 
- Currently empty stubs; add properties to enforce validation (e.g., `@IsString() name: string`)
- Reference: `src/products/dto/` folder

### 4. Service Methods Pattern
ProductsService defines CRUD methods matching REST operations:
```typescript
create(dto)      // POST → returns string placeholder (implement)
findAll()        // GET  → returns this.products array (working)
findOne(id)      // GET /:id → returns string placeholder (implement)
update(id, dto)  // PATCH /:id → returns string placeholder (implement)
remove(id)       // DELETE /:id → returns string placeholder (implement)
```

## Development Workflows

### Build & Run
```bash
npm run build              # Compile TypeScript → dist/
npm run start              # Production: node dist/main
npm run start:dev          # Watch mode (recommended for development)
npm run start:debug        # Debug mode + watch
```

### Testing
```bash
npm run test               # Jest unit tests (*.spec.ts files)
npm run test:watch        # Watch mode for TDD
npm run test:cov          # Coverage report
npm run test:e2e          # End-to-end tests (test/jest-e2e.json)
npm run test:debug        # Debug Jest with Node inspector
```

### Code Quality
```bash
npm run lint               # ESLint + auto-fix
npm run format             # Prettier formatting
```

## Important Implementation Notes

### In-Memory Storage
- ProductsService uses `private products: Product[] = []`
- Data is **not persisted** between server restarts
- Suitable for development/demo; replace with real database (TypeORM, Prisma) for production

### Incomplete CRUD Methods
Service methods return placeholder strings; implement actual logic:
- `create()` should add to products array and return created Product
- `findOne()` should search array by id
- `update()` should modify existing product
- `remove()` should splice from array

### Type Safety
- Use `Product` entity in service return types, not plain objects
- Always convert route params from string: `@Param('id') id: string` → coerce to `+id: number`
- Define DTO properties with proper class-validator decorators (currently empty)

## Decorators Quick Reference
- `@Module()` – Defines feature module with imports/controllers/providers
- `@Injectable()` – Marks service as injectable dependency
- `@Controller(route)` – Base path for route handlers
- `@Get() / @Post() / @Patch() / @Delete()` – HTTP method decorators
- `@Param(name)` – Extract URL parameter
- `@Body()` – Extract request body
- `@Controller() / @Get()` – Apply decorators together for routing

## File Locations for Common Tasks
- **Add API endpoint** → `src/products/products.controller.ts`
- **Implement business logic** → `src/products/products.service.ts`
- **Define request schema** → `src/products/dto/create-product.dto.ts` or `update-product.dto.ts`
- **Modify data model** → `src/products/entities/product.entity.ts`
- **Add health check** → `src/app.service.ts` or `src/app.controller.ts`
- **Configure routes** → `src/app.module.ts` (imports)
