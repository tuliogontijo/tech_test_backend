/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';

import IMeasureController from '../interfaces/IMeasureController';

import MeasureServiceIntance from '../factories/MeasureServiceFactory';

export default class MeasureController implements IMeasureController {
  create(req: Request, res: Response): void {
    MeasureServiceIntance.createService({
      image: '',
      customer_code: '',
      measure_datetime: '',
      measure_type: null,
    });
  }
  confirm(req: Request, res: Response): void {
    MeasureServiceIntance.confirmService({
      measure_id: '',
      confirmed_value: 0,
    });
  }
  getAll(req: Request, res: Response): void {
    MeasureServiceIntance.getAllService({
      customer_code: '',
      measure_type: null,
    });
  }
}
