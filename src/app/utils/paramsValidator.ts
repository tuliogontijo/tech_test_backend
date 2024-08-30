import { Response } from 'express';

import { ERR_CODE } from '../constants';

export const isCreateParamsValid = (values: Record<string, string>, res: Response): boolean => {
  const { image, customer_code, measure_datetime, measure_type } = values;

  if (!image || !isBase64(image)) {
    res.status(400).json({
      error_code: ERR_CODE.INVALID_DATA,
      error_description: 'O valor de image é inválido ou nulo',
    });
    return false;
  }

  if (!customer_code || typeof customer_code !== 'string') {
    res.status(400).json({
      error_code: ERR_CODE.INVALID_DATA,
      error_description: 'O valor de customer_code é inválido ou nulo',
    });
    return false;
  }

  if (!measure_datetime) {
    res.status(400).json({
      error_code: ERR_CODE.INVALID_DATA,
      error_description: 'O valor de measure_datetime é inválido ou nulo',
    });
    return false;
  }

  if (!measure_type || !['WATER', 'GAS'].includes(measure_type.toUpperCase())) {
    res.status(400).json({
      error_code: ERR_CODE.INVALID_DATA,
      error_description: 'O valor de measure_type é inválido ou nulo',
    });
    return false;
  }
  return true;
};

export const isConfirmParamsValid = (values: Record<string, string>, res: Response): boolean => {
  const { measure_uuid, confirmed_value } = values;

  if (!measure_uuid) {
    res.status(400).json({
      error_code: ERR_CODE.INVALID_DATA,
      error_description: 'O valor de measure_uuid é inválido ou nulo',
    });
    return false;
  }

  if (!confirmed_value || !/^\d+$/.test(confirmed_value)) {
    res.status(400).json({
      error_code: ERR_CODE.INVALID_DATA,
      error_description: 'O valor de confirmed_value é inválido ou nulo',
    });
    return false;
  }
  return true;
};

const isBase64 = (str: string): boolean => {
  try {
    return btoa(atob(str)) == str;
  } catch {
    return false;
  }
};
