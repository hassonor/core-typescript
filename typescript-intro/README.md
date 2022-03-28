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

```
let someValue: number | string;
someValue = 42;
someValue = 'Hello Or Hasson';
```

#### Using the `--strictNullChecks` Compiler Option

```
let basicString: string;
basicString = null; (ERROR)
basicString = undefined; (ERROR)

let nullableString: string | null;
nullableString = null; (OK)
nullableString = undefined; (ERROR)

let mysteryString: sring | null | undefined;
mysteryString = null; (OK)
mysteryString = undefined; (OK)
```

#### Type Assertions

```
let value: any = 5;
let fixedString: string = (<number>value).toFixed(4);
console.log(fixedString); // 5.0000

// another syntax for Type Assetion
let fixedString: string = (value as number).toFixed(4);
console.log(fixedString); // 5.0000
```

#### Adding Type Annotations to Functions

```
// JavaScript
funtion dullFunc(value1, value2){
    return "I love the way you love the way you love.";
}

// TypeScript
function funFunc(score: number, message?:string): string{
    return "I love the way you love the way you love.";
}
```

#### Using the `--noImplicitAny` Compiler Option

```
function dullFun(value1, value2){
     return "I love the way you love the way you love."; 
}
ERROR TS7006: Parameter 'value1' implicityly has an 'any' type. 
ERROR TS7006: Parameter 'value2' implicityly has an 'any' type. 
```

#### Default-Initialized Parameters

```
function sendGreeting(greeting: stirng = 'Good morning!'):void {
    console.log(greeting);
}

sendingGreeting(); // Good morning!
sendGreeting('Good afternoon, Or Hasson!'); // Good afternoon, Or Hasson!
```

