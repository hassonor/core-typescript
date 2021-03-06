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

__:-)__






