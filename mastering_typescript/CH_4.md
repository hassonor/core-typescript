### Generics
___
#### Generics Syntax
```typescript
function printGeneric<T>(value: T){
    console.log(`typeof T is : ${typeof value}`);
    console.log(`value is : ${value}`)
}

printGeneric(1); // typeof T is : number /n value is : 1
printGeneric("test"); // typeof T is : string /n value is : test
printGeneric(true); // typeof T is : boolean /n value is : true
printGeneric(() => {}); // typeof T is : function /n value is : function(){ }
printGeneric({id: 1}); // typeof T is : object /n value is : [object object]
```
#### Multiple generic types
We cn also specify more than one type to be used in a generic function, as follows:
```typescript
function usingTwoTypes<A, B>(first: A, second: B){
}
```
Here we have a function named usingTwoTypes
that has a type name for both the first and second parameters in this function, that is, `A` and `B`.
This function can specify any type for either `A` or `B`, as follows:
```typescript
usingTwoTypes<number, string> (1, "test");
usingTwoTypes(1, "test");
usingTwoTypes<boolean, boolean>(true, false);
usingTwoTypes("first","second");
```
#### Constraining the type of T
In most instances,
we will want
to limit the type of `T` in order to only allow a specific set of types to be used within our generic code.
This is best explained through an example, as follows:
```typescript
class Concatenator<T extends Array<string> | Array<number>>{
    public concatenateArray(items: T): string{
        let returnString = "";
        for(let i = 0; i < items.length; i++){
            returnString += i > 0 ? "," : "";
            returnString += items[i].toString();
        }
        return returnString;
    }
}

let concator = new Concatenator();
let concatResult = concator.concatenateArray(["first","second","third"]);
console.log(`concatResult = ${concatResult}`); // concatResult = first,second,third

concatResult = concator.concatenateArray([100,200,300]);
console.log(`concatResult = ${concatResult}`); // concatResult = 100,200,300
```

#### Using the type T
Another limit of generic code is
that it can only reference functions or properties of objects that are common to any type of `T`.
As an example of the limitation, consider the following code:
```typescript
interface IPrintId{
    id: number;
    print(): void;
}

interface IPrintName{
    name: string;
    print(): void;
}

function useT<T extends IPrintId | IPrintName>(item: T) : void {
    item.print();
    item.id = 1; // error: id is not common to both interfaces
    item.name = "test" // error: name is not commont to both interfaces
}
```
The code will generate the following errors:
```shell
error TS2339: Property 'id' does not exist on type 'T'
error TS2339: Property 'name' does not exist on type 'T'
```
This error clearly indicates that the `id` and `name` property does not exist on the type `T`. <Br>
In other words, we are only able to call properties or functions on type `T` where they are common to all types of `T`.
As the `id` property is unique to the `IPrintId` interface,
and the `name` property is unique to `IPrintName` interface,
we are not allowed to reference these properties when we reference `T`.
The only property that these two interfaces have in common is the `print` function,
and therefore only the `print` function can be used in this case.<br><br>
TypeScript will ensure that we are only able to reference properties and functions on a type of `T`,
where these properties and function are common across all types that are allowed for `T`.

#### Generic constraints
```typescript
function printProperty<T, K extends keyof T>(object: T, key: K){
    let propertyValue = object[key];
    console.log(`object[${key}] = ${propertyValue}`)
}

let obj1 = {
    id: 1, 
    name: "Or Hasson",
    print() { console.log(`${this.id}`)}
}

printProperty(obj1, "id"); // object[id] = 1
printProperty(obj1, "name"); // object[name] = Or Hasson
printProperty(obj1, "print"); // object[print] = function() {console.log("" + this.id);}

printProperty(obj1, "surname");
```
The last line of this code snippet will produce the following error:
```shell
error TS2345: Argument of type '"surname"' is not assignable to paramteter of type '"id"' | "name" | "print"'
```
#### Generic interfaces
In the same manner that functions and classes can use generics,
we are also able to create interfaces that use generic syntax.
```typescript
interface IPrint{
    print(): void
}

interface ILogInterface<T extends IPrint>{
    logToConsole(iPrintObj: T): void;
}

class LogClass<T extends IPrint> implements ILogInterface<T>{
    logToConsole(iPrintObj: T): void {
        iPrintObj.print()
    }
}
```
We have defined an interface named `IPrint` that has a single function names `print` that returns `void`.
We then define an interface named `ILogInterface`
that is using generic syntax to define a type `T` that extends the `IPrint` interface.
This interface has a single function named `logToConsole`, which has a single parameter named `iPrintObj`, of type `T`.
We then have a class definition for a class named `LogClass`,
which is also using generic syntax to define a type `T` that extends from the `IPrint` interface.
This class implements the `ILogInterface` interface, and as such must define a `logToConsole` function.
```typescript
let printObject: IPrint = {
    print(){ console.log(`printObject.print() called`)}
}

let logClass = new LogClass();
logClass.logToConsole(printObject); // printObject.print() called
```
Here, we have an object named `printObject` that implements the `IPrint` interface as it has a `print` function.
We then create an instance of the `LogClass` class,
and call the `logToConsole` function with the `printObject` variable as the only argument.<br>
It will print: `printObject.print() called`.
<br>
We can see
that the `logToConsole` function of the `LogClass` instance is the `print` function of the `printObject` variable.

#### Creating new objects within generics
Generic classes may need to create an object of the type that was passed in as the generic type `T`. 
```typescript
class ClassA { }
class ClassB { } 

function createClassInstance<T>(arg1: {new(): T}): T{
    return new arg1()
}

let classAInstance = createClassInstance(ClassA);
```
We have defined two classes, named `ClassA` and `ClassB`.
We then define a function named `createClassInstance` that is using generic syntax to define the type `T`.
This function has a single parameter named `arg1` of type `{new():T}`.
the `arg1` parameter are constructing an anonymous type that defines a `new` function, and returns the type T, that is `arg1: {new(): T}`.
In other words, the `arg1` parameter is a type that overloads the `new` function, and return an instance of `T`.
<br><br>
The last line of this code snippet show how we intend to use the `createClassInstance` function.
We are calling this function with the class definition of `ClassA` as the only argument.
The anonymous type

### Advanced type inference
___
#### Mapped Types
```typescript
interface IAbRequired {
    a: number;
    b: string;
}

let ab: IAbRequired = {
    a: 1,
    b: "test"
}

type WeakInterface<T> = {
    [K in keyof T]?: T[K];
}

let allOptional: WeakInterface<IAbRequired> = {}
```
Here, we have defined an interface named `IAbRequired` that has two properties,
named a type number, and b of type string.
We then create an instance of an object named `ab`,
which is of type `IAbRequired`, and as such, must define both an `a` and `b` property,
as both properties are required.<br><br>
We then create a type alias name `WeakInterface`,
which uses generic syntax to allow it to be used with any type named `T`.
This type alias also specifies a second type, `K`, that is using the `keyof` keyword on the type `T`.
The effect of the `keyof` keyword is
that the `WeakInterface` type will contain a property for each property that the type `T` defines.
Note, However, that the definition of the properties,
that is `[K in keyof T]?`, is also using the optional property operator `?`,
and the type of each property has been defined as `T[K]`.
In other words, return the type of the original property of type `T`, named `K`, but make it optional.<br><br>
What this means is that we are defining a type named `WeakInterface`,
which accepts a type named `T`, and we are transforming each property that is defined for `T` into an optional property.
<br><br>
The last line of this code snippet defines a variable named `allOptional`,
which is of the type `WeakInterface<IAbRequired>`.
This, therefore, makes all the properties that were named on the `IAbRequried` interface optional,
and our object can be constructed with no properties.