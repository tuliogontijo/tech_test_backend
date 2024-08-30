import { Tmeasure_type } from './MeasureType';

export type TcreateServiceParams = {
  image: string;
  customer_code: string;
  measure_datetime: string;
  measure_type: Tmeasure_type;
};

export type TconfirmServiceParams = {
  measure_uuid: string;
  confirmed_value: number;
};

export type TgetAllServiceParams = {
  customer_code: string;
  measure_type: Tmeasure_type;
};

export type TgetOneParams = {
  measure_uuid?: string;
  customer_code?: string;
  measure_month?: number;
  measure_type?: Tmeasure_type;
};
