/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-new-func */
import React, { ReactElement, useState, useEffect, useRef } from 'react';

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from '@mui/material';

interface Props {
  open: boolean;
  onClose: () => void;
  setValue: (...event: any[]) => void;
}

const ExpenseDialog = ({ open, onClose, setValue }: Props): ReactElement => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [displayValue, setDisplayValue] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [inputRef.current]);

  useEffect(() => {
    if (!inputValue) {
      setDisplayValue('');
      setError(false);
      return;
    }
    try {
      const formattedValue = inputValue.replaceAll(',', '.').replaceAll(/\s/g, '');
      const countFunction = Function(`return ${formattedValue}`);
      const formattedNumber = (Math.round(countFunction() * 100) / 100)
        .toFixed(2)
        .replace('.', ',');
      if (formattedNumber.length > 8) {
        setError(true);
        setDisplayValue('Za duża wartość');
        return;
      }
      setDisplayValue(formattedNumber);
      setError(false);
    } catch {
      setError(true);
      setDisplayValue('Niepoprawna wartość');
    }
  }, [inputValue]);

  const handleClose = () => {
    setValue(displayValue);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Wprowadź kwotę</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Możesz po prostu wpisać kwotę lub użyć wzoru matematycznego
        </DialogContentText>
        <TextField
          inputRef={inputRef}
          value={inputValue}
          margin="dense"
          id="name"
          type="email"
          label="Kwota"
          fullWidth
          variant="filled"
          onChange={(ev) => {
            const { value } = ev.target;
            const pattern = /^[0-9,. +\-*/]+$/;
            if (!pattern.test(value) && value) {
              return;
            }
            setInputValue(value);
          }}
          multiline
          error={!!error}
          helperText={`${displayValue} ${!inputValue || error ? '' : 'PLN'}`}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Anuluj</Button>
        {!error && <Button onClick={handleClose}>Dodaj</Button>}
      </DialogActions>
    </Dialog>
  );
};

export default ExpenseDialog;
