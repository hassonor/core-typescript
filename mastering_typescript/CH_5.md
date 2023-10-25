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

#### Promise errors
A Promise object is constructed with a function that has two callback functions,
generally named `resolve` and `reject`.
Thus far, we have only used the `resolve` callback to indicate that the Promise processed successfully.
We can use the `reject` callback in the case where we we want to report an error, as follows:
```typescript
function errorPromise(): Promise<void>{
    return new Promise<void>(
        (
            resolve: () => void,
            reject: () => void
        ) => {
            console.log(`2. calling reject()`);
            reject();
        }
    )
}

console.log(`1. calling errorPromise()`);
errorPromise().then(() => { })
    .catch(()=> { console.log(`3. caught an error`)});
```
The output of this code is as follows:
```
1. calling errorPromise()
2. calling reject()
3. caught an error
```

#### Returning values from Promises
```typescript
function promiseReturningString(throwError: boolean): Promise<string>
{
    return new Promise<string>(
        (
            resolve: (outputValue: string) => void,
            reject: (errorCode: nummber) => void
        ) => {
            if (throwError){
                reject(101);
            }
            resolve(`resolve with message`);
        }
    )
}

console.log(`1. calling promiseReturningString`);

promiseReturningString(false)
    .then((returnValue: string) =>{
        console.log(`2. retunedValue : ${returnValue}`);
    }).catch((errorCode: number)=>{
        console.log(`this is not called`);
});
```
The output code is as follows:
```
1. calling promiseReturningString
2. returnedValue : resolve with message
```

Note that we can also force an error from this Promise by switching the `throwError` argument from `false` to `true`,
as follows:
```typescript
promiseReturnString(true)
    .then((returnValue: string)=>{
        console.log(`this is not called`);
    })
    .catch((errorCode: number)=>{
        console.log(`2. caught : ${errorCode}`)
    })
```


