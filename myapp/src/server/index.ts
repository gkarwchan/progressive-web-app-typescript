import express from 'express';
import { resolve } from 'path';

const app = express();
const outputPath = resolve(process.cwd(), 'dist');
app.use(express.static('dist'))

app.get('/', (req, res, next) => {
  res.sendFile(resolve(outputPath, 'index.html'));
});

app.listen(3000, () => console.log('Example app running'));