import express, { Request, Response, Router } from 'express';

const app = express();

const route = Router();

app.use(express.json());

route.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Teste!' });
});

app.use(route);

app.listen(3000, () => 'server running on port 3000');
