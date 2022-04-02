## Generics

___

### What are generics?

* _*Code that works with multiple types*_
* _*Accept "type parameters" for each instance of invocation*_

### What are type parameters?

* _*Specify the type a generic will operate over*_
* _*Listed separate from function parameters inside angle brackets*_
* _*Conventionally represented by the letter 'T' (e.g. `Array<T>`)
* _*Actual type provided at instance creation or function invocation*_

### Using `Array<T>`

Type parameter specifies the type the array can contain <br>
Type parameters are part of the type <br>

```ts
let poetryBooks: Book[];
let fictionBooks: Array<Book>;
let historyBooks = new Array<Book>(5);
```

### Generic Functions

```ts
function LogAndReturn<T>(thing: T): T {
    console.log(thing);
    return thing;
}

let someString: string = LogAndReturn<string>('Log this :)');

let newMag: Magazine = {title: 'Software Developer Monthly'}
let someMag: Magazine = LogAndReturn<Magazine>(newMag);
```

### Generic Interfaces

```ts
interface Inventory<T> {
    getNewestItem: () => T;
    addItem: (newItem: T) => void;
    getAllItems: () => Array<T>;
}

let bookInventory: Inventory<Book>;
// populate the inventory here...
let allBooks: Array<Book> = bookInventory.getAllItems;
```

### Generic Classes

```ts
class Catalog<T> implements Inventory<T> {
    private catalogItems = new Array<T>();

    addItem(newItem: T) {
        this.catalogItems.push(newItem);
    }

    // implement other inteface mehtods here...
}

let bookCatalog = new Catalog<Book>();
```

### Generic Constraints

Describe types that may be passed as a generic parameter <br>
`extends` keyword applies constraint <br>
Only types satisfying the constraints may be used

```ts
interface CatalogItem {
    catalogNumber: number;
}

class Catalog<T extends CatalogItem> implements Inventory<T> {
    // implement interface methods here
}
```

