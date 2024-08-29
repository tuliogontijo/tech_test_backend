import { Tmeasure_type } from './MeasureType';

export type TcreateServiceParams = {
  image: string;
  customer_code: string;
  measure_datetime: string;
  measure_type: Tmeasure_type;
};

export type TconfirmServiceParams = {
  measure_id: string;
  confirmed_value: number;
};

export type TgetAllServiceParams = {
  customer_code: string;
  measure_type: Tmeasure_type;
};

export type TgetOneParams = {
  measure_id?: string;
  customer_code?: string;
  measure_month?: string;
  measure_type?: Tmeasure_type;
};
