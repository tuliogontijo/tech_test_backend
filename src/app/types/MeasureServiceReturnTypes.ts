export type TcreateServiceReturn = {
  image_url: string;
  measure_value: number;
  measure_uuid: string;
};

export type TconfirmServiceReturn = {
  success: boolean;
};

type Tmeasure = {
  measure_uuid: string;
  measure_datetime: Date;
  measure_type: string;
  has_confirmed: boolean;
  image_url: string;
};

export type TgetAllServiceReturn = {
  customer_code: string;
  measures: Tmeasure[];
};

export type TgetOneReturn = {
  id: string;
  measure_uuid: string;
  measure_datetime: Date;
  measure_type: string;
  has_confirmed: boolean;
  image_url: string;
  created_at: string;
};
