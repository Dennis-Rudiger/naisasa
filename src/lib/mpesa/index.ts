import type { MPesaConfig, MPesaResponse, STKPushParams } from './types'

class MPesa {
  private config: MPesaConfig
  private baseUrl: string

  constructor(config: MPesaConfig) {
    this.config = config
    this.baseUrl = process.env.NODE_ENV === 'production'
      ? 'https://api.safaricom.com'
      : 'https://sandbox.safaricom.co.ke'
  }

  private async getAccessToken(): Promise<string> {
    const auth = Buffer.from(
      `${this.config.consumerKey}:${this.config.consumerSecret}`
    ).toString('base64')
    
    const response = await fetch(
      `${this.baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
      {
        method: 'GET',
        headers: { Authorization: `Basic ${auth}` },
      }
    )

    const data = await response.json()
    return data.access_token
  }

  async stkPush(params: STKPushParams): Promise<MPesaResponse> {
    try {
      const accessToken = await this.getAccessToken()
      const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3)
      const password = Buffer.from(
        `${this.config.shortCode}${this.config.passkey}${timestamp}`
      ).toString('base64')

      const response = await fetch(`${this.baseUrl}/mpesa/stkpush/v1/processrequest`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          BusinessShortCode: this.config.shortCode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: 'CustomerPayBillOnline',
          Amount: params.amount,
          PartyA: params.phone,
          PartyB: this.config.shortCode,
          PhoneNumber: params.phone,
          CallBackURL: `${this.config.callbackUrl}/api/mpesa/callback`,
          AccountReference: params.reference,
          TransactionDesc: 'Event Ticket Purchase',
        }),
      })

      const data = await response.json()

      if (data.ResponseCode === '0') {
        return {
          success: true,
          checkoutRequestId: data.CheckoutRequestID,
          merchantRequestId: data.MerchantRequestID,
        }
      }

      return {
        success: false,
        message: data.ResponseDescription || 'STK push failed'
      }
    } catch (error) {
      console.error('MPesa STK Push error:', error)
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Payment processing failed'
      }
    }
  }
}

export const mpesa = new MPesa({
  consumerKey: process.env.MPESA_CONSUMER_KEY!,
  consumerSecret: process.env.MPESA_CONSUMER_SECRET!,
  passkey: process.env.MPESA_PASSKEY!,
  shortCode: process.env.MPESA_SHORTCODE!,
  callbackUrl: process.env.NEXT_PUBLIC_APP_URL!,
})
