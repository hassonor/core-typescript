#### Unknown
___
The `unknown` type can be seen as a type-safe alternative to the type `any`.
A variable marked as `unknown` can hold any type of value, similar to a variable of type `any`.
The difference between the two, however,
is that a variable of type `unknown` cannot be assigned to a known type without explicit casting.
```typescript
let u: unknown = "an unknown";
u = 1;
let aNumber2: number;
aNumber2  = <number>u;
```
Using the `unknown` type forces us to make conscious decision when using these values.
In essence,
we are letting the compiler know that we know what type this value should be when we actually want to use it.
This is why it is seen as a type-safe version of `any`,
as we need to use explicit casting to convert an `unknown` type into a known type before using it.

#### Never
___
This type is used to indicate instances where something should never occur.
```typescript
function alwaysThrow(): never {
    throw new Error("this will always throw.");
    return -1;
}
```
With `never` return type for the function, the compiler will now generate the following error:<br>
`error TS2322: Type '-1' is not assignable to type 'never'`.<br><br>
This error message is clearly telling us that the function,
which returns a type of never, is attempting to return the value of `-1`.
The compiler, therefore, has identified a flaw in our logic.<br>

#### A more advanced use case of never:
```typescript
function getEnumValue(enumValue: AnEnum): String{
    switch(enumValue){
        case AnEnum.FIRST: return "First Case";
        case AnEnum.SECOND: return "Second Case";
    }
    let returnValue: never = enumValue;
    return returnValue;
}
```
Using the `never` type here safeguards our code so that we can pick up these errors earlier.

#### Rest parameters
___
In order to express the equivalent function definition in TS, we will need to use, 'rest syntax` as follows':

```typescript
function testArguments(...args: (string[] | number[])[]) {
    for (let i in args){
        console.log(`args[${i}] = ${args[i]}`)
    }
}

testArguments("1");
testArguments(10,20);
```

#### Function signature parameters
___
TypeScript uses its strong typing rules
to ensure that if we define that if we define a function that needs a callback function,
we can ensure that this function is provided correctly.
In introduces the fat arrow syntax, or `()=>`, to indicate a function signature.
```typescript
function myCallback(text: string): void {
    console.log(`myCallback called with ${text}`)
}

function withCallbackArg(
    message: string, callbackFn: (text:string)=> void
){
    console.log(`withCallback called, message : ${message}`);
    callbackFn(`${message} from withCallback`)''
}
```
Here, we have defined a strongly typed function named `myCallback` that has a single parameter names `text`,
which is of type string, and returns void.
We have defined a strongly typed function named `withCallbackArg` that also has two parameters.
The first parameter is names `message` and is of type string,
and the second parameter, names `callbackFn`, is using the fat arrow syntax, as follows: `callbackFn:
(text:string)=> void`.<br>
This syntax defines the `callbackFn` parameter as being a function that accepts a single parameter of type string,
and returns void.<br>
We can then use this `withCallbackArg` function as follows:
```typescript
withCallbackArg("initial text", myCallback);
withCallbackArg("text", "this is not a function");
```
Here, we have invoked the `withCallbackArg` function twice: one legitimately,
by providing a string and a function as arguments, and once in error, by providing two strings as arguments.
This code will produce the following error:
```shell
error TS2345: Argument of type '"this is not a function"' is not assignable to parameter of type '(text: string)=> void'
```
The compiler won't allow us
to invoke the `withCallbackArg` function
if we do not provide the second argument as a function with a signature that matches our function definition.

#### Literals
___
TypeScript also allows up to use that are known as `literals`, which are almost a hybrid of enums and type aliases.
A literal will limit the allowed values to a set of values specified.
A literal can be made of string, number, or boolean values.
```typescript
type AllowedStringValue = "one" | "two" | "three";
type AllowedNumericValues = 1 | 20 | 65535;

function withLiteral(input: AllowdStringValues | AllowdNumericValues){
    console.log(`called with: ${input}`);
}

withLiteral("one"); // "called with one"
withLiteral("two"); // "called with two"
withLiteral("three"); // "called with three"
withLiteral(65535); // "called with 65535"

withLiteral("four");
withLiteral(2);
```
We will get the following errors:
```shell
error TS2345: Argument of type '"four"' is not assignable to paramter of type '1 | 20 | "one" | "two" | "three" | 65535'.
error TS2345: Argument of type '2' is not assignable to paramter of type '1 | 20 | "one" | "two" | "three" | 65535'.
```
Literals provide us with another tool that we can use when we need to define a function that accepts a standard string,
number, or boolean, but where we need to limit the values provided to a defined set of values.