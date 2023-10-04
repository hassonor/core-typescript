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
THis is why it is seen as a type-safe version of `any`,
as we need to use explicit casting to convert an `unknown` type into a known type before using it.