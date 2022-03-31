#### Benefits of TypeScript:

1. __Static Types__: variables, parameters, return types,etc.
2. __Organization__: Making it easier to manager a large codebase.
    1. classes
    2. namespaces
    3. modules
    4. interfaces
3. __Tooling__:
    1. static type analysis
    2. many "instant" errors
    3. detect unused data / unreachable code
    4. source maps - debug directly in TypeScript

## TypeScript Intro

___

### TypeScript Project Files

* Simple JSON text file named `tsconfig.json`
* Stores compiler options used with the project
* Specifies files to be included or excluded in compilation
* Supports configuration inheritance

#### Basic TypeScript Types:

___

* __boolean__
* __number__
* __string__
* __array__
* __enum__

#### Additional Built-in Types:

____

* void
* null
* undefined
* never
* any

#### Union Types => Example:

```ts
let someValue: number | string;
someValue = 42;
someValue = 'Hello Or Hasson';
```

#### Using the `--strictNullChecks` Compiler Option

```ts
let basicString: string;
basicString = null;
(ERROR)
basicString = undefined;
(ERROR)

let nullableString: string | null;
nullableString = null;
(OK)
nullableString = undefined;
(ERROR)

let mysteryString: sring | null | undefined;
mysteryString = null;
(OK)
mysteryString = undefined;
(OK)
```

#### Type Assertions

```ts
let value: any = 5;
let fixedString: string = (
    <number>value).toFixed(4);
console.log(fixedString); // 5.0000

// another syntax for Type Assetion
let fixedString: string = (value as number).toFixed(4);
console.log(fixedString); // 5.0000
```

#### Adding Type Annotations to Functions

```ts
// JavaScript
function dullFunc(value1, value2) {
    return "I love the way you love the way you love.";
}

// TypeScript
function funFunc(score: number, message?: string): string {
    return "I love the way you love the way you love.";
}
```

#### Using the `--noImplicitAny` Compiler Option

```ts
function dullFun(value1, value2) {
    return "I love the way you love the way you love.";
}

ERROR
TS7006: Parameter
'value1'
implicityly
has
an
'any'
type.ERROR
TS7006: Parameter
'value2'
implicityly
has
an
'any'
type. 
```

#### Default-Initialized Parameters

```ts
function sendGreeting(greeting: stirng = 'Good morning!'): void {
    console.log(greeting);
}

sendingGreeting(); // Good morning!
sendGreeting('Good afternoon, Or Hasson!'); // Good afternoon, Or Hasson!
```

#### interfaces vs. Classes

1. __Interfaces__:
    1. Define a new type
    2. Properties(signatures)
    3. Methods (signatures)
    4. Cannot be instantiated
2. __Classes__:
    1. Define a new type
    2. Properties (with implementation)
    3. Methods (with implementation)
    4. Can be instantiated

```ts
// Creating an Interface:
interface Employee {
    name: string;
    title: string;
}

interface Manger extends Employee {
    department: string;
    numOfEmployees: number;
    scheduleMeeting: (topic: string) => void;
}
```

#### Class Members

* Method implementation
* Property implementation
* Accessors (getters and setters)
* Access modifiers
    * _**public**_
    * **_private_**
    * **_protected_**

```ts
class Developer {
    department: string;
    private _title: string;
    get title(): string {
        return this._title;
    }

    set title(newTitle: string) {
        this._title = newTitle.toUpperCase();
    }

    documentRequirements(requirements: string): void {
        console.log(requirements);
    }
}
```

#### Extending a Class

```ts
class WebDeveloper extends Developer {

    favoriteEditor: string;

    writeTypeScript(): void {
// write awesome code
    }
}

let webdev: WebDeveloper = new WebDeveloper();
webdev.department = 'Software Engineering';
webdev.favoriteEditor = 'WebStorm';

```

#### Implementing an Interface

```ts
interface Employee {
    name: string;
    title: string;
    logID: () => string;
}

class Engineer implements Employee {
    name: string;
    title: string;

    logID() {
        return `${this.name}_${this.title}`;
    }
}
```

#### Static Members

```ts
class WebDeveloper extends Developer {
    static jobDescription: string = 'Build cool things!';

    static logFavoriteProtocol() {
        console.log('HTTPS, of course!');
    }

    logJobDescription(): void {
        console.log(WebDeveloper.jobDescription);
    }
}

WebDeveloper.logFavoriteProtocol();
```

#### Constructors

```ts
class Developer {
    constructor() {
        console.log('Creating a new developer.');
    }
}

class WebDeveloper extends Developer {
    readonly favoriteEditor: string;

    constructor(editor: string) {
        super();
        this.favoriteEditor = editor;
    }
}
```

#### Why Use Modules?

____

* Encapsulation
* Re-usability
* Create higher-level abstractions

#### Exporting a Declaration

```ts
// person.ts
export interface Person {
}

export function hireDeveloper(): void {
}

export default class Employee {
}

class Manager {
} // not accessible outside the module
```

#### Exporting Statements

```ts
interface Person {
}

function hireDeveloper(): void {
}

class Employee {
}

class Manager {
}

export {Person, hireDeveloper, Employee as StaffMember};
```

#### Importing from a Module

```ts
// player.ts
import {Person, hireDeveloper} from './person';

let human: Person;

import Worker from './person';

let engineer: Worker = new Worker();

import {StaffMember as CoWorker} from './person';

let emp: CoWorker = new CoWorker();

import * as HR from './person';

HR.hireDeveloper();
```

#### Relative vs. Non-relative Imports

```ts
// relative imports
import {Laptop} from '/hardware';
import {Developer} from './person';
import {NewHire} from '../HR/recruiting';

// non-relative imports 
import * as $ from 'jquery';
import * as lodash from 'lodash';

```

#### Module Resolution Strategies (Classic vs Node)

`tsc --moduleResulution Classic | Node`

* __Classic__:
    * Default when emitting AMD, UMD, System, or ES2015 modules
    * Simple
    * Less Configurable
* __Node__:
    * Default when emitting CommonJS modules
    * Closely mirrors Node module resolution
    * More configurable

#### Resolving Classic Relative Imports

```ts
// File: /Source/MultiMath/player.ts
import {Developer} from './person';

/**
 *  The import will search:
 *  1. /Source/MultiMath/person.ts
 *  2. /Source/MultiMath/person.d.ts
 */
```

#### Resolving Classic Non-relative Imports

```ts
// File: /Source/MultiMath/player.ts
import {Developer} from 'person';
/**
 *  The import will search:
 *  1. /Source/MultiMath/person.ts
 *  2. /Source/MultiMath/person.d.ts
 *  3. /Source/person.ts
 *  4. /Source/person.d.ts
 *  (continue searching up the directory tree)
 */
```

#### Resolving Node Relative Imports

```ts
// File: /Source/MultiMath/player.ts
import {Developer} from 'person';
/**
 *  The import will search:
 *  1. /Source/MultiMath/person.ts
 *  2. /Source/MultiMath/person.tsx
 *  3. /Source/MultiMath/person.d.ts
 *  4. /Source/MultiMath/person/package.json (with "types" property)
 *  5. /Source/MultiMath/person/index.tsx
 *  6. /Source/MultiMath/person/index.d.ts
 *
 */
```

#### Resolving Node Non-relative Imports

```ts
// File: /Source/MultiMath/player.ts
import {Developer} from 'person';
/**
 *  The import will search:
 *  1. /Source/MultiMath/node_modules/person.ts (person.tsx, person.d.ts)
 *  2. /Source/MultiMath/node_modules/person/package.json (with "types" property)
 *  3. /Source/MultiMath/node_modules/@types/person.d.ts
 *  4. /Source/MultiMath/node_modules/person/index.ts (index.tsx, index.d.ts)
 *  5. /Source/node_modules/person.ts (person.tsx, person.d.ts)
 *  6. /Source/node_modules/@types/person.d.ts
 *  7. /Source/node_modules/person/index.ts (index.tsx, index.d.ts)
 */
```

### Type Declaration Files

___

#### What Are Type Declaration Files?

* **_TypeScript wrapper for JavaScript libraries_**
    * Types for variables, functions, etc.
    * Define valid property names.
    * Define function parameters.
* **_Development-time tool_**
* **_Filenames end with .d.ts_**
* **_Available for thousands of libraries_**

#### DefinitelyTyped

* _GitHub repository containing thousands of type declaration files._
* _Declaration files often maintained independent of related JavaScript library._
* _Source for installation utilities._

#### Installing Type Declaration Files

* Installed with npm
* Packages installed from `@types/<name>`
* Sourced from the DefinitelyTyped repository.
  <br><br>

### **_Write code faster_**.

## **_Find errors faster_**

# **_Provide value faster_**

## Object-oriented with TypeScript

____

### The Roles of Objects:

* Store state
* Pass state
* Group related functionality
* Model real-world objects

### Key Object Creation Techniques

* Constructor Function
* Object Literal
* Object.create()
* Class

## Object-oriented Programming

___
Programs are composed of objects which communicate with each other, which may be arranged into hierarchies, and which
can be combined to form additional objects.

### OOP Benefits

* Code reuse
* Faster development time frames
* Real-world mapping of objects
* Modular architecture
* More maintainable code base

### Principles of Object-oriented Programming

* Abstraction
* Encapsulation
* Inheritance
* Polymorphism

#### Abstraction

Abstract complex functionality into an object that can be used as the base for other objects.

#### Encapsulation

Objects provide public access points that can be used to interact with private members.

#### Inheritance

Objects can share functionality from existing objects and create a family hierarchy.

#### Polymorphism

Objects exhibit the same behavior but in a different way.

## Classed and Objects

____

### What's in a Class?

- Fields
- Properties
- Constructor
- Functions/Methods

```ts
class Person {
    firstName: string;
    lastName: string;
}
```

_**Creating a Property:**_ _Properties can be defined directly withing a class._

```ts
class Person {
    private _age: number;

    get age() {
        return this._age;
    }

    set age(value: number) {
        if (value > 0) {
            this._age = value;
        }
    }
}
```

```ts
class Person {
    placeOrder(productId: number, quantity: number): OrderResponse {
        return {
            status: true,
            orderId: 42
        };
    }
}
```

_**Defining a Return Type**_: TypeScript automatically infers the return type of function/method, however, we can
explicitly define one.

### Constructors and Properties

```ts
class Person {
    firstName: string;
    lastName: string;

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
```

_**Creating a Class Constructor**_: A constructor is called when a class is instantiated to create an object. A
constructor can accept parameters that can be mapped to properties.

```ts
class Person {
    constructor(public firstName: string, public lastName: string) {
    }
}
```

_**Automatic Properties**_:Properties can be defined in a constructor using accessibility modifiers (public/private)
By using _*automatic property*_ functionality, a property will be generated, and the constructor value will be mapped to
it.

## Inheritance and Abstraction

____
_**Abstraction**_: Abstract complex functionality into an object that can be used as the base for other objects.

### Inheriting from a Class

```ts
class BankAccount {
    constructor(id: number) {
        // code...
    }
}

class CheckingAccount extends BankAccount {
    constructor(id: number) {
        super(id); // required 
    }
}
```

Inheriting from a Class: __Classes can inherit/derive functionality from other classes Use the extends keyword.__

### Abstraction

Abstract complex functionality into an object that can be used as the base for other objects.

### Creating an Abstract Class

An abstract class can be used as foundation for other classes. Can define concrete members as well as abstract members.

```ts
import {AccountType} from "./enums";

abstract class BankAccount {
    // Abstract member (must be implented by child)
    abstract accountType: AccountType;

    // Concrete member
    deposit() { /* code ...*/
    }
}
```

### Summary Of Classes and Objects:

* Inheritance provides a way to promote reuse across objects in an application.
* Use the extends keyword for inheritance.
* Call __super()__ in a child class constructor when the base/parent class has a constructor.
* Abstract classes "abstract" functionality serve as the foundation for other classes.
* Create abstract classes and members by using the abstract keyword.

## Interfaces and Polymorphism

___

### Interfaces

* _*Interfaces act as a contract that defines a set of rules.*_
* _*Interfaces can be used to enforce consistency across different classes in an application.*_

### Creating an Interface

Creating an Interface

* _*Interfaces can be used to create custom data types*_.
* _*Classes can implement interfaces which can help ensure consistency across an application*_.
* _*Interfaces are only used during development (no impact on script/bundle size)*_.

```ts
interface DepositWithdrawal {
    deposit(amount: number): void;

    withdrawal(amount: number): void;
}

interface AccountInfo {
    routingNumber: number;
    bankNumber: number;
}
```

### Implementing an Interface

_**Classes can implement interfaces using the TypeScript implements keyword**_

```ts
class ATM implements DepositWithdrawal {
    deposit(amount: number) {/*code...*/
    }

    withdrawal(amount: number) {/*code...*/
    }
}

interface DepositWithdrawal {
    deposit(amount: number): void;

    withdrawal(amount: number): void;
}
```

### Polymorphism

Objects exhibit the same behavior but in a different way.

### Using Interfaces as Types

_**Interfaces can be used as types to define the "shape" of data held in property or that is passed to a function/method
or constructor**_

```ts
accounInfo: AccountInfo;

interface AccountInfo {
    routingNumber: number;
    bankNumber: number;
}
```

### Summary Of Interfaces and Polymorphism:

* Interfaces are code contracts.
* Key benefits of using interfaces include:
    * Drive consistency across multiple objects.
    * Define the "shape" of data passed to a constructor or function/method.
    * Use as custom data type.
* Classes can implement an interface by using the implements' keyword.
* Abstract classes and interfaces can both be used to achieve polymorphic behavior.









