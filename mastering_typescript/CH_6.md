### Decorators

___

#### Decorator syntax

```typescript
function simpleDecorator(constructor: Function) {
    console.log(`simpleDecorator called`);
}

@simpleDecorator
class ClassWithSimpleDecorator {

}

let instance_1 = new ClassWithSimpleDecorator();
let instance_2 = new ClassWithSimpleDecorator();

console.log(`instance_1 : ${JSON.stringify(instance_1)}`)
console.log(`instance_2 : ${JSON.stringify(instance_2)}`)
```

The output of this code is as follows:

```cmd
simpleDecorator called
instance_1 : {}
instance_2 : {}
```

We can see that the `simpleDecorator` function has only been called once,
even though we have created two instances of the `ClassWithSimpleDecorator` class.
Decorators are only invoked once when a class is defined.

#### Multiple decorators

```typescript
function simpleDecorator(constructor: Function) {
    console.log(`simpleDecorator called`);
}

function secondDecorator(constructor: Function) {
    console.log(`secondDecorator called`);
}

@simpleDecorator
@secondDecorator
class ClassWithSimpleDecorator {

}
```

Here, we have applied both decorators to a class named `ClassWithSimpleDecorator`. The output of this code is as
follows:

```text
secondDecorator called
simpleDecorator called
```

Decorators are called in the reverse order of their appearance withing our code.

#### Types of decorators

* `Class decorators`: These are decorators that can be applied to a class definition
* `Property decorators`: These are decorators that can be applied to a property within class
* `Method decorators`: These are decorators that can be applied to a method on a class
* `Paramter decorators`: These are decorators that can be applied to a parameter of a method withing a class

As an example of these types of decorators, consider the following code:

```typescript
function classDecorator(constructor: Function) {
}

function propertyDecorator(
    target: any,
    propertyKey: string) {
}

function methodDecorator(
    target: any,
    methodName: string,
    paramterIndex: number) {
}
```

We would use each of these decorators as follows:

```typescript
@classDecorator
class ClassWithAllTypesOfDecrators {
    @peropertyDecorator
    id: number = 1;

    @methodDecorator
    print() {
    }

    setId(@paramterDecorator id: number) {
    }
}
```

#### Decorator factories

A decorator factory function is created by wrapping the decorator function itself within a function, as follows:

```typescript
function decoratorFactory(name: string) {
    return (constructor: Function) => {
        console.log(`decorator function called with : ${name}`)
    }
}

@decoratorFactory("OrTest")
class ClassWithDecoratorFactory {

}
```

The output of this code is as follows:

```text
decorator function called with : OrTest
```

### Exploring decorators

___

#### Class decorators

```typescript
function classConstructorDec(constructor: Function) {
    console.log(`constructor : ${constructor}`);
}

@classConstructorDec
class ClassWithConstructor {
    constructor(id: number) {
    }
}
```

Here, we have a decorator function named `classConstructorDec`,
which is logging the value of the `constructor` argument to the console.
We have then applied this decorator to a class named `ClassWithConstructor`.
This `ClassWithConstructor` class has a single `constructor` function that accepts a single parameter named `id`,
of type number.
The output of this code is as follows:

```cmd
constructor : function ClassWithConstructor(id){ }
```

We can see that the decorator was invoked with a single argument,
which is the definition of the constructor function itself.
Note that this definition is the JavaScript definition, and not the TypeScript definition,
as there is no type for the `id` parameter.
What this is showing us is that a class decorator will be called with the definition of the class constructor itself.

Let's update our `classConstructorDec` decorator and use it to modify the class definition itself, as follows:

```typescript
function classConstructorDec(constructor: Function) {
    console.log(`constructor : ${constructor}`);
    constructor.prototype.testProperty = "testProperty_value"
}

@classConstructorDec
class ClassWithConstructor {
    constructor(id: number) {
    }
}

let classInstance = new ClassWithConstructor(1);
console.log(`classInstance.testProperty = ${(<any>classInstance).testProperty}`)
```

Here, we are creating an instance of the `ClassWithConstructor` class, named `classInstance`.
We are then logging the value of the `testProperty` property of this class instance to the console.
Note that we need to cast the `classInstance` variable to a type of any in order to access this property,
as it does not appear on the initial class definition.
The output of this code is as follows:

```text
classInstance.testProperty = testProperty_value
```
