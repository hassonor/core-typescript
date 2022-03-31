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

### The Role of Inheritance