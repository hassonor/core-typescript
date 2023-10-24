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


