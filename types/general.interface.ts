export interface GeneralFormState {
  freeFixed: number;
  freeFloat: number;
  riskScore: number;
  defaultAmount: number;
  defaultFromCurrency: string;
  defaultToCurrency: string;
  platformGate: boolean;
}

export interface FeeSettingsItem {
  id: number;
  fee_type: string;
  fixed_fee: number;
  float_fee: number;
}

export interface ConstantNumeric {
  key: string;
  value: number;
}

export interface ConstantJson {
  key: string;
  value: any;
}

export interface AMLThreshold {
  value: number;
}

export interface NetworkGateResponse {
  status: string;
  gate_enabled: boolean;
}