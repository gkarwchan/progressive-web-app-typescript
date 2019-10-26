# 01 - typescript and webpack

This lesson will introduce webpack and typescript.


## Initialize the project ##
Create a directory with the name of the project, inside the directory intialize the npm:
```sh
mkdir myapp
cd myapp
npm init -y
```
  

Add `.gitignore` file and the following into it.  

```sh
.DS_Store
*.log
node_modules/
```

 

## TypeScript:
TypeScript is a superset of javascript that compiles to plain JavaScript.


#### Setup TypeScript:

```sh
npm i -D typescript ts-loader
```
We need to configure TypeScript in the local folder. Create a file names `tsconfig.json`

```json
// file tsconfig.json
"compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
    "module": "commonjs",
    "target": "es5",
    "jsx": "react",
    "allowJs": true
  }
}
```

Add a file called **.browserslistrc** and add the following:  


```js
last 2 version
> 5%
not dead
node 10

```

The above files will tell babel to use the two presets: env and react, and it configures the preset env to generate output compatible with the last 2 versions of each browser (as listed in the file .browserslistrc).  
The entry: `useBuiltIns: "usage"` tells babel to add only the required polyfills.  
  
Let us see babel in action. Create a folder called src, and add two files into it: person.js, and index.js.
Add the following code:

```typescript
// person.ts
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  sayHello() {
    return `My name is ${this.name}`;
  }
}

export default Person;
```

and in `index.ts` add this:
```typescript
// index.ts
import Person from './Person';

function component() {
  var element = document.createElement('div');
  var person = new Person('John');
  element.innerHTML = `Hello, ${person.sayHello()}`;

  return element;
}

document.body.appendChild(component());
```


Add a file called `index.html` in your root directory (not in src, but parent of src) with the following code:

```html
<html>
  <head>
    <title>Getting Started</title>
  </head>
  <body>
    <div id="abc">
     <script src="dist/bundle.js"></script> 
  </body>
</html>
```


Now let us run babel to take a sense of what it is doing:  

```sh
./node_modules/.bin/tsc
```

this will generate two files in the folder dist.  
If you open the file **index.html** in a browser, you should see the text: 
```
Hello, My name is John
```

## Webpack ##

Webpack is the bundling tool, that will combine all our input files, into only one file, and it can put the ES6 module system into practice.  
Webpack has an eco-system, that makes it more than a bundling tool, and it gives it all capabilities to be a full build/deploy platform.  Adding to that, it has a very powerful feature called **hot-module-replacement** which allows compile and refresh the browser on the fly, while you are doing development.  


#### What is Webapck? ####
Webpack consists of the following parts:  

1. webpack: which is the main bundling module, it can be called from a command line CLI (webpack-cli), or from a plugin inside Node server.
2. webpack-cli: the command line tool to run webpack.
3. webpack-command: another command line tool powered by the community, has a slight advantages over webpack-cli.
4. webpack-dev-server: a simple Node server, that serve a single page application, providing hot-module-replacement out-of-box.  
5. webpack middlewares: used when you want to host your application in a real Node server, and the same time provides build on the fly.
6. loaders: loaders are the tools that makes webpack a full build/bundle system. They convert ES6 to ES5 javascript, or SCSS to CSS, or image to url...etc. There is a loader for each seperate build/bundle process in a web application.
7. plugins: plugins are extre process, that can add extra functionalites outside the code transformation process.

#### Install and setup webpack ####

run the following:  

```sh
npm i --save-dev webpack webpack-cli webpack-dev-server
```

Where babel-loader, is the webpack loader that use babel to transpile ES6+ into ES5.

Add a new file to configure webpack, called **webpack.config.babel.js**.


```js
// webpack.config.js
import path from 'path';

export default {
  mode: 'development',
  entry: ['./src'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist/'
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
    ],
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', 'tsx', '.js']
  }
};
```

modify the index.html to the following:

```html
<html>
  <head>
    <title>Getting Started</title>
  </head>
  <body>
    <div id="abc">
     <script src="./dist/bundle.js"></script> 
  </body>
</html>
```

Let's see webpack in action. Run the following command:

```sh
./node_modules/.bin/webpack
```

You will see this command will do what babel did, and on top of it bundle all files into one file **/dist/bundle.js**.  
To simplify calling webpack, add a script command into package.json as follows:

```js
//add this to package.json

"scripts": {
  "build": "webpack",
....
```

Now, you can run the previous command by simply:

```sh
npm run build
```

#### introducing webpack-dev-server ####

Let us now run our app as a web server, and run it inside webpack-dev-server. Add the following to the webpack.config.babel.js.

```js
//inside webpack.config.babel.js

devServer: {
  contentBase: __dirname,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
},
```

Modify package.json to add one more script:

```js
 "scripts": {
    "start": "webpack-dev-server --open",
    .....
}
```

and run 
```sh
   npm start
``` 

And the browser will open with our application.






mkdir myapp
cd myapp
npm init -y

install typescript

npm i -D typescript


mkdir src
in file src/index.ts

var message:string = "Hello World" 
console.log(message)

tsc src/index.ts

now add the following: tsconfig.json

{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "outDir": "dist"
  }
}

./node_modules/.bin/tsc

add webpack and its ts related loaders

npm i -D webpack webpack-cli ts-loader @types/node @types/webpack ts-node

add script to the package.json


import * as webpack from 'webpack';
import { join } from 'path';


const config: webpack.Configuration = {
  context: join(__dirname, 'src/'),
  entry: {
    main: './'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            silent: true
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [".ts", "tsx", "js", "jsx"]
  }
}

export default config;


"build": "webpack"


