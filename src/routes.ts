import { Request, Response, Router } from 'express';

const router = Router();

router.post('/upload', (req: Request, res: Response) => {
  res.json({ message: 'Teste!' });
});

router.patch('/confirm', (req: Request, res: Response) => {
  res.json({ message: 'Teste!' });
});

router.get('/:customer_code/list', (req: Request, res: Response) => {
  res.json({ message: 'Teste!' });
});

export default router;
