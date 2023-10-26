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