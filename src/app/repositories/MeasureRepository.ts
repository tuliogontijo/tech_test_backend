import IMeasureRepository from '../interfaces/IMeasureRepository';
import * as paramsTypes from '../types/MeasureRepoParamsTypes';
import * as returnTypes from '../types/MeasureRepoReturnTypes';

import { query } from '../../database';

export default class MeasureRepository implements IMeasureRepository {
  async insert(params: paramsTypes.TinsertParams): Promise<returnTypes.TinsertReturn> {
    const { measure_value, measure_datetime, measure_type, customer_code, image_url } = params;

    const [row] = await query<returnTypes.TinsertReturn>(
      `
      INSERT INTO measures(measure_value, measure_datetime, measure_type, customer_code, image_url)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *
    `,
      [measure_value, measure_datetime, measure_type, customer_code, image_url],
    );

    return row;
  }

  async getOneByCostumerIDMonthAndType(params: paramsTypes.TgetOneByCostumerIDMonthAndTypeParams): Promise<returnTypes.TgetOneReturn> {
    const { customer_code, measure_month, measure_type } = params;

    const [row] = await query<returnTypes.TgetOneReturn>(
      `
      SELECT *
      FROM measures
      WHERE customer_code=$1 AND EXTRACT(MONTH FROM measure_datetime)=$2 AND measure_type=$3
    `,
      [customer_code, measure_month.toString(), measure_type],
    );

    return row;
  }

  async updateConfirmStatus(params: paramsTypes.TupdateConfirmStatusParams): Promise<returnTypes.TupdateConfirmStatusReturn> {
    const { confirmed_value, measure_uuid } = params;

    const [row] = await query<returnTypes.TupdateConfirmStatusReturn>(
      `
      UPDATE measures
      SET measure_value=$1, has_confirmed=true
      WHERE id=$2
      RETURNING *
    `,
      [confirmed_value.toString(), measure_uuid],
    );

    return row;
  }

  async listAll(params: paramsTypes.TlistAllParams): Promise<returnTypes.TlistAllReturn> {
    const { customer_code, measure_type } = params;

    const rows = await query<returnTypes.TgetOneReturn>(
      `
      SELECT *
      FROM measures
      WHERE customer_code=$1 ${measure_type && 'AND measure_type = $2'}
    `,
      measure_type ? [customer_code, measure_type] : [customer_code],
    );

    return rows;
  }

  async getOneById(params: paramsTypes.TgetOneByIdParams): Promise<returnTypes.TgetOneReturn> {
    const { measure_uuid } = params;

    const [row] = await query<returnTypes.TgetOneReturn>(
      `
      SELECT *
      FROM measures
      WHERE id=$1
    `,
      [measure_uuid],
    );

    return row;
  }
}
