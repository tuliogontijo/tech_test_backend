import { Request, Response } from 'express';

import IMeasureController from '../interfaces/IMeasureController';

import MeasureServiceIntance from '../factories/MeasureServiceFactory';
import { Tmeasure_type } from '../types/MeasureType';

export default class MeasureController implements IMeasureController {
  async create(req: Request, res: Response): Promise<void> {
    const { image, customer_code, measure_datetime, measure_type } = req.body;
    //TODO: validar parametros

    const measure_month = 'extrair mês de measure_datetime';

    const measureExists = await MeasureServiceIntance.getOne({
      customer_code,
      measure_month,
      measure_type,
    });

    if (measureExists) {
      res.status(409).json({ error_code: '', error_description: '' }); //TODO: AJUSTAR ERRO
      return;
    }

    const response = await MeasureServiceIntance.createService({
      image,
      customer_code,
      measure_datetime,
      measure_type,
    });

    res.status(200).json(response);
  }

  async confirm(req: Request, res: Response): Promise<void> {
    const { measure_id, confirmed_value } = req.body;

    const measure = await MeasureServiceIntance.getOne({
      measure_id,
    });

    if (!measure) {
      res.status(404).json({ error_code: '', error_description: '' }); //TODO: AJUSTAR ERRO - NÃO ENCONTRADA
      return;
    }

    const { has_confirmed } = measure;

    if (has_confirmed) {
      res.status(409).json({ error_code: '', error_description: '' }); //TODO: AJUSTAR ERRO - JÁ CONIFRMADA
      return;
    }

    const response = await MeasureServiceIntance.confirmService({
      measure_id,
      confirmed_value,
    });

    res.status(200).json(response);
  }

  async getAll(req: Request, res: Response): Promise<void> {
    const { customer_code } = req.params;
    let { measure_type } = req.query;

    if (!measure_type) {
      measure_type = '';
    } else if (!['WATER', 'GAS', ''].includes(measure_type as string)) {
      res.status(400).json({ error_code: '', error_description: '' }); //TODO: PARAMETRO TYPE DIFERENTE DE WATER OU GAS
      return;
    }

    const response = await MeasureServiceIntance.getAllService({
      customer_code,
      measure_type: measure_type as Tmeasure_type,
    });

    if (response.measures.length < 1) {
      res.status(404).json({ error_code: '', error_description: '' }); //TODO: AJUSTAR ERRO - SEM MEDIÇÕES
      return;
    }

    res.status(200).json(response);
  }
}
