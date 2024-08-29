import {
  confirmServiceParams,
  createServiceParams,
  getAllServiceParams,
} from '../types/MeasureServiceParamsTypes';

interface IMeasureService {
  createService(params: createServiceParams): void;
  confirmService(params: confirmServiceParams): void;
  getAllService(params: getAllServiceParams): void;
}
export default IMeasureService;
