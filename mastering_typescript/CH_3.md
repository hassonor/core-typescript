### Interfaces
___
```typescript
interface IIdName {
    id: number,
    name: string
}

let idObject: IIdName = {
    id: 2,
    name: "this is a name"
}
```
TypeScript will treat interfaces in the same way as it treats primitive types,
and it will use duck typing to ensure that when we say that an object matches an interface,
then it really does match the interface, with no property left behind.

#### Optional properties
```typescript
interface IOptional {
    id: number,
    name?: string;
}
```
Here, we have an interface names `IOptional`,
which has defined an `id` property of type `number`, and an optional property names `name` of type `string`.
We can now define objects as follows:
```typescript
interface IOptional {
    id: number,
    name?: string;
}

let optionalId: IOptional = {
    id: 1
}
let optionalIdName: IOptional = {
    id: 2,
    name: "optional name"
}
```