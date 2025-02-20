interface MPesaConfig {
  consumerKey: string;
  consumerSecret: string;
  passkey: string;
  shortCode: string;
  callbackUrl: string;
}

interface STKPushParams {
  phone: string;
  amount: number;
  reference: string;
}

class MPesa {
  private readonly consumerKey: string;
  private readonly consumerSecret: string;
  private readonly passKey: string;
  private readonly shortcode: string;
  private baseUrl: string;

  constructor() {
    this.consumerKey = process.env.MPESA_CONSUMER_KEY || '';
    this.consumerSecret = process.env.MPESA_CONSUMER_SECRET || '';
    this.passKey = process.env.MPESA_PASSKEY || '';
    this.shortcode = process.env.MPESA_SHORTCODE || '';
    this.baseUrl = process.env.NODE_ENV === 'production'
      ? 'https://api.safaricom.com'
      : 'https://sandbox.safaricom.co.ke';
  }

  private async getAccessToken(): Promise<string> {
    const auth = Buffer.from(`${this.consumerKey}:${this.consumerSecret}`).toString('base64');
    
    const response = await fetch(`${this.baseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    return data.access_token;
  }

  async stkPush({ phone, amount, reference }: STKPushParams) {
    try {
      const accessToken = await this.getAccessToken();
      const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
      const password = Buffer.from(
        `${this.shortcode}${this.passKey}${timestamp}`
      ).toString('base64');

      const response = await fetch(`${this.baseUrl}/mpesa/stkpush/v1/processrequest`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          BusinessShortCode: this.shortcode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: 'CustomerPayBillOnline',
          Amount: amount,
          PartyA: phone,
          PartyB: this.shortcode,
          PhoneNumber: phone,
          CallBackURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/mpesa/callback`,
          AccountReference: reference,
          TransactionDesc: 'Event Ticket Purchase',
        }),
      });

      const data = await response.json();

      if (data.ResponseCode === '0') {
        return {
          success: true,
          checkoutRequestId: data.CheckoutRequestID,
          merchantRequestId: data.MerchantRequestID,
        };
      }

      throw new Error(data.ResponseDescription || 'STK push failed');
    } catch (error) {
      console.error('MPesa STK Push error:', error);
      return {
        success: false,
        error: 'Payment initiation failed',
      };
    }
  }
}

export const mpesa = new MPesa();
