## Classes

___

### What is Classes?

* Template for creating objects
* Provides state storage and behavior
* Encapsulates reusable functionality

### Familiar Concepts of Classes

* Define Types
* Properties and Methods
* Constructors
* Access Modifiers
* Inheritance
* Abstract Classes

### Constructors

Method named `constructor` - maximum of one per class <br>
Use optional parameters to call different ways <br>
Executed by using the "new" keyword

```ts
class ReferenceItem {
    constructor(title: string, pblisher?: string) {
        // perform initialization here
    }
}

let encyclopedia = new ReferenceItem('WorldPedia', 'WorldPub');
```

### Properties and Methods

```ts
class ReferenceItem {
    numberOfPages: number;

    get editor(): string {
        // custom getter logic goes here, should return a value
    }

    set editor(newEditor: string) {
        // custom setter logic goes here
    }

    printCapterTitle(chapterNum: number): void {
        // print title here
    }
}
```

### Parameter Properties

```ts
class Author {
    name: string;

    constructor(authorName: string) {
        name = authorName;
    }
}

// Better syntax with shourcut that elminated the explicit property

class Author {
    constructor(public name: string) {
    }
}
```

### Static Property

```ts
class Library {
    constructor(public name: string) {
    }

    static description: string = 'A source of knowledge and inspiration'
}

let lib = new Library('Tel Aviv Public Library');
let name = lib.name; // available on instances of the 'Library' class
let desc = Library.description; // avaiable on the 'Library' class
```

### Access Modifiers

* public
* private
    * `#` (alternative - it's provide some extra protection (since ES 2021 and later))
* protected

### Inheritance

### Extending Classes with Inheritance

```ts
class ReferenceItem {
    title: string;

    printItem(): void {/** print something here**/
    }
}

class Journal extends ReferenceItem {
    constructor() {
        super();

    }

    contributors: string[];
}
```

### Abstract Classes

* Created with the `abstract` keyword
* Base classes that may not be instantiated
* May contain implementation details
* Abstract methods are not implemented