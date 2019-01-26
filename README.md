# SwipeDungeon

Made @ UPenn in 2018

## Tips on using the webpack branch
Works very well with VSCode. This is a free, powerful, and super small code editor with a ton of fantastic features.

https://code.visualstudio.com/

It's also got some nice features like integration with NPM and more.

### Node.js and the Node Package Manager
There are over a quarter-million javascript packages out there in the world on https://www.npmjs.com.

These packages are everything from string regex parsing to React, Vue, Express, and other giant frameworks.

I've gone ahead and turned SwipeDungeon into a nodeJS project (by adding `package.json`), so to really get the most out of this you need to install Node.JS (https://nodejs.org/en/)

Feel free to download any package in the world you want to use from NPM, and use them in the project. A useful one might be lodash, it'll save you a lot of time.

### Modules and Imports and Webpack
Your own code has now been modularized, meaning that you will never have dependency issues ever again. If you need a function from another file, just `import {myFunc} from "./path/to/otherfile"`.

**Webpack** will take care of the rest. It's a module loader with the job of ensuring that whatever you import will work, regardless of what order you load files in and all of that jazz. 

This is already a problem, for example: `drawing.js` needs ctx and c from `framework.js`, but `framework.js` needs `drawAssets`, etc. from `drawing.js`. In this particular example, the program still runs, but things might get more complicated in the future. Like if both `drawing.js` and `physics.js` need `lodash` and `framework` requires `async` and `async` requires `lodash` too... You would need to write a topological sort algorithm and really it's just better to use **Webpack**.

If you want to use webpack, you just need to run a simple easy command: `npm build`. If you use VSCode, it's got a hotkey: Ctrl-Shift-B (Up at the terminal tab). This will sort out all the dependencies and whatnot for you, and spit out a nice easy file in the dist folder called `main.js`.

### ESLint
Another great addition to the project is called ESLint. If you use VSCode, just grab the ESLint extension in the code editor, it takes like 4 seconds. (Another good extension to try is called "Open in browser". It lets you open index.html in your browser very easily.)

ESLint helps you write cleaner, better code with less errors. For example, it encourages to use `let` instead of `var`. You guys actually had a few bugs where you did something like:
```
    for (var i = 0; i++; i < 10) {
        ...
        for (var i = 0; i++; i < 5) {
            ...
        }
    }
```
Another important one is that it catches other problems like using `==` when you really meant `===`. 

### Action Items
1. Install Node.js
2. Install VSCode
3. Install the *ESLint* and *Open in Browser* Extensions
4. Run the command `npm install` in a terminal (VSCode has a terminal built into it) to download eslint and webpack
5. Run the command `npm build` in a terminal (or press Ctrl-Shift-B in VSCode) to bundle and minify your source code
6. Open index.html and everything should still work.

Or you could just ignore this branch it's not a big deal if you want to do that.


