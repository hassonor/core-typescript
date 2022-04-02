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


