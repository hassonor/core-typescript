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

#### Method decorators

```typescript
function methodDec(
    target: any,
    methodName: string,
    descriptor?: PropertyDescriptor
) {
    console.log(`target : ${target}`);
    console.log(`methodName : ${methodName}`);
    console.log(`descriptor : ${JSON.stringify(descriptor)}`);
    console.log(`target[methodName] : ${target[methodName]}`);
}
```

Let's apply this decorator to a class as follows:

```typescript
class ClassWithMethodDec {
    @methoDec
    print(output: string) {
        console.log(`ClassWithMethodDec.print` + `(${output}) called.`)
    }
}
```

The output of this code is as follows:

```text
target: [object Object]
methodName: print
descriptor: {"writable": true, "enumerable": true, "configurable": true}
target[methodName] : function (output) {
    console.log("ClassWithMethodDec.print" + ("(" + output + ") called. ")
}
```

#### Using method decorators

When a method decorator is called by the JavaScript runtime,
it includes the `target` object that the method is available on, and it also includes the name of the method.
We can then use this information to modify the original function.
Let's
tak ea look at an example that will create an audit trail of some sort
and log a message to the console every time a function is called.

```typescript
function auditLogDec(target: any, methodName: string, descriptor?: PropertyDescriptor) {
    let originalFunction = target[methodName];

    let auditFunction = function (this: any) {
        console.log(`1. auditLog : overide of ${methodName} called`)
        for (let i = 0; i < arguments.length; i++) {
            console.log(`2. arg : ${i} = ${arguments[i]}`);
        }
        originalFunction.apply(this, arguments);
    }

    target[methodName] = auditFunction;
    return target;
}
```

Here, we have a method decorator named `auditLogDec`,
with the three parameters needed for a method decorator named `target`, `methodName`, and `descriptior`.
Within this function, we create a variable named `originalFunction`,
and set its value to the function of the decorated class, that is, `target[methodName]`.
We then create a new function named `auditFunction` that does three things.
Firstly, it logs a message to the console.
Secondly,
it loops through all the arguments that were provided to it and then logs a message to the console with their values.
Thirdly, it calls the `apply` function on the `originalFunction` variable,
passing in a `this` argument, and the `arguments` argument that it was invoked with.
<br><br>
After defining `auditFunction` and, within it,
invoking the `originalFunction` of our decorated class,
we set the value of the original class function to the new function,
on the line `target[methodname] = auditFunction`, and return the updated class definition named `target`.<br><br>
In essence, we have made a copy of the original class function that we decorated, wrapped the call to this function with
our own function.
In so doing, we have modified the decorated method on the class definition itself, all withing a decorator.<br><br>
To show this technique in action, let's create a class definition as follows:

```typescript
function auditLogDec(target: any, methodName: string, descriptor?: PropertyDescriptor) {
    let originalFunction = target[methodName];

    let auditFunction = function (this: any) {
        console.log(`1. auditLog : overide of ${methodName} called`)
        for (let i = 0; i < arguments.length; i++) {
            console.log(`2. arg : ${i} = ${arguments[i]}`);
        }
        originalFunction.apply(this, arguments);
    }

    target[methodName] = auditFunction;
    return target;
}

class ClassWithAuditDec {
    @auditLogDec
    print(arg1: string, arg2: string) {
        console.log(`3. ClassWithMethodDec.print` + `(${arg1}, ${arg2}) called.`)
    }
}

let auditClass = new ClassWithAuditDec();
auditClass.print("test1", "test2");
```

The output of this code is as follows:

```text
1. auditLogDec : override of print called
2. arg : 0 = test1
2. arg : 1 = test2
3. ClassWithMethodDec.print(test1, test2) called.
```

Here,
we can clearly see the effects of our decorator function
being applied to the `print` method of the `ClassWithAuditDec` class.
Our decorator function has intercepted the call to the `print` function,
logged a few messages to the console, and then invoked the original function itself.<br><br>
Using method decorators provides us with a powerful technique of injecting extra functionality into a class method.

#### Parameter decorators

Parameter decorators can be used to decorate a specific parameter within a method of a class.
As an example, consider the following decorator:

```typescript
function parameterDec(target: any, methodName: string, parameterIndex: number) {
    console.log(`target: ${target}`);
    console.log(`methodName : ${methodName}`);
    console.log(`parameterIndex : ${parameterIndex}`);
}

class ClassWithParamDec {
    print(@parameterDec value: string) {

    }
}
```

The output of this code is as follows:

```text
target: [object Object]
methodName: print
parameterIndex: 0
```

#### Decorator metadata

Change `exitDecoratorMetadata` on `tsconfig.json` to `true`:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

Let's now take a closer look at the effect that this compile option has on our generated JavaScript.
Consider the following, parameter decorator:

```typescript
function metaddataParameterDec(
    target: any,
    methodName: string,
    parameterIndex: number
) {
}

class ClassWithMetadata {
    print(
        @metadataParameterDec id: number, name: string
    ) {
    }
}
```

When the `emitDecoratorMetadata` option in our `tsconfig.json` file is set to `true`,
the generated JavaScript will contain more information, as follows:

```javascript
function metadataParamterDec(target, methodName, parameterIndex) {
}

var classWithMetadata = /** @class */ (function () {
    function ClassWithMetadata() {
    }

    ClassWithMetadata.prototype.print = function (id, name) {
    };
    _decorate([
        _param(0, metadataParamterDec),
        _metadata("design:type", Function),
        _metadata("design:paramters", [Number, String]),
        _metadata("design:returntype", void 0)
    ], ClassWithMetadata.prototype, "print", null);
    return ClassWithMetadata;
}());
```

The `design:type` key is used to specify that the `print` method is,
in face, a function The `design:paramtypes` key is used to specify the types of each method parameter,
which in this case is `Number` and `String`,
and the `design:returntype` key indicates what the return type of this function is, which in this case is `void`.

#### Using decorator metadata

In order to put this extra information that is provided to a decorator to use, we will need to
install `npm install reflect-metadata`.

We can now start to use this metadata by calling the `Reflect.getMetadata` function that this library provides,
as follows:

```typescript
import 'reflect-metadata';

function reflectParameterDec(target: any, methodName: string, parameterIndex: number) {
    let designType = Reflect.getMetadata(
        "design:type", target, methodName)
    console.log(`design type: ${designType.name}`)

    let designParamTypes = Reflect.getMetadata(
        "design:paramtypes", target, methodName);

    for (let paramType of designParamTypes) {
        console.log(`param type : ${paramType.name}`);
    }

    let designReturnType = Reflect.getMetadata(
        "design:returntype", target, methodName
    );
    console.log(`return types : ${designReturnType.name}`);
}

class ClassWithReflectMetaData {
    print(
        @reflectParameterDec
            id: number,
        name: string
    ): number {
        return 777;
    }
}
```

The output of this code is as follows:

```text
design type : Function
param type : Number
param type : String
return types : Number
```

The information
that is recorded by the TypeScript compiler when using the `emitDecoratorMetadata` compiler flag can be read
and interpreted at runtime.
Remember that type information which is used by our code,
and the TypeScript compiler, is compiled away in the resulting JavaScript.
Using decorator metadata allows us to retain some of this type information
and opens the door to using this type of information to generate code analysis tools, for example,
or to write frameworks for dependency injection.