## Compiler Options and Project Configuration

___

### Common Compiler Options

* `--module / --m` (Tell the compiler which module format it should output such _*es2015 / CommonJS*_...);
* `--moduleResolution` (Lets you specify how the TS compiler will attempt to resolve modules Node/Classic);
* `--target / --t` (Lets you specify which version of JS should be output by the compiler);
* `--watch / --w` (Lets you leave the compiler running in watch mode);
* `--outDir` (Lets you specify a directory that should receive all the compiled output files.)
* `--noImplicitAny`   <br>   <br>

`tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "es6",
    "outDir": "js",
    "module": "CommonJS",
    "sourceMap": true
  }
}
```

### Role of tsconfig.json

* Marks the root of TypeScript project
* Specifies TypeScript compiler options

Compiling `app.ts` file and all his dependencies with `"files"` parameter. <br>
`tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "es6",
    "outDir": "js",
    "module": "CommonJS",
    "sourceMap": true
  },
  "files": [
    "app.ts"
  ]
}
```

Compiling all ts files with `ts` extension on current dir and all subs dir with  `"include"` parameter. <br><br>
Plus Excluding all files in `lib` directory using `"exclude"` parameter. <br> <br>
`tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "es6",
    "outDir": "js",
    "module": "CommonJS",
    "sourceMap": true
  },
  "include": [
    "**/*.ts"
  ],
  "exclude": [
    "./lib/*"
  ]
}
```