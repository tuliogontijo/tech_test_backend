import express from 'express';
import 'express-async-errors';

import router from './routes';

const app = express();

app.use(express.json());

app.use(router);

const port = 3000;

app.listen(port, () => console.log(`Server started at http://localhost:${port}`));
