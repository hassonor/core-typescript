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
    .then((value) => {
        console.log(`ps test1.txt read : ${value}`)
        return fs.promises.readFile("./test2.txt");
    }).then((value) => {
    console.log(`ps test2.txt read : ${value}`);
    return fs.promises.readFile("./text3.txt");
}).then((value) => {
    console.log(`ps test3.txt read : ${value}`);
}).catch((error) => {
    console.log(`an error occured : ${error}`);
});
```

#### Promise syntax

A Promise is an instance of a new Promise class
whose constructor required a function signature that accepts two callback functions,
generally named `resolve` and `reject`.

```typescript
function delayedPromise(): Promise<void> {
    return new Promise<void>(
        (
            resolve: () => void,
            reject: () => void
        ) => {
            function afterTimeout() {
                resolve();
            }

            setTimeout(afterTimeout, 1000);
        }
    );
}

delayedPromise().then(() => {
    console.log(`delayed promise returned`);
});
```

#### Promise errors

A Promise object is constructed with a function that has two callback functions,
generally named `resolve` and `reject`.
Thus far, we have only used the `resolve` callback to indicate that the Promise processed successfully.
We can use the `reject` callback in the case where we we want to report an error, as follows:

```typescript
function errorPromise(): Promise<void> {
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
errorPromise().then(() => {
})
    .catch(() => {
        console.log(`3. caught an error`)
    });
```

The output of this code is as follows:

```
1. calling errorPromise()
2. calling reject()
3. caught an error
```

#### Returning values from Promises

```typescript
function promiseReturningString(throwError: boolean): Promise<string> {
    return new Promise<string>(
        (
            resolve: (outputValue: string) => void,
            reject: (errorCode: nummber) => void
        ) => {
            if (throwError) {
                reject(101);
            }
            resolve(`resolve with message`);
        }
    )
}

console.log(`1. calling promiseReturningString`);

promiseReturningString(false)
    .then((returnValue: string) => {
        console.log(`2. retunedValue : ${returnValue}`);
    }).catch((errorCode: number) => {
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
    .then((returnValue: string) => {
        console.log(`this is not called`);
    })
    .catch((errorCode: number) => {
        console.log(`2. caught : ${errorCode}`)
    })
```

#### Promise return types

* A Promise is an object that requires a function to be passed in as part of its constructor. This function can be a
  named function, or an anonymous function, but it is more common to see the anonymous function syntax used.
* The function that is passed into a Promise has a very specific signature. It requires two parameters, generally
  named `resolve` and `reject`, that are themselves callback functions.
  The `resolve` function will be invoked as a callback if the Promise itself succeeds,
  and the `reject` function will be invoked as a callback if the Promise fails.
* There can be one, and only one, parameter for the `resolve` callback function.
  This parameter is of the type that we used in the Promise generic syntax.
* There can be one, and only one, parameter for the `reject` callback function. This parameter does not need to be the
  same type as the type used in the `resolve` callback function.
* These `resolve` and `reject` callback functions must return void.

Suppose we wanted to create a Promise that connects to a database, and returns some data.
We might start with a few interfaces as follows:

```typescript
interface IConnection {
    server: string;
    port: number;
}

interface IError {
    code;
    number;
    message: string;
}

interface IDataRow {
    id: number;
    name: string;
    surname: string;
}

function complexPromise(
    connection: IConnection,
    accessKey: string
): Promise<IDataRow[]> {
    return new Promise<IDataRow[]>((resolve: (results: IDataRow[]) => void, reject: (error: IError) => void) => {
        // check the connection properties
        // connect to the database
        // retrieve data, or
        // reject with an error
    });
}

complexPromise(
    {
        server: "myServer",
        port: 4200
    },
    "abcd"
).then((rows: IDataRow[]) => {
    // do something with rows
}).catch((error: IError) => {
    // do something with error
});
```

### Async and await

___

#### Await syntax

```typescript
export function delayedPromise(): Promise<void> {
    return new Promise<void>(
        (
            resolve: () => void,
            reject: () => void) => {
            setTimeout(() => {
                console.log(`2. calling resolve()`)
                resolve();
            }, 1000)
        }
    )
}

async function callDelayPromise() {
    console.log(`1. brfore calling delayedPromise`);
    await delayerPromise();
    console.log(`3. after calling delayedPromise`)
}
```

Running this code will produce the following output:

```cmd
1. before calling delayedPromise
2. calling resolve()
3. after calling delayedPromise
```

This `async` and `await` technique relly helps us when writing code that is sequential in nature.
If we have many steps in our code that must be executed one after the other,
then this technique is invaluable in producing easy-to-read and east-to maintain code.

#### Await errors

```typescript
function errorPromise(): Promise<string> {
    return new Promise<string>(
        (
            resolve: (result: string) => void,
            reject: (error: string) => void) => {
            setTimeout(() => {
                console.log(`2. calling reject()`)
                reject("promise rejected");
            }, 1000)
        }
    )
}

async function callErrorPromise() {
    try {
        console.log(`1. calling errorPromise()`);
        await errorPromise();
    } catch (error) {
        console.log(`3. await threw: ${error}`)
    }
}
```

The output of this code is as follows:

```cmd
1. calling errorPromise()
2. calling reject()
3. await threw : promise rejected
```

#### Await values

The async await syntax also allows values to be returned by Promises, in a similar manner to how we would use
the `then` function blocks in Promise fluent syntax.
Let's take a look at this in action, starting with a Promise that returns some values, as follows:

```typescript
function promiseWithValues(): Promise<string> {
    return new Promise<string[]>(
        (
            resolve: (values: string) => void,
            reject: (error: string) => void) => {

            resolve(["first", "second"]);

        }
    )
}

async function getValuesFromPromise() {
    let values = await promiseWithValues();
    for (let value of values) {
        console.log(`value : ${value}`)
    }
}

getValuesFromPromise();
```

The output of this code is as follows:

```cmd
  value : first
  value : second
```

