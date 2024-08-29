type Tmeasure_type = 'WATER' | 'GAS' | null;

export type createServiceParams = {
  image: string;
  customer_code: string;
  measure_datetime: string;
  measure_type: Tmeasure_type;
};

export type confirmServiceParams = {
  measure_id: string;
  confirmed_value: number;
};

export type getAllServiceParams = {
  customer_code: string;
  measure_type: Tmeasure_type;
};
