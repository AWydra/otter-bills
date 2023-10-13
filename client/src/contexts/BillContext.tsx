import React, { ReactNode, useState } from 'react';
import { ImageListType } from 'react-images-uploading';
import { ShopOptionIterface, PayersInterface } from 'interfaces';

interface ReceiptSplitInterface {
  id: number;
  splitsReceipt: boolean;
}

interface BillContextInterface {
  shop: ShopOptionIterface;
  setShop: (shop: ShopOptionIterface) => void;
  amount: string;
  setAmount: (amonut: string) => void;
  date: Date | number | string;
  setDate: (date: Date | number | string) => void;
  description: string;
  setDescription: (description: string) => void;
  images: ImageListType;
  setImages: (images: ImageListType) => void;
  payers: PayersInterface[];
  setPayers: (payers: PayersInterface[]) => void;
  splitReceipt: (splits: ReceiptSplitInterface) => void;
}

const contextError = () => {
  throw Error('Unset context');
};

const defaultValues: BillContextInterface = {
  shop: {
    name: '',
    id: null,
  },
  setShop: contextError,
  amount: '',
  setAmount: contextError,
  date: new Date().toString(),
  setDate: contextError,
  description: '',
  setDescription: contextError,
  images: [],
  setImages: contextError,
  payers: [],
  setPayers: contextError,
  splitReceipt: contextError,
};

export const BillContext = React.createContext<BillContextInterface>(defaultValues);

export const useBillContext = () => React.useContext(BillContext);

interface Props {
  children: ReactNode;
}

export const BillContextProvider = ({ children }: Props) => {
  const [shop, setShop] = useState<ShopOptionIterface>(defaultValues.shop);
  const [amount, setAmount] = useState<string>(defaultValues.amount);
  const [date, setDate] = useState<Date | number | string>(defaultValues.date);
  const [description, setDescription] = useState<string>(defaultValues.description);
  const [images, setImages] = useState<ImageListType>(defaultValues.images);
  const [payers, setPayers] = useState<PayersInterface[]>(defaultValues.payers);

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
};
