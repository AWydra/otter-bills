/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-duplicate-props */
import React, { ReactElement } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { Autocomplete, TextField, createFilterOptions } from '@mui/material';
import { ShopOptionIterface } from 'interfaces';

interface Props {
  value: ShopOptionIterface | null;
  onChange: UseFormSetValue<any>;
  inputProps?: {
    error: boolean;
    helperText: string;
  };
}

const stores: readonly ShopOptionIterface[] = [
  { name: 'Biedronka', id: 1 },
  { name: 'Lidl', id: 2 },
  { name: 'Netto', id: 3 },
];

const filter = createFilterOptions<ShopOptionIterface>();

const ShopSelect = React.forwardRef(
  ({ value, onChange, inputProps, ...props }: Props, ref): ReactElement => {
    const setShop = (shop: ShopOptionIterface | null) =>
      onChange('shop', shop, { shouldValidate: true });
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
          } else if (newValue && newValue.inputValue) {
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

export default ShopSelect;
