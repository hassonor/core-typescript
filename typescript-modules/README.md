# Using TypeScript 4 Modules

___

#### Why You Should Use TypeScript Modules

* Front-end applications are increasingly complex
* Organization and structure are critical <br><br>
  __*Importing and Exporting*__
* Easily make code in a module public or private
* Avoid repetition and boilerplate code
* Modules are always evaluated in strict mode

#### Strict Mode

* Strictly opt-in
* Add use strict to every JavaScript file
* Avoid even more repetition

### What Makes a Module a Module?

___

#### Module Facts

* Modules are never evaluated in the global scope
* The window object is available to all modules
* Only exported code can be imported
* Modules cannot be loaded locally
* Modules are loaded asynchronously and executed on ready

### Internal vs External Modules

____

#### Namespace

* Members are scoped to the module
* Values can be exported
* Referred to as namespaces

```ts
namespace MyNamedInternalModule {
    const privateVar = 'private';
    export const publicVar = 'public';
}
console.log(MyNamedInternalModule.publicVar); // public
```

### Basic TypeScript Modules

___

#### Exporting Code from a Module

* Typically, modules will export values of functionality

### Default Exports

Default exports differ from names exports in several ways, and use a different import syntax

### Summary: Modules exports

_*Any declaration can be exported*_

* Named exports
* Renamed exports
* Export statements
* Barrel files
* Default exports

### Module Resolution Strategies

* Classic (backwards-compatibility)
* Node (default)





