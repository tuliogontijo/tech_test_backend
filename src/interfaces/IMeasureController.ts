import { Request, Response } from 'express';

interface IMeasureController {
  create(req: Request, res: Response): void;
  confirm(req: Request, res: Response): void;
  getAll(req: Request, res: Response): void;
}
export default IMeasureController;
