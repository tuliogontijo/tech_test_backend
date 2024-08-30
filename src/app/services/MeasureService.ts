import IMeasureService from '../interfaces/IMeasureService';
import * as paramsTypes from '../types/MeasureServiceParamsTypes';
import * as returnTypes from '../types/MeasureServiceReturnTypes';
import { Tmeasure_type } from '../types/MeasureType';

import { getAIMeasureValueFromImage } from '../utils/geminiHandler';
import { saveAndGetImgURL } from '../utils/imageHandler';

import MeasureRespositoryIntance from '../factories/MeasureRepositoryFactory';

export default class MeasureService implements IMeasureService {
  async createService(
    params: paramsTypes.TcreateServiceParams,
  ): Promise<returnTypes.TcreateServiceReturn> {
    const { image, customer_code, measure_datetime, measure_type, req } = params;

    const { image_url, path } = saveAndGetImgURL(image, customer_code, req);

    const measure_value = await getAIMeasureValueFromImage(path);

    const { measure_uuid } = await MeasureRespositoryIntance.insert({
      customer_code,
      image_url,
      measure_datetime,
      measure_type,
      measure_value,
    });

    return { image_url, measure_uuid, measure_value: Number(measure_value) };
  }

  async getOne(params: paramsTypes.TgetOneParams): Promise<returnTypes.TgetOneReturn> {
    if (Object.keys(params).includes('measure_uuid')) {
      const { measure_uuid } = params;
      const measure = await MeasureRespositoryIntance.getOneById({
        measure_uuid: measure_uuid as string,
      });
      return measure;
    }

    const { customer_code, measure_month, measure_type } = params;

    const measure = await MeasureRespositoryIntance.getOneByCostumerIDMonthAndType({
      customer_code: customer_code as string,
      measure_month: measure_month as number,
      measure_type: measure_type as Tmeasure_type,
    });

    return measure;
  }

  async confirmService(
    params: paramsTypes.TconfirmServiceParams,
  ): Promise<returnTypes.TconfirmServiceReturn> {
    const { confirmed_value, measure_uuid } = params;

    const measure = await MeasureRespositoryIntance.updateConfirmStatus({
      confirmed_value,
      measure_uuid,
    });

    return measure;
  }
  async getAllService(
    params: paramsTypes.TgetAllServiceParams,
  ): Promise<returnTypes.TgetAllServiceReturn> {
    const { customer_code, measure_type } = params;

    const measures = await MeasureRespositoryIntance.listAll({
      customer_code,
      measure_type,
    });

    return {
      customer_code,
      measures,
    };
  }
}
