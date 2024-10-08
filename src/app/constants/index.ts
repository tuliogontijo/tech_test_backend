export enum ERR_CODE {
  INVALID_DATA = 'INVALID_DATA',
  DOUBLE_REPORT = 'DOUBLE_REPORT',
  MEASURE_NOT_FOUND = 'MEASURE_NOT_FOUND',
  MEASURES_NOT_FOUND = 'MEASURES_NOT_FOUND',
  CONFIRM_DUPLICATE = 'CONFIRMATION_DUPLICATE',
  INVALID_TYPE = 'INVALID_TYPE',
}

export enum ERR_DESC {
  MONTH_MEASURE_ALREADY_DONE = 'Leitura do mês já realizada.',
  MEASURE_TYPE_NOT_ALLOWED = 'Tipo de medição não permitida',
  EMPTY_LIST = 'Nenhuma leitura encontrada',
}
