import * as express from 'express';
import { setupMaster } from 'cluster';
import { resolve } from 'path';

const app = express();
const outputPath = './' || resolve(process.cwd(), 'build');

app.get('*', (req, res, next) => {
  res.sendFile(resolve(outputPath, 'index.html'))
});
