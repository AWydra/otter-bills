import sql from 'db';
import type { Response } from 'express';
import type { ICreateTransactionRequest } from 'types/transaction';
import { formatTransactionData } from 'utils/transaction';

export const createTransaction = async (req: ICreateTransactionRequest, res: Response) => {
  const data = req.body;
  const filename = req.file?.filename || null;

  const parsedData = formatTransactionData(data);

  const sumFromPayers = parsedData.payers.reduce((total, payer) => total + payer.totalAmount, 0);

  if (sumFromPayers > parsedData.amount) {
    res.status(400).json({ message: 'Suma kwot przekracza kwotę rachunku' });
    return;
  }

  // Add transaction to the database
  const [{ id }] = await sql<[{ id: number }]>`
      INSERT INTO transactions (payer_id, store_id, total_amount, purchase_date, photo, description)
      VALUES (${req.userId}, ${parsedData.shop.id}, ${parsedData.amount}, ${parsedData.date}, ${filename}, ${parsedData.description})
      RETURNING id`;

  // Add transaction participants to the database
  parsedData.payers.forEach(async (payer) => {
    await sql`
      INSERT INTO transaction_participants (transaction_id, participant_id, own_amount, splits_receipt, total_amount)
      VALUES (${id}, ${payer.id}, ${payer.amount}, ${payer.splitsReceipt} , ${payer.totalAmount})`;
  });

  res.status(200).json({ data: parsedData, filename, sumFromPayers });
};
