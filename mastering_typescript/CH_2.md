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
