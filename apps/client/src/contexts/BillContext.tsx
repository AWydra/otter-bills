import type { ReactNode } from "react";
import React, { useState } from "react";
import type { ImageListType } from "react-images-uploading";
import type { ShopOptionIterface, PayersInterface } from "interfaces";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

interface ReceiptSplitInterface {
  id: number;
  splitsReceipt: boolean;
}

interface BillContextInterface {
  shop: ShopOptionIterface;
  setShop: (shop: ShopOptionIterface) => void;
  amount: string;
  setAmount: (amonut: string) => void;
  date: string;
  setDate: (date: string) => void;
  description: string;
  setDescription: (description: string) => void;
  images: ImageListType;
  setImages: (images: ImageListType) => void;
  payers: PayersInterface[];
  setPayers: (payers: PayersInterface[]) => void;
  splitReceipt: (splits: ReceiptSplitInterface) => void;
}

const contextError = () => {
  throw Error("Unset context");
};

const defaultValues: BillContextInterface = {
  shop: {
    name: "",
    id: null,
  },
  setShop: contextError,
  amount: "",
  setAmount: contextError,
  date: dayjs().toISOString(),
  setDate: contextError,
  description: "",
  setDescription: contextError,
  images: [],
  setImages: contextError,
  payers: [],
  setPayers: contextError,
  splitReceipt: contextError,
};

export const BillContext =
  React.createContext<BillContextInterface>(defaultValues);

export const useBillContext = () => React.useContext(BillContext);

interface Props {
  children: ReactNode;
}

export function BillContextProvider({ children }: Props) {
  const [shop, setShop] = useState<ShopOptionIterface>(defaultValues.shop);
  const [amount, setAmount] = useState<string>(defaultValues.amount);
  const [date, setDate] = useState<string>(defaultValues.date);
  const [description, setDescription] = useState<string>(
    defaultValues.description
  );
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
}
