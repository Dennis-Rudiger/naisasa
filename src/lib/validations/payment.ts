import { z } from 'zod'

export const paymentSchema = z.object({
  cardNumber: z.string()
    .regex(/^[0-9]{16}$/, 'Card number must be 16 digits'),
  expiryDate: z.string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Expiry date must be in MM/YY format')
    .refine((val) => {
      const [month, year] = val.split('/')
      const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1)
      return expiry > new Date()
    }, 'Card has expired'),
  cvc: z.string()
    .regex(/^[0-9]{3,4}$/, 'CVC must be 3 or 4 digits')
})

export type PaymentFormData = z.infer<typeof paymentSchema>
