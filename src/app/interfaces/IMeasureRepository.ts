import * as paramsTypes from '../types/MeasureRepoParamsTypes';
import * as returnTypes from '../types/MeasureRepoReturnTypes';

interface IMeasureRespository {
  insert(params: paramsTypes.TinsertParams): Promise<returnTypes.TinsertReturn>;

  updateConfirmStatus(
    params: paramsTypes.TupdateConfirmStatusParams,
  ): Promise<returnTypes.TupdateConfirmStatusReturn>;

  listAll(params: paramsTypes.TlistAllParams): Promise<returnTypes.TlistAllReturn>;

  getOneById(params: paramsTypes.TgetOneByIdParams): Promise<returnTypes.TgetOneReturn>;

  getOneByCostumerIDMonthAndType(
    params: paramsTypes.TgetOneByCostumerIDMonthAndTypeParams,
  ): Promise<returnTypes.TgetOneReturn>;
}

export default IMeasureRespository;
