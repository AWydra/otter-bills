import sql from 'db';
import type { Response } from 'express';
import type { ICreatePaymentRequest } from 'types/payments';

export const createPayment = async (req: ICreatePaymentRequest, res: Response) => {
  const { payeeId, paymentMethod, amount } = req.body;

  try {
    await sql`INSERT INTO payments (payer_id, payee_id, amount, payment_method) VALUES (${req.userId}, ${payeeId}, ${amount}, ${paymentMethod})`;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Wystąpił błąd podczas realizacji płatności' });
  }

  return res.status(200).json({ message: 'Płatność została zrealizowana' });
};
