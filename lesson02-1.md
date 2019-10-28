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
