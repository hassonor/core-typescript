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