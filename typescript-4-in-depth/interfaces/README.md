### Interfaces

___

* Contracts that define types
* Compiler enforces the contract via type checking
* Collection of property and method definitions
* Duck typing

_**Duck Typing**_:

```ts
interface Duck {
    walk: () => void;
    swim: () => void;
    quack: () => void;
}

let probablyADuck = {
    walk: () => console.log('walking like a duck'),
    swim: () => console.log('swimming like a fuck'),
    quack: () => console.log('quacking like a duck')
}

function FlyOverWater(bird: Duck) {
}

FlyOverWater(probablyADuck); // works!!!
```

Defining an Interface <br>
`interface` keyword <br>
List properties with their types<br>
Optional properties denoted with "?"<br>
Provide function signature - no implementation

```ts
interface Book {
    id: number;
    title: string;
    author: string;
    pages?: number;
    markDamaed: (reason: string) => void;
}
```

### Interfaces for Function Types

```ts
function CreateCustomerID(name: string, id: number): string {
    return name + id;
}

interface StringGenerator {
    (chars: string, nums: number): string;
}

let IdGenerator = StringGenerator
IdGenerator = CreateCustomerID;

```

### Extending Interfaces

```ts
interface LibraryResource {
    catalogNumber: number;
}

interface Book {
    title: string;
}

interface Encyclopedia extends LibraryResource, Book {
    volume: number;
}

let refBook: Encyclopedia = {
    catalogNumber: 1234,
    title: 'The Book of life',
    volume: 120
}
```

### Class Types

```ts
interface Librarian {
    doWork: () => void;
}

class ElementarySchoolLibrarian implements Librarian {
    doWork() {
        console.log('Reading to and teaching children...');
    }
}

let kidsLibrarian: Librarian = new ElementarySchoolLibrarian();
kidsLibrarian.doWork();
```
