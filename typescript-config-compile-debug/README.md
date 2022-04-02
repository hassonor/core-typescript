# TypeScript: Configuring, Compiling and Debugging Projects

___

## TypeScript Env.

___

### Multiple TypeScript Versions

Each TypeScript Project on a workstation can be of a different version. <br>
There can also be one globally installed version of TypeScript.

* __Local Version__: Found within a project's directory, only used by that project.
* __Global Version__: Fallback for when there is not a local version.
* __Embedded Version__: Fixed version built into some software ide (i.e., VSCode, WebStorm).
  <br><br>

__Installing TypeScript Globally__: `npm install -g typescript` <br>
__Installing TypeScript Locally__: `npm install --save-dev typescript`<br>

### What is the TypeScript Compiler?

* Turns TypeScript into browser-compatible language
* Browsers understand JavaScript, but not TypeScript
* Results may be different based on compiler version
* Can be executed automatically watching code changes

### What is a tsconfig file?

* Using tsconfig.json allows us to customize TypeScript to suit of our project.
* Defines which TypeScript files should be compiled and the resulting structure.
* Which TypeScript features to use when compiling.
* Varies from project to project...

```json
{
  "extends": "@tsconfig/node12/tsconfig.json",
  // inherited from standard package
  "compilerOption": {
    "module": "commonjs",
    // modifies the format of JavaScript output
    "noImplicitAny": true,
    //prevents developers from using "any" type
    "removeComments": true,
    // removes comments from generated code
    "sourceMap": true
    // created a source map used for debugging
  },
  "include": [
    "src/**/*"
  ]
  // defines which files should be compiled
}
```

__Example TypeScript Configuration__: <br>
tsconfig files take the form of a JSON object. <br>
There are __hundreds__ of options available - above are some of the most common.<br>
[More about tsconfig](https://www.typescriptlang.org/tsconfig)

### What does TypeScript Project consist of?

`package.json` - Tracks versions of TypeScript and ESLint (used to enforce coding style), contains shortcuts for
building and watching TypeScript code. <br>
`index.ts` - Contains code which serves the application, and references to other TypeScript files <br>
`tsconfig.json` - Configures how TypeScript should be compiled, and the source and output file locations