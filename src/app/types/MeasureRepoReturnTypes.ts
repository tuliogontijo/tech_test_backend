export type TinsertReturn = {
  measure_uuid: string;
};

export type TupdateConfirmStatusReturn = {
  success: boolean;
};

type Tmeasure = {
  measure_uuid: string;
  measure_datetime: Date;
  measure_type: string;
  has_confirmed: boolean;
  image_url: string;
};

export type TlistAllReturn = Tmeasure[];

export type TgetOneReturn = {
  id: string;
  measure_uuid: string;
  measure_datetime: Date;
  measure_type: string;
  has_confirmed: boolean;
  image_url: string;
  created_at: string;
};
