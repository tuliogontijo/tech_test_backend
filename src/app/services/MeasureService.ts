import IMeasureService from '../interfaces/IMeasureService';
import * as paramsTypes from '../types/MeasureServiceParamsTypes';

export default class MeasureService implements IMeasureService {
  createService(params: paramsTypes.createServiceParams): void {
    console.log(params);
  }
  confirmService(params: paramsTypes.confirmServiceParams): void {
    console.log(params);
  }
  getAllService(params: paramsTypes.getAllServiceParams): void {
    console.log(params);
  }
}
