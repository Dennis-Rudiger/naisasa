export interface MPesaConfig {
  consumerKey: string;
  consumerSecret: string;
  passkey: string;
  shortCode: string;
  callbackUrl: string;
}

export interface STKPushParams {
  amount: number;
  phone: string;
  reference: string;
}

export interface MPesaResponse {
  success: boolean;
  checkoutRequestId?: string;
  merchantRequestId?: string;
  message?: string;
}
