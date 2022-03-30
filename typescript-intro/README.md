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


