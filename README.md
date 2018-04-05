# ngc relative path watcher error

The app is alredy built in the `build` folder. All that is needed is to install dependencies and call ngc to reproduce. 


Steps to reproduce:

``` bash
$ npm install
$ node_modules/.bin/ngc -p config/tsconfig.dev.json --watch
```

Make a change in any file in `src/app`.

``` javascript
{
    "extends": "../tsconfig.json",
    "compilerOptions": {
        "outDir": "../build",
        "target": "es5",
        "module": "commonjs",
        "noImplicitAny": false
    },
    "angularCompilerOptions": {
        "skipMetadataEmit": true
    },
    "include": [
        "../src/**/*"
    ]
}
```

tsconfig.json (in root directory)

``` javascript
{
    "compilerOptions": {
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "moduleResolution": "node",
        "declaration": false,
        "sourceMap": true,
        "typeRoots": [
            "node_modules/@types"
        ],
        "types": [
            "node",
            "jasmine",
            "karma"
        ],
        "lib": [
            "es2017",
            "dom"
        ]
    }
}
```

When the config is located in the root directory, the watcher works.


``` bash
node_modules/.bin/ngc -p tsconfig.dev.json --watch
```










