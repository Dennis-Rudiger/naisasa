import { PaymentFormData } from './validations/payment'

export class PaymentError extends Error {
  constructor(message: string, public code: string) {
    super(message)
    this.name = 'PaymentError'
  }
}

export async function processPayment(
  paymentDetails: PaymentFormData,
  amount: number
): Promise<{ success: boolean; transactionId: string }> {
  // Simulate payment processing
  await new Promise(resolve => setTimeout(resolve, 2000))

  // Simulate different scenarios
  if (amount <= 0) {
    throw new PaymentError('Invalid payment amount', 'INVALID_AMOUNT')
  }

  if (paymentDetails.cardNumber === '4111111111111111') {
    throw new PaymentError('Card declined', 'CARD_DECLINED')
  }

  // Success case
  return {
    success: true,
    transactionId: `TX_${Math.random().toString(36).slice(2)}`
  }
}
