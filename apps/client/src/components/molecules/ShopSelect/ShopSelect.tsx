/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ReactElement } from 'react';
import React, { forwardRef, useEffect, useState } from 'react';
import type { UseFormSetValue } from 'react-hook-form';
import { Autocomplete, CircularProgress, TextField, createFilterOptions } from '@mui/material';
import type { IShopOption } from 'interfaces';
import { useStoreServices } from 'services/useStoreServices';

interface IProps {
  value: IShopOption | null;
  onChange: UseFormSetValue<any>;
  inputProps?: {
    error: boolean;
    helperText: string;
  };
}

const filter = createFilterOptions<IShopOption>();

const ShopSelect = forwardRef(
  ({ value, onChange, inputProps, ...props }: IProps, ref): ReactElement => {
    const setShop = (shop: IShopOption | null) => {
      onChange('shop', shop, { shouldValidate: true });
    };
    const { getStores, loading } = useStoreServices();
    const [shops, setShops] = useState<IShopOption[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        const response = await getStores();
        const { stores } = response.data;
        setShops(stores);
      };

      fetchData();
    }, []);

    return (
      <Autocomplete
        ref={ref}
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setShop({
              id: -1,
              name: newValue,
            });
          } else if (newValue === null) {
            setShop({
              id: -1,
              name: '',
            });
          } else if (newValue.inputValue) {
            setShop({
              id: -1,
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
              id: -1,
              name: `Dodaj "${inputValue}"`,
            });
          }

          return filtered;
        }}
        blurOnSelect
        clearOnBlur
        options={shops}
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
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        disabled={loading}
        {...props}
      />
    );
  },
);

ShopSelect.displayName = 'ShopSelect';

export default ShopSelect;
