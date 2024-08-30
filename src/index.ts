import express from 'express';
import 'express-async-errors';

import 'dotenv/config';
import path from 'path';

import router from './routes';

const app = express();

app.use(express.json({ limit: '5mb' }));

app.use('/bucket', express.static(path.join(__dirname, 'bucket')));

app.use(router);

app.listen(process.env.PORT, () => console.log(`Server started at http://localhost:${process.env.PORT}`));
