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

#### Property decorators

Property decorators have two parameters, which are the class prototype itself and the property name.
Let's take a look at these parameters, as follows:

```typescript
function propertyDec(target: any, propertyName: string) {
    console.log(`target : ${target}`);
    console.log(`target.constructor : ${target.constructor}`);
    console.log(`propertyName : ${propertyName}`);
}

class ClassWithPropertyDec {
    @propertyDec
    nameProperty: string | undefined;
}
```

Here, we have defined a class named `ClassWithPropertyDec`,
which is decorating a single property named `nameProperty` with our `propertyDec` decorator.
The output of this code is as follows:

```txt
target: [object Object]
target.constructor : function classWithPropertyDec(){ }
propertyName : nameProperty
```

We can see that the `target` argument that was passed to our decorator is an object,
as we would expect, because it is, in fact, a class definition.
We can also see from the second line of the console output that this object has a `constructor` function,
and we are able to print its definition to the console.
We also have the name of the property that we decorated passed in as the `propertyName` argument.

#### Static property decorators

```typescript
function propertyDec(target: any, propertyName: string) {
    console.log(`target : ${target}`);
    console.log(`target.constructor : ${target.constructor}`);
    console.log(`propertyName : ${propertyName}`);
}

class StaticClassWithPropertyDec {
    @propertyDec
    static staticProperty: string;
}
```

We have applied the `propertyDec` decorator to a `property` named `staticProperty` on a class
named `StaticClassWithPropertyDec`.
The outputs of the various console logs withing our decorator are as follows:

```txt
target : function StaticClassWithPropertyDec(){
}
target.constructor : function Function() { [native code] } 
propertyName: staticProperty
```

We can see that the `target` argument is not a function,
where it was an `object`, or, more accurately, a class `prototype` object previously.
The `constuctor` property of this function is now a function,
and the `propertyKey` argument contains the name of our property.
<br><br>
Let's now update our `propertyDec` property decorator to correctly identify the class name in both of these cases,
as follows:

```typescript
function propertyDec(target: any, propertyName: string) {
    if (typeof (target) === 'function') {
        console.log(`class name : ${target.name}`)
    } else {
        console.log(`class name : + ${target.constructor.name}`)
    }
    console.log(`propertyName : ${propertyName}`)
}

class ClassWithPropertyDec {
    @propertyDec
    nameProperty: string | undefined;
}

class StaticClassWithPropertyDec {
    @propertyDec
    static staticProperty: string;
}
```

Now, the output of this updated code is as follows:

```text
class name : ClassWithPropertyDec
propertyName : nameProperty
class name : StaticClassWithPropertyDec
propertyName: staticProperty
```