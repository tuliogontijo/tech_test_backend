import IMeasureRepository from '../interfaces/IMeasureRepository';
import * as paramsTypes from '../types/MeasureRepoParamsTypes';
import * as returnTypes from '../types/MeasureRepoReturnTypes';

import { query } from '../../database';

export default class MeasureRepository implements IMeasureRepository {
  async insert(params: paramsTypes.TinsertParams): Promise<returnTypes.TinsertReturn> {
    const { measure_value, measure_datetime, measure_type, customer_code, image_url } = params;

    const [row] = await query<returnTypes.TinsertReturn>(
      `
      INSERT INTO measures
      VALUES($1, $2, $3, $4, $5)
      RETURNING id
    `,
      [measure_value, measure_datetime, measure_type, customer_code, image_url],
    );

    return row;
  }

  async getOneByCostumerIDMonthAndType(params: paramsTypes.TgetOneByCostumerIDMonthAndTypeParams): Promise<returnTypes.TgetOneReturn> {
    const { customer_code, measure_month, measure_type } = params;

    const [row] = await query<returnTypes.TgetOneReturn>(
      `
      SELECT id
      FROM measures
      WHERE customer_code=$1, month(measure_datetime) = $2, measure_type = $3
      RETURNING *
    `,
      [customer_code, measure_month, measure_type],
    );

    return row;
  }

  async updateConfirmStatus(params: paramsTypes.TupdateConfirmStatusParams): Promise<returnTypes.TupdateConfirmStatusReturn> {
    const { confirmed_value, measure_id } = params;

    const [row] = await query<returnTypes.TupdateConfirmStatusReturn>(
      `
      UPDATE measures
      SET measure_value=$1
      WHERE id=$2
      RETURNING *
    `,
      [confirmed_value.toString(), measure_id],
    );

    return row;
  }

  async listAll(params: paramsTypes.TlistAllParams): Promise<returnTypes.TlistAllReturn> {
    const { customer_code, measure_type } = params;

    const rows = await query<returnTypes.TgetOneReturn>(
      `
      SELECT *
      FROM measures
      WHERE customer_code=$1 ${measure_type && ', measure_type='}$2
      RETURNING *
    `,
      [customer_code, measure_type],
    );

    return rows;
  }

  async getOneById(params: paramsTypes.TgetOneByIdParams): Promise<returnTypes.TgetOneReturn> {
    const { measure_id } = params;

    const [row] = await query<returnTypes.TgetOneReturn>(
      `
      SELECT *
      FROM measures
      WHERE measure_id=$1
      RETURNING *
    `,
      [measure_id],
    );

    return row;
  }
}
