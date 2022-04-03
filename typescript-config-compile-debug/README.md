# TypeScript: Configuring, Compiling and Debugging Projects

___

## Environment Compilation for TypeScript

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

## Configuring the TypeScript Compiler

___
Effectively configuring the compiler allows us to design a build process that suits our app, and not the other way
around. <br>

* __Output Format__: Specify format of generated code(ES3, ES6,ESNext, etc.)
* __Supported Features__: Restrict certain TypeScript features (__e.g.__,_*any*_ __type__)
* __Style Guidelines__: Codify and enforce style (line breaks, tab size, etc.) among large teams

### Watching for Changes to TypeScript Files

* Architecting your application so that builds occur automatically lets your developers focus on completing their tasks.
* Compiler executes automatically when code is edited
* Other tooling (test, etc.) can also be triggered
* Can ignore specific files (e.g, node_modules)

[More info about configuring watch](https://www.typescriptlang.org/docs/handbook/configuring-watch.html)

### Extending Base Configuration

___

#### What Is Base Configurations?

* Collection of compiler options and values
* Available locally or as a package maintained by TypeScript
* Any option can be overwritten

__Extending Default Configuration__<br>
&nbsp;&nbsp;&nbsp;&nbsp; __*The two `tsconfig.json` files below are equivalent*__

```json
{
  "extends": "@tsconfig/node12/tsconfig.json"
}
```

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Node 12",
  "compilerOptions": {
    "lib": [
      "es2019",
      "es2020.promise",
      "es2020.bigint",
      "es2020.string"
    ],
    "module": "commonjs",
    "target": "es2019",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFilesNames": true
  }
}
```

`tsconfig.json` Explained: <br>
___
`"lib"` - Specifies which libraries or polyfills should be included in build. <br>
E.g, including `es2020.promise` will enable build code to work on older browsers with no build in promise spec.
<br><br>
`"module"` - Specifies how to transform code when files refer to each other with require or import.
<br><br>
`"target"` - Specifies output code format.
<br><br>
`"strict"` - Prevents compilation on any minor type errors or style inconsistencies.

#### Common tsconfig Bases

A collection of bases is maintained by the TypeScript project. <br>

* __recommended__: Enforces strict style and targets ES2015.
* __create react app__: Settings needs for `jsx` interoperability.
* __node__: Outputs modern server JavaScript `require`,`async`,etc.

### Multi-files vs Single-file Compilation

___
_*Multi-file Complication*_:

* Creates one JavaScript file for every target TypeScript file
* Each file must be loaded for the application to work in a browser
* File must be concatenated or use require to work in Node.js
* Possible to update just one generated file in production
* Standard compilation option for TypeScript

_*Single-file Compilation*_:

* Combines all TypeScript files into one single JavaScript file
* Only a single file must be loaded for the application to work in a browser
* Single file will work when invoked as a Node script
* Updated production code must be pushed in its entirety
* Additional tooling (Webpack, Babel) needed

### Single-file Compilation for Majority of Tasks

* Compiling a TypeScript application to a single file generally makes it easier to deploy as both a web and server-side
  application.
* Greater support for isomorphic applications
* Fewer HTTP requests, simpler deployment to web applications
* Greater consistency across browser / Node versions

## Maximizing Collaboration with Project References and Type Declaration Files

___

### Project References

___

#### What Are Project References?

Project references break large TypeScript applications into smaller blocks that can be built, imported and modified
separately.

* Separate application into logical silos.
* Customize build steps for each sub-project.
* Avoid building unnecessary files.

__*Configuring Project References*__
`tsconfig.json`

```json
{
  "references": [
    {
      "path": "../performance"
    }
    // directory contains tsconfig.json file
  ]
}
```

#### Understanding Project References:

* Projects referenced this way must have composite enabled.
* Projects will be rebuilt as infrequently as possible.
* Build flag will cause compiler to rebuild all projects
* Circular dependencies must be avoided

#### Type Declaration Files

___

#### What are Type Declaration Files?

_*Type Declaration files let us add typings to values exported from normal JavaScript files.*_

* __Code Hints__: Autocompletion and pre-compile warnings
* __Type Checking__: More sophisticated type checking during compile
* __External and Internal__: Use community declarations or author for your own project

#### When to Use Type Declaration Files

* With any major JS library or framework, use a declaration file downloaded from a community repository (i.e.
  _*Definitely Typed*_)
* With a locally authored JavaScript tool, create a declaration file and include it with that tool

#### Understanding Definitely Typed

The open-source community has gathered definitions for hundreds of legacy JavaScript libraries.<br>

* Authoring original d.ts files for npm libraries not usually necessary.
* Works for most libraries found in legacy projects - jQuery, underscore, etc.
* Modern releases of libraries such as jQuery already include declaration files.

#### Type Declaration are extremely useful for application development

* Add time-saving code hints for developers
* Prevent builds which would result in a type error
* Developers can focus on task at hand
* Author your own, or use Definitely Typed

### Debugging Advantages of TypeScript

___
One of TypeScript's main advantages of JS is easier debugging in many cases. <br>

* Type errors stopped at compile time
* Additional tooltips, code hints prevent errors
* Common pitfalls (such as switch statements lacking a break), are disabled

#### Which Errors Cannot Be Prevented by TypeScript?

* Incorrectly written function and miscalculations
* Errors arising from corner cases and user input
* Unanticipated values from third party APIs

#### Source Maps

* Couples generated code with source code
* Browser will show source file, not generated file, while debugging
* Can be embedded entirely within generated file

__*Enabling Sources Maps*__

```json
{
  "compilerOptions": {
    "sourceMap": true
  }
}
```

### Standardizing TypeScript Styling with ESLint

___

#### What is __ESLint__?

* Tool for evaluating application _*source code*_
* Capable of analyzing code style - bracket spacing, line breaks, tabs and spaces, etc.
* Works with continuous integration - pull requests with incorrectly styled code can be rejected automatically

#### What Should Use __ESLing__?

* Large teams
* Large Projects
* Projects with indefinite scope
* When more unified style is needed

#### What Kind of TypeScript Style Can ESLint Enforce?

* Styling and spacing TypeScript specific code (e.g, type annotations)
* Disallowed keywords(with,do)
* Preferred code conventions (e.g., requiring classes to always define a constructor)
* Invisible style choices (tabs vs spacing, empty new line at EOF)
