import type { ReactNode } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ImageListType } from 'react-images-uploading';
import dayjs from 'dayjs';
import type { IShopOption } from 'interfaces';
import useAuthContext from 'hooks/useAuthContext';
import type { ICreateBillRequestData, IPayer } from '@repo/types';

interface IReceiptSplit {
  id: number;
  splitsReceipt: boolean;
}

interface IBillContext {
  shop: IShopOption;
  setShop: (shop: IShopOption) => void;
  amount: string;
  setAmount: (amonut: string) => void;
  date: string;
  setDate: (date: string) => void;
  description: string;
  setDescription: (description: string) => void;
  images: ImageListType;
  setImages: (images: ImageListType) => void;
  payers: IPayer[];
  setPayers: (payers: IPayer[]) => void;
  splitReceipt: (splits: IReceiptSplit) => void;
  generateBillData: () => ICreateBillRequestData;
}

const contextError = () => {
  throw Error('Unset context');
};

const defaultValues: IBillContext = {
  shop: {
    name: '',
    id: -1,
  },
  setShop: contextError,
  amount: '',
  setAmount: contextError,
  date: dayjs().toISOString(),
  setDate: contextError,
  description: '',
  setDescription: contextError,
  images: [],
  setImages: contextError,
  payers: [],
  setPayers: contextError,
  splitReceipt: contextError,
  generateBillData: contextError,
};

export const BillContext = createContext<IBillContext>(defaultValues);

export const useBillContext = () => useContext(BillContext);

interface IProps {
  children: ReactNode;
}

export function BillContextProvider({ children }: IProps) {
  const [shop, setShop] = useState<IShopOption>(defaultValues.shop);
  const [amount, setAmount] = useState<string>(defaultValues.amount);
  const [date, setDate] = useState<string>(defaultValues.date);
  const [description, setDescription] = useState<string>(defaultValues.description);
  const [images, setImages] = useState<ImageListType>(defaultValues.images);
  const [payers, setPayers] = useState<IPayer[]>(defaultValues.payers);

  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) return;

    const currentUser: IPayer = {
      id: user.id,
      name: `${user.name} ${user.surname}`,
      avatar: '',
      amount: '',
      splitsReceipt: false,
    };

    setPayers([currentUser]);
  }, [user]);

  const generateBillData = (): ICreateBillRequestData => ({
    shop,
    amount,
    date,
    description,
    image: images[0] as File,
    payers,
  });

  return (
    <BillContext.Provider
      value={{
        shop,
        setShop,
        amount,
        setAmount,
        date,
        setDate,
        description,
        setDescription,
        images,
        setImages,
        payers,
        setPayers,
        splitReceipt: ({ id, splitsReceipt }) => {
          const modifiedPayers = payers.map((payer) => {
            if (payer.id === id) {
              return { ...payer, splitsReceipt };
            }
            return payer;
          });
          setPayers(modifiedPayers);
        },
        generateBillData,
      }}
    >
      {children}
    </BillContext.Provider>
  );
}
