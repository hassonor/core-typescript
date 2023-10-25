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

#### Partial, Readonly, Record and Pick
```typescript
/**
 * Make all properties in T optional
 */

type Partial<T> = {
    [P in keyof T]?: T[P];
}
```
Here, we can see the type definition for a type named `Partial`,
which will transform each property in the type named `T` into an optional property.
<br><br>
Similarly, we can use the `Readonly` mapped type to mark each property as `readonly` as follows:
```typescript
/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
}

interface IAbRequired {
    a: number;
    b: string;
}


let readOnlyVar: Readonly<IAbRequired> = {
    a: 1, 
    b: "test"
}
readonlyVar.a = 2
```
The last line of the code snippet,
which is attempting to assign the value of 2 to the property, will generate the following error:
```shell
error TS2540: Cannot assign to 'a' bnecause it is a read-only property.
```
<br><br>
Outside the standard mapped types of `Partial` and `Readonly`,
there are two other interesting mapped types, named `Pick` and `Record`.
The `Pick` mapped type is used to construct a type based on a subset of properties of another type, as follows:
```typescript
interface IAbc {
    a: number;
    b: string;
    c: boolean;
}

type PickAb = Pick<IAb, "a" | "b">;

let pickAbObject: PickAb = {
    a: 1, 
    b: "test"
}
```
The final mapped type that we will explore is the `Record` mapped type, which is used to construct a type on the fly.
It is almost the opposite of the Pick mapped type,
and used a provided list of properties as a string literal to define what properties the type must have. 
```typescript
type RecordedCd = Record<"c" | "d", number>;

let recordedCdVar: RecordedCd = {
    c: 1,
    d: 1
};
```
#### Conditional types
```typescript
type NumberOrString<T> = T extends number ? number : string;

function logNumberOrString<T>(input: NumberOrString<T>){
    console.log(`logNumberOrString : ${input}`);
}

logNumberOrString<number>(1);
logNumberOrString<string>("test");
```

#### Conditional type chaining
In a similar way to how conditional statements can be chained together,
conditional types can also be chained together to form a logic free that will return a specific type. 
```typescript
interface IA {
    a: number;
}

interface IAb {
    a: number;
    b: string;
}

interface IAbc {
    a: number;
    b: string;
    c: boolean;
}

type abc_ab_a<T> = 
    T extends IAbc ? [number,string,boolean] :
    T extends IAb ? [number, string] :
    T extends IA ? [number] :
    never;

function getTupleStringAbc<T>(tupleValue: abc_ab_a<T>): string
{
    let [...tupleDestructured] = tupleValue;
    let returnString = "|";
    for (let value of tupleDestructured){
        returnString += `${value}|`;
    }
    
    return returnString;
}

let keyA = getTupleStringAbc([1]);
console.log(`keyA = ${keyA}`); // keyA = |1|

let keyAb = getTupleStringAbc([1,"OrHasson"]);
console.log(`keyAb = ${keyAb}`); // keyAb = |1|OrHasson|

let keyAbc = getTupleStringAbc([1,"OrHasson",true]);
console.log(`keyAbc = ${keyAbc}`); // keyAbc = |1|OrHasson|true|
```

#### Distributed conditional types
When defining conditional types,
instead of returning only a single type as part of our conditional statements,
we can also return a number of types, or distributed conditional types.
```typescript
type dateOrNumberOrString<T> = 
    T extends Date ? Date :
    T extends number ? Date | number :
    T extends string ? Date | number | string : 
    nerver;

function compareValues<T extends string | number | Date | boolean>(
    input: T,
    compareTo: dateOrNumberOrString<T>
){
    // do comparision
}

compareValues(new Date(), new Date());
compareValues(1, new Date());
compareValues(1,2);
compareValues("test", new Date());
```
* If the `input` parameter is of type `Date`, then the `compareTo` parameter may only be of type `Date`.
* If the `input` parameter is of type `number`, then the `compareTo` parameter may be either a `Date` or a`number`.
* If the `input` parameter is of type `string`, then the `compareTo` parameter may be either a `Date` or `number`, or a `string`.
* If the `input` parameter is not of type `Date`, `number` or `string`, then do not allow this function to be called.

#### Conditional type inference
There is a further, and more esoteric version of the conditional type syntax,
where we are able to infer a new type as part of a conditional type statement.
```typescript

type inferFromPropertyType<T> = 
    T extends { id: infer U } ? U : never;

function testInferFromPropertyType<T>(arg: inferFromPropertyType<T>){ }

testInferFromPropertyType<{id: string}>("test");
testInferFromPropertyType<{id: number}>(1);
```
Remember that a conditional type is a computed type based on the original type that is given as an input.
This means that in order to use a conditional type, we need to supply an input type,
and the conditional type will be computed for us, based on the input type.

#### Type inference from function signatures
We can also infer types based on function signatures.
These inferred types can be inferred from either the function arguments, or from the function return type.
```typescript
type inferredFromFnParam<T> = 
    T extends (a: infer U) => void ? U : never;

function testInferredFromFnParam<T>(
    arg: inferredFromFnParam<T>
) { }

testInferredFromFnParam<(a: number) => void>(1);
testInferredFromFnParam<(a: string) => void>("OrHasson");
```

In a similar manner, we can also infer a type from the return type of function:
```typescript
type inferredFromFnReturnType<T> =
    T extends (a: string) => infer U ? U : never;

function testInferredFromReturnType<T>(
    arg: inferredFromFnReturnType<T>
){ }

testInferredFromReturnType<(a: string) => number>(1)
testInferredFromReturnType<(a: string) => boolean>(true)


```






