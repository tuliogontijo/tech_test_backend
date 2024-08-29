import * as paramsTypes from '../types/MeasureServiceParamsTypes';
import * as returnTypes from '../types/MeasureServiceReturnTypes';

interface IMeasureService {
  createService(params: paramsTypes.TcreateServiceParams): Promise<returnTypes.TcreateServiceReturn>;
  confirmService(params: paramsTypes.TconfirmServiceParams): Promise<returnTypes.TconfirmServiceReturn>;
  getAllService(params: paramsTypes.TgetAllServiceParams): Promise<returnTypes.TgetAllServiceReturn>;
  getOne(params: paramsTypes.TgetOneParams): Promise<returnTypes.TgetOneReturn>;
}

export default IMeasureService;
