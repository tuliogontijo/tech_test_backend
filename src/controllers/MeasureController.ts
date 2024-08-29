import { Request, Response } from 'express';
import IMeasureController from '../interfaces/IMeasureController';

export default class MeasureController implements IMeasureController {
  create(req: Request, res: Response): void {
    res.json({ message: 'Teste!' });
  }

  confirm(req: Request, res: Response): void {
    res.json({ message: 'Teste!' });
  }

  getAll(req: Request, res: Response): void {
    res.json({ message: 'Teste!' });
  }
}
