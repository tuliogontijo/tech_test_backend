import { Tmeasure_type } from './MeasureType';

export type TinsertParams = {
  measure_value: string;
  measure_datetime: string;
  measure_type: Tmeasure_type;
  customer_code: string;
  image_url: string;
};

export type TupdateConfirmStatusParams = {
  measure_uuid: string;
  confirmed_value: number;
};

export type TlistAllParams = {
  customer_code: string;
  measure_type: Tmeasure_type;
};

export type TgetOneByIdParams = {
  measure_uuid: string;
};

export type TgetOneByCostumerIDMonthAndTypeParams = {
  customer_code: string;
  measure_month: number;
  measure_type: Tmeasure_type;
};
