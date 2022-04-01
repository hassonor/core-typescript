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