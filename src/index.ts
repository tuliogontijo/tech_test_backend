import express from 'express';
import 'express-async-errors';
import path from 'path';

import router from './routes';

const app = express();

app.use(express.json({ limit: '5mb' }));

app.use('/bucket', express.static(path.join(__dirname, 'bucket')));

app.use(router);

const port = 3000;

app.listen(port, () => console.log(`Server started at http://localhost:${port}`));
