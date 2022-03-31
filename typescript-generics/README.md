## TypeScript Generics

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

