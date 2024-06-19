import type { ReactNode } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ImageListType } from 'react-images-uploading';
import dayjs from 'dayjs';
import type { IShopOption, IPayers } from 'interfaces';
import useAuthContext from 'hooks/useAuthContext';

interface IReceiptSplit {
  id: string;
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
  payers: IPayers[];
  setPayers: (payers: IPayers[]) => void;
  splitReceipt: (splits: IReceiptSplit) => void;
}

const contextError = () => {
  throw Error('Unset context');
};

const defaultValues: IBillContext = {
  shop: {
    name: '',
    id: null,
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
  const [payers, setPayers] = useState<IPayers[]>(defaultValues.payers);

  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) return;

    const currentUser: IPayers = {
      id: user.id,
      name: `${user.name} ${user.surname}`,
      avatar: '',
      amount: '',
      splitsReceipt: false,
    };

    setPayers([currentUser]);
  }, [user]);

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
      }}
    >
      {children}
    </BillContext.Provider>
  );
}
