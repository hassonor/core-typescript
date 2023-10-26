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