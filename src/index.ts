import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import 'dotenv/config';
import path from 'path';

import router from './routes';

const app = express();

app.use(express.json({ limit: '5mb' }));

app.use('/bucket', express.static(path.join(__dirname, 'bucket')));

app.use(router);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.sendStatus(500);
});

const port = Number(process.env.PORT) | 3000;

app.listen(port, () => console.log(`Server started at http://localhost:${port}`));
