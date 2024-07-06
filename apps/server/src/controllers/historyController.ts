import sql from 'db';
import type { Response } from 'express';
import type { IRequest } from 'types/express';

export const getLatestHistory = async (req: IRequest, res: Response) => {
  const history = await sql`
  WITH user_transactions AS (
    SELECT 
      t.id,
      json_build_object(
        'name', u.name,
        'surname', u.surname,
        'avatar', u.avatar
      ) AS payer,
      NULL::json AS payee,
      t.total_amount AS amount,
      NULL::text AS payment_method,
      NULL::boolean AS is_confirmed,
      t.created_at,
      'transaction' AS type,
      COALESCE(
        json_agg(
          json_build_object(
            'name', u2.name,
            'surname', u2.surname,
            'avatar', u2.avatar
          )
        ) FILTER (WHERE u2.id IS NOT NULL), '[]'::json
      ) AS participants
    FROM 
      transactions t
    LEFT JOIN 
      transaction_participants tp ON t.id = tp.transaction_id
    LEFT JOIN 
      users u ON t.payer_id = u.id
    LEFT JOIN 
      users u2 ON tp.participant_id = u2.id
    WHERE
      t.payer_id = ${req.userId} OR t.id IN (SELECT transaction_id FROM transaction_participants WHERE participant_id = ${req.userId})
    GROUP BY
      t.id, u.name, u.surname, u.avatar, t.total_amount, t.created_at
  ),
  user_payments AS (
    SELECT 
      p.id,
      json_build_object(
        'name', up.name,
        'surname', up.surname,
        'avatar', up.avatar
      ) AS payer,
      json_build_object(
        'name', ur.name,
        'surname', ur.surname,
        'avatar', ur.avatar
      ) AS payee,
      p.amount,
      p.payment_method,
      p.is_confirmed,
      p.created_at,
      'payment' AS type,
      NULL::json AS participants  -- No participants for payments
    FROM 
      payments p
    LEFT JOIN 
      users up ON p.payer_id = up.id
    LEFT JOIN 
      users ur ON p.payee_id = ur.id
    WHERE 
      p.payer_id = ${req.userId} OR p.payee_id = ${req.userId}
  )
  SELECT * FROM user_transactions
  UNION ALL
  SELECT * FROM user_payments
  ORDER BY created_at DESC
  LIMIT 4
`;

  res.status(200).json({ items: history });
};
