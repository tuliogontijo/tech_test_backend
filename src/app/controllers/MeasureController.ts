import { Request, Response } from 'express';

import IMeasureController from '../interfaces/IMeasureController';
import { Tmeasure_type } from '../types/MeasureType';

import MeasureServiceIntance from '../factories/MeasureServiceFactory';

import { ERR_CODE, ERR_DESC } from '../constants';
import { isConfirmParamsValid, isCreateParamsValid } from '../utils/paramsValidator';

export default class MeasureController implements IMeasureController {
  async create(req: Request, res: Response): Promise<void> {
    const { image, customer_code, measure_datetime, measure_type } = req.body;

    if (!isCreateParamsValid(req.body, res)) return;

    const measure_month = new Date(measure_datetime).getMonth() + 1;
    const measure_year = new Date(measure_datetime).getFullYear();

    const measureExists = await MeasureServiceIntance.getOne({
      customer_code,
      measure_month,
      measure_year,
      measure_type,
    });

    if (measureExists) {
      res.status(409).json({
        error_code: ERR_CODE.DOUBLE_REPORT,
        error_description: ERR_DESC.MONTH_MEASURE_ALREADY_DONE,
      });
      return;
    }

    const response = await MeasureServiceIntance.createService({
      image,
      customer_code,
      measure_datetime,
      measure_type,
      req,
    });

    res.status(200).json(response);
  }

  async confirm(req: Request, res: Response): Promise<void> {
    const { measure_uuid, confirmed_value } = req.body;

    if (!isConfirmParamsValid(req.body, res)) return;

    const measure = await MeasureServiceIntance.getOne({
      measure_uuid,
    });

    if (!measure) {
      res.status(404).json({
        error_code: ERR_CODE.MEASURE_NOT_FOUND,
        error_description: 'Leitura não encontrada',
      });
      return;
    }

    const { has_confirmed } = measure;

    if (has_confirmed) {
      res.status(409).json({
        error_code: ERR_CODE.CONFIRM_DUPLICATE,
        error_description: ERR_DESC.MONTH_MEASURE_ALREADY_DONE,
      });
      return;
    }

    await MeasureServiceIntance.confirmService({
      measure_uuid,
      confirmed_value,
    });

    res.status(200).json({ success: true });
  }

  async getAll(req: Request, res: Response): Promise<void> {
    const { customer_code } = req.params;
    let { measure_type } = req.query;

    if (!customer_code) {
      res.status(400).json({
        error_code: ERR_CODE.INVALID_DATA,
        error_description: 'o valor de customer_code é inválido ou nulo',
      });
      return;
    }

    if (!measure_type) {
      measure_type = '';
    } else if (!['WATER', 'GAS', ''].includes(measure_type.toString().toUpperCase())) {
      res.status(400).json({
        error_code: ERR_CODE.INVALID_TYPE,
        error_description: ERR_DESC.MEASURE_TYPE_NOT_ALLOWED,
      });
      return;
    }

    const response = await MeasureServiceIntance.getAllService({
      customer_code,
      measure_type: measure_type.toString().toUpperCase() as Tmeasure_type,
    });

    if (response.measures.length < 1) {
      res
        .status(404)
        .json({ error_code: ERR_CODE.MEASURES_NOT_FOUND, error_description: ERR_DESC.EMPTY_LIST });
      return;
    }

    res.status(200).json(response);
  }
}
