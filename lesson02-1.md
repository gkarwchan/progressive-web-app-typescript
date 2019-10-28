server side

npm install express

npm install @types/express


import * as express from 'express';
import { setupMaster } from 'cluster';
import { resolve } from 'path';

const app = express();
const outputPath = resolve(process.cwd(), 'src/server');

app.get('/', (req, res, next) => {
  console.log('ssss')
  res.sendFile(resolve(outputPath, 'index.html'))
});

app.listen(3000, () => console.log('Example app running'));


change to 

esModuleInterop

remove all import * as 


{
  "compilerOptions": {
    "jsx": "react",
    "lib": ["es6", "dom"],
    "rootDir": "src",
    "module": "commonjs",
    "target": "es5",
    "sourceMap": true,
    "moduleResolution": "node",
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  },
  "include": [
    "./src"
  ],
  "exclude": [
    "node_modules",
    "build"
  ]
}
