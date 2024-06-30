import type { IGetTransactionResponse, IParticipant, ITransactionDetails } from '@repo/types';
import sql from 'db';
import type { Response } from 'express';
import type { IRequest } from 'types/express';
import type { ICreateTransactionRequest } from 'types/transaction';
import { formatTransactionData } from 'utils/transaction';

export const getTransaction = async (req: IRequest, res: Response) => {
  const transactionId = req.params.id;

  const [details] = await sql<ITransactionDetails[] | undefined[]>`
    SELECT transactions.id, transactions.total_amount, transactions.purchase_date, stores.name as store_name, transactions.photo, transactions.description
    FROM transactions
    JOIN stores ON transactions.store_id = stores.id
    WHERE transactions.id = ${Number(transactionId)}
    AND (
      transactions.payer_id = ${req.userId} 
      OR transactions.id IN (
        SELECT transaction_id FROM transaction_participants WHERE participant_id = ${req.userId}
      )
    )`;

  if (!details?.id) {
    res.status(404).json({ message: 'Transakcja nie istnieje lub nie masz do niej dostępu' });
    return;
  }

  const participants = await sql<IParticipant[]>`
    SELECT users.id, users.name, users.surname, users.avatar, transaction_participants.own_amount, transaction_participants.splits_receipt, transaction_participants.total_amount
    FROM transaction_participants
    JOIN users ON transaction_participants.participant_id = users.id
    WHERE transaction_participants.transaction_id = ${Number(transactionId)}`;

  res.status(200).json({ details, participants } as IGetTransactionResponse);
};

export const createTransaction = async (req: ICreateTransactionRequest, res: Response) => {
  const data = req.body;
  const filename = req.file?.filename || null;

  const parsedData = formatTransactionData(data);

  const sumFromPayers = parsedData.payers.reduce((total, payer) => total + payer.totalAmount, 0);

  if (sumFromPayers > parsedData.amount) {
    res.status(400).json({ message: 'Suma kwot przekracza kwotę rachunku' });
    return;
  }

  try {
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
  } catch (error) {
    res.status(500).json({ message: 'Wystąpił błąd podczas dodawania transakcji' });
    return;
  }

  res.status(204).send();
};
