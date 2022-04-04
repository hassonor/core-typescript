# TypeScript Intro

___

### TypeScript Project Files

* Simple JSON text file named `tsconfig.json`
* Stores compiler options used with the project
* Specifies files to be included or excluded in compilation
* Supports configuration inheritance

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

# TypeScript Generics

____

### What Are Generics?

* Reusable code that works with multiple types.
* May be functions, interfaces, or classes.
* Code that accepts type parameters for each instance or invocation.

### Generic Functions

* Generics are not just for classes.
* Type-safe versatility.
* Generic constraints increase practicality.
* Generic function types add flexibility.

### Generic Interfaces and Classes

#### Stack Data Structure (Last in, First out)

Stack.ts:

```ts
interface DataStructure<T> {
    push(newItem: T): void;

    pop(): T;
}

export class Stack<T> implements DataStructure<T> {
    items: Array<T> = [];

    pop(): T {
        return this.items.pop();
    }

    push(newItem: T): void {
        this.items.push(newItem);
    }

    peek(): T {
        return this.items[this.items.length - 1];
    }

}

```

main.ts:

```ts
import {Stack} from "./stack";

let myNumberStack: Stack<number> = new Stack<number>();
myNumberStack.push(1);
myNumberStack.push(2);
myNumberStack.push(3);

console.log(myNumberStack.pop()); // 3
console.log(myNumberStack.peek()); // 2
console.log(myNumberStack.pop()); // 2
console.log(myNumberStack.pop()); // 1
```

*** **GENERIC CLASSES ARE ONLY GENERIC OVER THEIR INSTANCES.** ***

#### Summary: Generic Interfaces and Classes

___

* Use generic interfaces with object literals or generic classes.
* Generic classes offer type-safe versatility (with or without implementing an interface).
* Type constraints increase practicality.

# TypeScript 4 In-Depth

___

## TypeScript Basics

___

### Declaring Variables with var, let  and const

* __var__
    1. Globally available in the function in which it is declared.
    2. "Hoisted" to the top of the function.
    3. Variable name may be declared a second time in the same function.
* __let and const__
    1. Only available in the block in which it is declared.
    2. Not "hoisted" to the top of the block.
    3. Variable name may only be declared once per block.

Example - var Versus let:

```ts
    function ScopeTest() {
    if (true) {
        var old_technique = 'use anywhere';
        let new_technique = 'use in this block';
        // do some more stuff
    }

    console.log(old_technique); // works!
    console.log(new_technique); // error!
}
```

### Common Type and Type Annotations:

* boolean
* number
* array
* enum
* any
* void

### Enums:

```ts
enum Category {Mathematics, Biology, Fiction}; // 0,1,2
enum Category {Mathematics = 1, Biology, Fiction}; // 1,2,3

let favoriteCategory: Category = Category.Biology;
console.log(favoriteCategory); // 2

let categoryString = Category[favoriteCategory]; // Biology
```

### Arrays:

__Arrays__:

* can be declared two different ways
* Accessed and used much like JavaScript arrays.

```ts
let strArr1: string[] = ['here', 'I', 'am'];
let strArr2: Array<string> = ['here', 'I', 'am', 'again'];

let anyArr: any[] = [32, true, 'Apple'];
```

### Tuples:

__Tuples__:

* Array where types for first few elements are specified.
* Types do not have to be the same.
* Additional elements can be any type from those previously specified.

```ts
let myTuple: [number, string] = [21, 'bus'];
let firstElement = myTuple[0]; // 21
let secondElement = myTuple[1]; // bus

// other elements can be numbers or strings
myTuple[2] = 101;
myTuple[2] = "Or Hasson";
```

## TypeScript Functions

___

### Functions in TypeScript Versus JavaScript

_**TypeScript**_:

* Type
* Arrow functions
* Function types
* Required and optional parameters
* Default parameters
* Rest parameters
* Overloaded functions

_**JavaScript**_:

* Limited types and no type checking
* Arrow function (ES2015)
* No function types
* All parameters are optional
* Default parameters (ES2015)
* Rest parameters (ES2015)
* No overloaded functions

### Arrow Functions

* Concise syntax for anonymous functions
* "this" is captured at function creation - not invocation

### Function Types

* Combination of parameter types and return type Variables may be declared with function types
* Variables may be declared with function types
* Function assigned must have the same signature as the variable type

```ts
function PublicationMessage(year: number): string {
    return 'Date published: ' + year;
}

let publishFun: (someYear: number) => string;
publishFunc = PublicationMessage;
let message: string = publishFun(2021);
```

### Optional and Default Parameters

* Optional parameters denoted with "?" after parameter name
* Must appear after all required parameters
* Default parameters may be set to a literal value or an expression

```ts
function CreateCustomer(name: string, age?: number) {
}

function GetBookByTitle(title: string = 'The JavaScript Programming Language') {
}

function GetBookByTitle(title: string = GetMostPupolarBook()) {
}
```

### Rest Parameters

* Collects a group of parameters into a single array.
* Denoted with an ellipsis prefix on last parameter.

```ts
function GetBooksReadForCust(name: string, ...bookIDs: number[]) {
}

let books = GetBooksReadForCust('Or', 2, 4);
let books2 = GetBooksReadForCust('Hasson', 1, 2, 3, 4, 5, 6);
```

### Interfaces

* Contracts that define types
* Compiler enforces the contract via type checking
* Collection of property and method definitions
* Duck typing

_**Duck Typing**_:

```ts
interface Duck {
    walk: () => void;
    swim: () => void;
    quack: () => void;
}

let probablyADuck = {
    walk: () => console.log('walking like a duck'),
    swim: () => console.log('swimming like a fuck'),
    quack: () => console.log('quacking like a duck')
}

function FlyOverWater(bird: Duck) {
}

FlyOverWater(probablyADuck); // works!!!
```

Defining an Interface <br>
`interface` keyword <br>
List properties with their types<br>
Optional properties denoted with "?"<br>
Provide function signature - no implementation

```ts
interface Book {
    id: number;
    title: string;
    author: string;
    pages?: number;
    markDamaed: (reason: string) => void;
}
```

### Interfaces for Function Types

```ts
function CreateCustomerID(name: string, id: number): string {
    return name + id;
}

interface StringGenerator {
    (chars: string, nums: number): string;
}

let IdGenerator = StringGenerator
IdGenerator = CreateCustomerID;
```

### Extending Interfaces

```ts
interface LibraryResource {
    catalogNumber: number;
}

interface Book {
    title: string;
}

interface Encyclopedia extends LibraryResource, Book {
    volume: number;
}

let refBook: Encyclopedia = {
    catalogNumber: 1234,
    title: 'The Book of life',
    volume: 120
}
```

### Class Types

```ts
interface Librarian {
    doWork: () => void;
}

class ElementarySchoolLibrarian implements Librarian {
    doWork() {
        console.log('Reading to and teaching children...');
    }
}

let kidsLibrarian: Librarian = new ElementarySchoolLibrarian();
kidsLibrarian.doWork();
```

## Classes

___

### What is Classes?

* Template for creating objects
* Provides state storage and behavior
* Encapsulates reusable functionality

### Familiar Concepts of Classes

* Define Types
* Properties and Methods
* Constructors
* Access Modifiers
* Inheritance
* Abstract Classes

### Constructors

Method named `constructor` - maximum of one per class <br>
Use optional parameters to call different ways <br>
Executed by using the "new" keyword

```ts
class ReferenceItem {
    constructor(title: string, pblisher?: string) {
        // perform initialization here
    }
}

let encyclopedia = new ReferenceItem('WorldPedia', 'WorldPub');
```

### Properties and Methods

```ts
class ReferenceItem {
    numberOfPages: number;

    get editor(): string {
        // custom getter logic goes here, should return a value
    }

    set editor(newEditor: string) {
        // custom setter logic goes here
    }

    printCapterTitle(chapterNum: number): void {
        // print title here
    }
}
```

### Parameter Properties

```ts
class Author {
    name: string;

    constructor(authorName: string) {
        name = authorName;
    }
}

// Better syntax with shourcut that elminated the explicit property

class Author {
    constructor(public name: string) {
    }
}
```

### Static Property

```ts
class Library {
    constructor(public name: string) {
    }

    static description: string = 'A source of knowledge and inspiration'
}

let lib = new Library('Tel Aviv Public Library');
let name = lib.name; // available on instances of the 'Library' class
let desc = Library.description; // avaiable on the 'Library' class
```

### Access Modifiers

* public
* private
    * `#` (alternative - it's provide some extra protection (since ES 2021 and later))
* protected

### Inheritance

### Extending Classes with Inheritance

```ts
class ReferenceItem {
    title: string;

    printItem(): void {/** print something here**/
    }
}

class Journal extends ReferenceItem {
    constructor() {
        super();

    }

    contributors: string[];
}
```

### Abstract Classes

* Created with the `abstract` keyword
* Base classes that may not be instantiated
* May contain implementation details
* Abstract methods are not implemented

## Modules

___

### Reasons to Use Modules:

* They are modular
* Maintainable
* Reusable
* Native to Node and ES2015
* Organized simply in files and folders.

### Exporting from a Module

(periodicals.ts)

```ts (periodicals.ts)
/** Option 1 **/

export interface Periodical {
    issueNumber: number;
}

export class Magazine implements Periodical {
    issueNumber: number;
}

export function GetMagazineByIssueNumber(issue: number): Magazine {
    // retrieve and return a magazine
}
```

(periodicals.ts)

```ts 
/** Option 2 **/

interface Periodical {
    issueNumber: number;
}

class Magazine implements Periodical {
    issueNumber: number;
}

function GetMagazineByIssueNumber(issue: number): Magazine {
    // retrieve and return a magazine
}

export {Periodical, Magazine, GetMagazineByIssueNumber as GetMag}
```

### Importing from a Module

`news.ts`

```ts
import {Magazine, GetMag as GetMagazine} from './periodicals';

let newsMag: Magazine = GetMagazine('Weekly News');
```

`tech12.ts`

```ts
import * as mag from './perdiocals';

let techMag: mag.Magazine = mag.GetMag('React Native Stuff!');
```

### Default Exports

`movies.ts`

```ts
export default class {
    title: string;
    director: string;
}
```

`kids.ts`

```ts
import AnimatedMovie from './movie';

let cartoon = new AnimatedMovie();
```

## Generics

___

### What are generics?

* _*Code that works with multiple types*_
* _*Accept "type parameters" for each instance of invocation*_

### What are type parameters?

* _*Specify the type a generic will operate over*_
* _*Listed separate from function parameters inside angle brackets*_
* _*Conventionally represented by the letter 'T' (e.g. `Array<T>`)
* _*Actual type provided at instance creation or function invocation*_

### Using `Array<T>`

Type parameter specifies the type the array can contain <br>
Type parameters are part of the type <br>

```ts
let poetryBooks: Book[];
let fictionBooks: Array<Book>;
let historyBooks = new Array<Book>(5);
```

### Generic Functions

```ts
function LogAndReturn<T>(thing: T): T {
    console.log(thing);
    return thing;
}

let someString: string = LogAndReturn<string>('Log this :)');

let newMag: Magazine = {title: 'Software Developer Monthly'}
let someMag: Magazine = LogAndReturn<Magazine>(newMag);
```

### Generic Interfaces

```ts
interface Inventory<T> {
    getNewestItem: () => T;
    addItem: (newItem: T) => void;
    getAllItems: () => Array<T>;
}

let bookInventory: Inventory<Book>;
// populate the inventory here...
let allBooks: Array<Book> = bookInventory.getAllItems;
```

### Generic Classes

```ts
class Catalog<T> implements Inventory<T> {
    private catalogItems = new Array<T>();

    addItem(newItem: T) {
        this.catalogItems.push(newItem);
    }

    // implement other inteface mehtods here...
}

let bookCatalog = new Catalog<Book>();
```

### Generic Constraints

Describe types that may be passed as a generic parameter <br>
`extends` keyword applies constraint <br>
Only types satisfying the constraints may be used

```ts
interface CatalogItem {
    catalogNumber: number;
}

class Catalog<T extends CatalogItem> implements Inventory<T> {
    // implement interface methods here
}
```

## Compiler Options and Project Configuration

___

### Common Compiler Options

* `--module / --m` (Tell the compiler which module format it should output such _*es2015 / CommonJS*_...);
* `--moduleResolution` (Lets you specify how the TS compiler will attempt to resolve modules Node/Classic);
* `--target / --t` (Lets you specify which version of JS should be output by the compiler);
* `--watch / --w` (Lets you leave the compiler running in watch mode);
* `--outDir` (Lets you specify a directory that should receive all the compiled output files.)
* `--noImplicitAny`   <br>   <br>

`tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "es6",
    "outDir": "js",
    "module": "CommonJS",
    "sourceMap": true
  }
}
```

### Role of tsconfig.json

* Marks the root of TypeScript project
* Specifies TypeScript compiler options

Compiling `app.ts` file and all his dependencies with `"files"` parameter. <br>
`tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "es6",
    "outDir": "js",
    "module": "CommonJS",
    "sourceMap": true
  },
  "files": [
    "app.ts"
  ]
}
```

Compiling all ts files with `ts` extension on current dir and all subs dir with  `"include"` parameter. <br><br>
Plus Excluding all files in `lib` directory using `"exclude"` parameter. <br> <br>
`tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "es6",
    "outDir": "js",
    "module": "CommonJS",
    "sourceMap": true
  },
  "include": [
    "**/*.ts"
  ],
  "exclude": [
    "./lib/*"
  ]
}
```

## Declaration Files

___

### What are type Declaration Files?

* Files with type information for library.
* Contain no implementation details.
* Primarily used as a TypeScript wrapper for JavaScript libraries.
* Design-time tool for type-checking and editor support
* File names end with `.d.ts`

### Installing Declaration Files

* Install with npm `@types/<library name>` <br><br>
  **_NOT A REPLACEMENT FOR INSTALLING THE ACTUAL LIBRARY_**

# TypeScript: Configuring, Compiling and Debugging Projects

___

## Environment Compilation for TypeScript

___

### Multiple TypeScript Versions

Each TypeScript Project on a workstation can be of a different version. <br>
There can also be one globally installed version of TypeScript.

* __Local Version__: Found within a project's directory, only used by that project.
* __Global Version__: Fallback for when there is not a local version.
* __Embedded Version__: Fixed version built into some software ide (i.e., VSCode, WebStorm).
  <br><br>

__Installing TypeScript Globally__: `npm install -g typescript` <br>
__Installing TypeScript Locally__: `npm install --save-dev typescript`<br>

### What is the TypeScript Compiler?

* Turns TypeScript into browser-compatible language
* Browsers understand JavaScript, but not TypeScript
* Results may be different based on compiler version
* Can be executed automatically watching code changes

### What is a tsconfig file?

* Using tsconfig.json allows us to customize TypeScript to suit of our project.
* Defines which TypeScript files should be compiled and the resulting structure.
* Which TypeScript features to use when compiling.
* Varies from project to project...

```json
{
  "extends": "@tsconfig/node12/tsconfig.json",
  // inherited from standard package
  "compilerOption": {
    "module": "commonjs",
    // modifies the format of JavaScript output
    "noImplicitAny": true,
    //prevents developers from using "any" type
    "removeComments": true,
    // removes comments from generated code
    "sourceMap": true
    // created a source map used for debugging
  },
  "include": [
    "src/**/*"
  ]
  // defines which files should be compiled
}
```

__Example TypeScript Configuration__: <br>
tsconfig files take the form of a JSON object. <br>
There are __hundreds__ of options available - above are some of the most common.<br>
[More about tsconfig](https://www.typescriptlang.org/tsconfig)

### What does TypeScript Project consist of?

`package.json` - Tracks versions of TypeScript and ESLint (used to enforce coding style), contains shortcuts for
building and watching TypeScript code. <br>
`index.ts` - Contains code which serves the application, and references to other TypeScript files <br>
`tsconfig.json` - Configures how TypeScript should be compiled, and the source and output file locations

## Configuring the TypeScript Compiler

___
Effectively configuring the compiler allows us to design a build process that suits our app, and not the other way
around. <br>

* __Output Format__: Specify format of generated code(ES3, ES6,ESNext, etc.)
* __Supported Features__: Restrict certain TypeScript features (__e.g.__,_*any*_ __type__)
* __Style Guidelines__: Codify and enforce style (line breaks, tab size, etc.) among large teams

### Watching for Changes to TypeScript Files

* Architecting your application so that builds occur automatically lets your developers focus on completing their tasks.
* Compiler executes automatically when code is edited
* Other tooling (test, etc.) can also be triggered
* Can ignore specific files (e.g, node_modules)

[More info about configuring watch](https://www.typescriptlang.org/docs/handbook/configuring-watch.html)

### Extending Base Configuration

___

#### What Is Base Configurations?

* Collection of compiler options and values
* Available locally or as a package maintained by TypeScript
* Any option can be overwritten

__Extending Default Configuration__<br>
&nbsp;&nbsp;&nbsp;&nbsp; __*The two `tsconfig.json` files below are equivalent*__

```json
{
  "extends": "@tsconfig/node12/tsconfig.json"
}
```

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Node 12",
  "compilerOptions": {
    "lib": [
      "es2019",
      "es2020.promise",
      "es2020.bigint",
      "es2020.string"
    ],
    "module": "commonjs",
    "target": "es2019",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFilesNames": true
  }
}
```

`tsconfig.json` Explained: <br>
___
`"lib"` - Specifies which libraries or polyfills should be included in build. <br>
E.g, including `es2020.promise` will enable build code to work on older browsers with no build in promise spec.
<br><br>
`"module"` - Specifies how to transform code when files refer to each other with require or import.
<br><br>
`"target"` - Specifies output code format.
<br><br>
`"strict"` - Prevents compilation on any minor type errors or style inconsistencies.

#### Common tsconfig Bases

A collection of bases is maintained by the TypeScript project. <br>

* __recommended__: Enforces strict style and targets ES2015.
* __create react app__: Settings needs for `jsx` interoperability.
* __node__: Outputs modern server JavaScript `require`,`async`,etc.

### Multi-files vs Single-file Compilation

___
_*Multi-file Complication*_:

* Creates one JavaScript file for every target TypeScript file
* Each file must be loaded for the application to work in a browser
* File must be concatenated or use require to work in Node.js
* Possible to update just one generated file in production
* Standard compilation option for TypeScript

_*Single-file Compilation*_:

* Combines all TypeScript files into one single JavaScript file
* Only a single file must be loaded for the application to work in a browser
* Single file will work when invoked as a Node script
* Updated production code must be pushed in its entirety
* Additional tooling (Webpack, Babel) needed

### Single-file Compilation for Majority of Tasks

* Compiling a TypeScript application to a single file generally makes it easier to deploy as both a web and server-side
  application.
* Greater support for isomorphic applications
* Fewer HTTP requests, simpler deployment to web applications
* Greater consistency across browser / Node versions

## Maximizing Collaboration with Project References and Type Declaration Files

___

### Project References

___

#### What Are Project References?

Project references break large TypeScript applications into smaller blocks that can be built, imported and modified
separately.

* Separate application into logical silos.
* Customize build steps for each sub-project.
* Avoid building unnecessary files.

__*Configuring Project References*__
`tsconfig.json`

```json
{
  "references": [
    {
      "path": "../performance"
    }
    // directory contains tsconfig.json file
  ]
}
```

#### Understanding Project References:

* Projects referenced this way must have composite enabled.
* Projects will be rebuilt as infrequently as possible.
* Build flag will cause compiler to rebuild all projects
* Circular dependencies must be avoided

#### Type Declaration Files

___

#### What are Type Declaration Files?

_*Type Declaration files let us add typings to values exported from normal JavaScript files.*_

* __Code Hints__: Autocompletion and pre-compile warnings
* __Type Checking__: More sophisticated type checking during compile
* __External and Internal__: Use community declarations or author for your own project

#### When to Use Type Declaration Files

* With any major JS library or framework, use a declaration file downloaded from a community repository (i.e.
  _*Definitely Typed*_)
* With a locally authored JavaScript tool, create a declaration file and include it with that tool

#### Understanding Definitely Typed

The open-source community has gathered definitions for hundreds of legacy JavaScript libraries.<br>

* Authoring original d.ts files for npm libraries not usually necessary.
* Works for most libraries found in legacy projects - jQuery, underscore, etc.
* Modern releases of libraries such as jQuery already include declaration files.

#### Type Declaration are extremely useful for application development

* Add time-saving code hints for developers
* Prevent builds which would result in a type error
* Developers can focus on task at hand
* Author your own, or use Definitely Typed

### Debugging Advantages of TypeScript

___
One of TypeScript's main advantages of JS is easier debugging in many cases. <br>

* Type errors stopped at compile time
* Additional tooltips, code hints prevent errors
* Common pitfalls (such as switch statements lacking a break), are disabled

#### Which Errors Cannot Be Prevented by TypeScript?

* Incorrectly written function and miscalculations
* Errors arising from corner cases and user input
* Unanticipated values from third party APIs

#### Source Maps

* Couples generated code with source code
* Browser will show source file, not generated file, while debugging
* Can be embedded entirely within generated file

__*Enabling Sources Maps*__

```json
{
  "compilerOptions": {
    "sourceMap": true
  }
}
```

### Standardizing TypeScript Styling with ESLint

___

#### What is __ESLint__?

* Tool for evaluating application _*source code*_
* Capable of analyzing code style - bracket spacing, line breaks, tabs and spaces, etc.
* Works with continuous integration - pull requests with incorrectly styled code can be rejected automatically

#### What Should Use __ESLing__?

* Large teams
* Large Projects
* Projects with indefinite scope
* When more unified style is needed

#### What Kind of TypeScript Style Can ESLint Enforce?

* Styling and spacing TypeScript specific code (e.g, type annotations)
* Disallowed keywords(with,do)
* Preferred code conventions (e.g., requiring classes to always define a constructor)
* Invisible style choices (tabs vs spacing, empty new line at EOF)












