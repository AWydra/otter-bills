/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ReactElement } from 'react';
import React, { forwardRef } from 'react';
import type { UseFormSetValue } from 'react-hook-form';
import { Autocomplete, TextField, createFilterOptions } from '@mui/material';
import type { IShopOption } from 'interfaces';

interface IProps {
  value: IShopOption | null;
  onChange: UseFormSetValue<any>;
  inputProps?: {
    error: boolean;
    helperText: string;
  };
}

const stores: readonly IShopOption[] = [
  { name: 'Biedronka', id: '1' },
  { name: 'Lidl', id: '2' },
  { name: 'Netto', id: '3' },
];

const filter = createFilterOptions<IShopOption>();

const ShopSelect = forwardRef(
  ({ value, onChange, inputProps, ...props }: IProps, ref): ReactElement => {
    const setShop = (shop: IShopOption | null) => {
      onChange('shop', shop, { shouldValidate: true });
    };
    return (
      <Autocomplete
        ref={ref}
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setShop({
              name: newValue,
            });
          } else if (newValue === null) {
            setShop({
              name: '',
            });
          } else if (newValue.inputValue) {
            setShop({
              name: newValue.inputValue,
            });
          } else {
            setShop(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some((option) => inputValue === option.name);
          if (inputValue !== '' && !isExisting) {
            filtered.push({
              inputValue,
              name: `Dodaj "${inputValue}"`,
            });
          }

          return filtered;
        }}
        blurOnSelect
        clearOnBlur
        options={stores}
        getOptionLabel={(option) => {
          if (typeof option === 'string') {
            return option;
          }

          if (option.inputValue) {
            return option.inputValue;
          }

          return option.name;
        }}
        renderOption={(listProps, option) => <li {...listProps}>{option.name}</li>}
        sx={{ width: '100%' }}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            {...inputProps}
            label="Wybierz sklep"
            placeholder="Wybierz z listy lub dodaj nowy"
          />
        )}
        {...props}
      />
    );
  },
);

ShopSelect.displayName = 'ShopSelect';

export default ShopSelect;
