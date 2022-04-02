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