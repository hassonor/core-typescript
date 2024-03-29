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

#### The in operator
JavaScript allows up interrogating an object and see if it has a property using the 'in' operator.
Let's explore this operator with the following interfaces:
```typescript
interface IIdName {
    id: number;
    name: string;
}

interface IDescrValue {
    descr: string;
    value: number;
}

function printNameOrValue(obj: IIdName | IDescrValue): void {
    if ('id' in obj){
        console.log(`obj.name : ${obj.name}`);
    }
    if ('descr' in obj){
        console.log(`obj.value : ${obj.value}`);
    }
}

printNameOrValue({
    id: 1,
    name: "nameValue"
}); // obj.name : nameValue

printNameOrValue({
    descr: "description",
    value: 2
}); // obj.value : 2

```

#### keyof
```typescript
interface IPerson {
    id: number;
    name: string;
}

type PersonPropertyName = keyof IPerson;
```
We are using the `keyof` keyword to generate a string literal type for the properties found in the `IPerson` interface.
This is equivalent to the following string literal: `type PersonPropertyLiteral = "id"  | "name";`.
<br>
We can now use this type as follows:
```typescript
function getProperty(key: PersonPropertyName, value: IPerson){
    console.log(`${key}  = ${value[key]}`);
}

getProperty("id", {id: 1, name: "firstName"});
getProperty("name", {id: 2, name: "secondName"});
getProperty("telephone", {id: 3, name: "thirdName"});
```
The first call to the `getProperty` function will output the value of the "id"
property, and the second call to the `getProperty` function will output the value of the "name" property.
The third call, however, will generate the following error:
```shell
error TS2345: Argument of type '"telephone"' is not assignable to parameter of type '"id" | "name"'.'
```

Using the `keyof` keyword will generate a string literal
that automatically includes all of the properties of an interface.
This technique is obviously preferable to having to maintain string literals manually.

