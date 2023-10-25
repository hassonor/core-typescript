### Promises

```typescript
import * as fs from "fs";

/**
 * This code demonstrates reading multiple files sequentially using the promises API from Node.js's `fs` module.
 *
 * 1. **Importing the Module**: 
 *    We start by importing the `fs` module, specifically its promises API. This allows us to utilize the file system operations in a promise-based fashion.
 *
 * 2. **Reading `test1.txt`**:
 *    The process begins with reading the file `test1.txt` using `fs.promises.readFile`.
 *
 * 3. **Logging & Continuing**:
 *    Once `test1.txt` is successfully read, its content is logged to the console in the first `.then` block. Immediately after, a promise to read the file `test2.txt` is returned, moving the flow to the next `.then` block.
 *
 * 4. **Reading `test2.txt`**:
 *    After the content of `test2.txt` is read, it's logged to the console. Again, a promise to read another file (`text3.txt`) is returned, which will prompt the subsequent `.then` block. (Note: There seems to be a typo, it probably should be `test3.txt` instead of `text3.txt`).
 *
 * 5. **Handling Errors**:
 *    If an error occurs during any of the file reading operations, the control is passed to the `.catch` block, where the error message is logged to the console.
 */

fs.promises.readFile("./test1.txt")
    .then((value)=>{
        console.log(`ps test1.txt read : ${value}`)
        return fs.promises.readFile("./test2.txt");
    }).then((value)=>{
        console.log(`ps test2.txt read : ${value}`);
        return fs.promises.readFile("./text3.txt");
    }).then((value)=>{
        console.log(`ps test3.txt read : ${value}`);
}).catch((error)=>{
    console.log(`an error occured : ${error}`);
});
```

#### Promise syntax
A Promise is an instance of a new Promise class
whose constructor required a function signature that accepts two callback functions,
generally named `resolve` and `reject`.

```typescript
function delayedPromise(): Promise<void>{
    return new Promise<void>(
        (
            resolve: () => void,
            reject: () => void
        ) => {
            function afterTimeout(){
                resolve();
            }
            setTimeout(afterTimeout, 1000);
        }
    );
}

delayedPromise().then(()=>{
    console.log(`delayed promise returned`);
});
```


