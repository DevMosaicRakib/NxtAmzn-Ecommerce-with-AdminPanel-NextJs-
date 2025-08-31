// import { Resend } from 'resend'
// import PurchaseReceiptEmail from './purchase-receipt'
// import { IOrder } from '@/lib/db/models/order.model'
// import AskReviewOrderItemsEmail from './ask-review-order-items'
// import { SENDER_EMAIL, SENDER_NAME } from '@/lib/constants'

// const resend = new Resend(process.env.RESEND_API_KEY as string)

// export const sendPurchaseReceipt = async ({ order }: { order: IOrder }) => {
//   await resend.emails.send({
//     from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
//     to: (order.user as { email: string }).email,
//     subject: 'Order Confirmation',
//     react: <PurchaseReceiptEmail order={order} />,
//   })
// }

// export const sendAskReviewOrderItems = async ({ order }: { order: IOrder }) => {
//   const oneDayFromNow = new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString()

//   await resend.emails.send({
//     from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
//     to: (order.user as { email: string }).email,
//     subject: 'Review your order items',
//     react: <AskReviewOrderItemsEmail order={order} />,
//     scheduledAt: oneDayFromNow,
//   })
// }
import { Resend } from 'resend'
import PurchaseReceiptEmail from './purchase-receipt'
import { IOrder } from '@/lib/db/models/order.model'
import AskReviewOrderItemsEmail from './ask-review-order-items'
import { SENDER_EMAIL, SENDER_NAME } from '@/lib/constants'

// Env থেকে API Key আনলাম
const resendApiKey = process.env.RESEND_API_KEY || " "

// Key থাকলে Resend instance বানাবো, না থাকলে null
const resend = resendApiKey ? new Resend(resendApiKey) : null

export const sendPurchaseReceipt = async ({ order }: { order: IOrder }) => {
  if (!resend) {
    console.warn('⚠️ RESEND_API_KEY নেই, তাই ইমেইল পাঠানো হবে না।')
    return
  }

  await resend.emails.send({
    from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
    to: (order.user as { email: string }).email,
    subject: 'Order Confirmation',
    react: <PurchaseReceiptEmail order={order} />,
  })
}

export const sendAskReviewOrderItems = async ({ order }: { order: IOrder }) => {
  if (!resend) {
    console.warn('⚠️ RESEND_API_KEY নেই, তাই ইমেইল পাঠানো হবে না।')
    return
  }

  const oneDayFromNow = new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString()

  await resend.emails.send({
    from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
    to: (order.user as { email: string }).email,
    subject: 'Review your order items',
    react: <AskReviewOrderItemsEmail order={order} />,
    scheduledAt: oneDayFromNow,
  })
}
