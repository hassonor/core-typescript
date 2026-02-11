# Core TypeScript – Concepts, Patterns & Hands-On Examples

![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript >= 5.0](https://img.shields.io/badge/typescript-%3E%3D5.0-blue)
![Node.js >= 20](https://img.shields.io/badge/node-%3E%3D20.x-brightgreen)

A **comprehensive knowledge base** of TypeScript code & learning resources collected from courses, books, and production TypeScript projects. The repository is organized as a **mono-repo where each top-level folder is a self-contained mini-project** – clone the repo, `cd` into a folder, install, and run.

> **Tip ▸** Can't see a folder mentioned below? The repository is evolving – pull to get the latest or open an issue and we'll add it.

---

## 🗂 Directory Index (root-level)

| Folder | Quick Glance |
|--------|--------------|
| `typescript-basics` | Types, interfaces, type inference, union types |
| `advanced-types` | Generics, conditional types, mapped types, utility types |
| `decorators` | Class decorators, method decorators, property decorators |
| `modules-namespaces` | ES6 modules, module resolution, ambient modules |
| `classes-oop` | Inheritance, access modifiers, abstract classes |
| `interfaces-advanced` | Interface merging, extending interfaces, index signatures |
| `generics-deep-dive` | Generic functions, classes, constraints, variance |
| `type-guards` | User-defined type guards, `is` keyword, discriminated unions |
| `enums` | Numeric enums, string enums, const enums, enum at runtime |
| `utility-types` | Partial, Required, Readonly, Pick, Omit, Record |
| `async-typescript` | Promises with types, async/await, generic async patterns |
| `typescript-with-react` | Component typing, hooks, props, event handlers |
| `typescript-with-node` | Express with TS, typed middleware, request/response |
| `typescript-config` | tsconfig.json deep dive, compiler options, project references |
| `testing-typescript` | Jest with TS, type-safe mocks, testing utilities |

_The easiest way to explore is `gh repo clone hassonor/core-typescript && tree -L 2`_

---

## 🚀 Run an Example

```bash
# clone once
$ git clone https://github.com/hassonor/core-typescript.git
$ cd core-typescript

# pick a project
$ cd generics-deep-dive/01-generic-functions

# install deps & start
$ npm install
$ npm start
```

Each folder contains:
- `README.md` – explanation of concepts
- `src/` – TypeScript source files with examples
- `package.json` – dependencies and scripts
- `tsconfig.json` – TypeScript compiler configuration

---

## 📚 Core Concepts Covered

### 1. TypeScript Type System

#### Basic Types
```typescript
let isDone: boolean = false;
let count: number = 42;
let username: string = "Alice";
let items: number[] = [1, 2, 3];
let tuple: [string, number] = ["hello", 10];
```

#### Union Types
```typescript
let value: number | string;
value = 42;     // ✅ OK
value = "text"; // ✅ OK
value = true;   // ❌ Error
```

#### Type Aliases
```typescript
type ID = number | string;
type User = {
  id: ID;
  name: string;
  email: string;
};
```

#### Interfaces
```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  category?: string;  // Optional property
}
```

---

### 2. Advanced Types

#### Generics
```typescript
function identity<T>(arg: T): T {
  return arg;
}

class Box<T> {
  constructor(public value: T) {}
}

const numberBox = new Box<number>(123);
const stringBox = new Box<string>("hello");
```

#### Conditional Types
```typescript
type IsString<T> = T extends string ? true : false;
type A = IsString<string>;  // true
type B = IsString<number>;  // false
```

#### Mapped Types
```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Optional<T> = {
  [P in keyof T]?: T[P];
};
```

#### Utility Types
```typescript
// Partial - make all properties optional
type PartialUser = Partial<User>;

// Required - make all properties required
type RequiredUser = Required<PartialUser>;

// Pick - select specific properties
type UserPreview = Pick<User, 'id' | 'name'>;

// Omit - remove specific properties
type UserWithoutEmail = Omit<User, 'email'>;

// Record - construct object type
type UserRoles = Record<string, User>;
```

---

### 3. Object-Oriented Programming

#### Classes
```typescript
class Animal {
  private name: string;
  protected age: number;
  public species: string;

  constructor(name: string, age: number, species: string) {
    this.name = name;
    this.age = age;
    this.species = species;
  }

  public makeSound(): void {
    console.log("Some sound");
  }
}
```

#### Inheritance
```typescript
class Dog extends Animal {
  constructor(name: string, age: number) {
    super(name, age, "Dog");
  }

  public makeSound(): void {
    console.log("Woof! Woof!");
  }
}
```

#### Abstract Classes
```typescript
abstract class Shape {
  abstract calculateArea(): number;

  public describe(): void {
    console.log(`Area: ${this.calculateArea()}`);
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  calculateArea(): number {
    return Math.PI * this.radius ** 2;
  }
}
```

---

### 4. Type Guards

#### User-Defined Type Guards
```typescript
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function processValue(value: string | number) {
  if (isString(value)) {
    console.log(value.toUpperCase()); // TypeScript knows it's string
  } else {
    console.log(value.toFixed(2)); // TypeScript knows it's number
  }
}
```

#### Discriminated Unions
```typescript
type Success = { status: "success"; data: any };
type Failure = { status: "failure"; error: string };
type Result = Success | Failure;

function handleResult(result: Result) {
  if (result.status === "success") {
    console.log(result.data); // TypeScript knows it's Success
  } else {
    console.log(result.error); // TypeScript knows it's Failure
  }
}
```

---

### 5. Decorators

#### Class Decorators
```typescript
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class BugReport {
  type = "report";
  title: string;

  constructor(t: string) {
    this.title = t;
  }
}
```

#### Method Decorators
```typescript
function log(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyName} with`, args);
    return originalMethod.apply(this, args);
  };
}

class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }
}
```

---

## 🛠 TypeScript Configuration

### tsconfig.json Essentials

```json
{
  "compilerOptions": {
    "target": "ES2022",                          // Modern JavaScript output
    "module": "commonjs",                        // Module system
    "lib": ["ES2022"],                          // Standard library
    "outDir": "./dist",                         // Output directory
    "rootDir": "./src",                         // Source directory
    "strict": true,                             // Enable all strict checks
    "esModuleInterop": true,                    // CommonJS/ESM interop
    "skipLibCheck": true,                       // Skip type checking of .d.ts files
    "forceConsistentCasingInFileNames": true,  // Enforce case sensitivity
    "resolveJsonModule": true,                  // Import JSON files
    "declaration": true,                        // Generate .d.ts files
    "declarationMap": true,                     // Source maps for .d.ts
    "sourceMap": true,                          // Source maps for debugging
    "noUnusedLocals": true,                    // Report unused locals
    "noUnusedParameters": true,                 // Report unused parameters
    "noImplicitReturns": true,                 // Report missing returns
    "noFallthroughCasesInSwitch": true         // Report switch fallthrough
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Compiler Options Explained

| Option | Description | Use When |
|--------|-------------|----------|
| `strict` | Enables all strict type checking | Always (production code) |
| `noImplicitAny` | Error on implicit `any` | Always |
| `strictNullChecks` | Null/undefined not assignable to other types | Always |
| `strictFunctionTypes` | Stricter function type checks | Always |
| `noUnusedLocals` | Report unused variables | Always |
| `noImplicitReturns` | All code paths must return | Functions with return type |
| `esModuleInterop` | Better CommonJS/ESM compatibility | When using both module systems |

---

## 🧪 Testing with TypeScript

### Jest Configuration

```typescript
// jest.config.ts
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/*.test.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};

export default config;
```

### Type-Safe Tests

```typescript
import { sum } from './math';

describe('sum function', () => {
  it('should add two numbers correctly', () => {
    const result: number = sum(2, 3);
    expect(result).toBe(5);
  });

  it('should have correct type signature', () => {
    // @ts-expect-error - testing invalid types
    sum("2", "3"); // TypeScript catches this!
  });
});
```

---

## 📖 Learning Path

### Beginner Track
1. `typescript-basics/` - Start here!
2. `classes-oop/` - Object-oriented programming
3. `interfaces-advanced/` - Interface patterns
4. `typescript-config/` - Configure your projects

### Intermediate Track
5. `generics-deep-dive/` - Generic programming
6. `type-guards/` - Advanced type narrowing
7. `utility-types/` - Built-in utility types
8. `async-typescript/` - Async/await with types

### Advanced Track
9. `decorators/` - Metaprogramming
10. `advanced-types/` - Conditional, mapped types
11. `typescript-with-react/` - React + TypeScript
12. `typescript-with-node/` - Node.js + TypeScript

---

## 🎯 Best Practices

### ✅ DO:
- Always enable `strict` mode in tsconfig.json
- Use `readonly` for immutable data
- Prefer `interface` over `type` for object shapes
- Use `enum` for fixed sets of constants
- Leverage utility types (`Partial`, `Pick`, `Omit`)
- Write type guards for runtime type checking
- Use generics for reusable components
- Add return types to functions (don't rely on inference)

### ❌ DON'T:
- Use `any` (use `unknown` instead)
- Ignore TypeScript errors with `@ts-ignore`
- Over-use type assertions (`as`)
- Create deeply nested generic types
- Mix `interface` and `type` inconsistently
- Forget to configure `strict` mode
- Omit return types on public APIs

---

## 🔧 Development Setup

### Install TypeScript

```bash
# Global installation
npm install -g typescript

# Verify installation
tsc --version
```

### Create New TypeScript Project

```bash
# Initialize npm project
npm init -y

# Install TypeScript and Node types
npm install --save-dev typescript @types/node

# Initialize tsconfig.json
npx tsc --init

# Create project structure
mkdir src dist
touch src/index.ts
```

### Run TypeScript

```bash
# Compile once
npx tsc

# Watch mode
npx tsc --watch

# Run directly with ts-node
npx ts-node src/index.ts

# Or use tsx (faster alternative)
npm install --save-dev tsx
npx tsx src/index.ts
```

---

## 📚 Resources

### Official Documentation
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) - Type definitions

### Books
- *Programming TypeScript* by Boris Cherny
- *Effective TypeScript* by Dan Vanderkam
- *TypeScript Quickly* by Yakov Fain & Anton Moiseev

### Online Courses
- TypeScript for Beginners (Udemy)
- Advanced TypeScript Patterns (Frontend Masters)
- TypeScript with React (Egghead.io)

---

## 🤝 Contributing

Contributions welcome! To add new examples or improve existing ones:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-example`
3. Add your example in a new folder with:
   - `README.md` explaining the concept
   - `src/` with TypeScript code
   - `package.json` with dependencies
4. Ensure code compiles: `npm run build`
5. Commit changes: `git commit -m "Add example: [topic]"`
6. Push and create a Pull Request

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ by [Or Hasson](https://github.com/hassonor)**

⭐ Star this repo if you're learning TypeScript!

</div>
