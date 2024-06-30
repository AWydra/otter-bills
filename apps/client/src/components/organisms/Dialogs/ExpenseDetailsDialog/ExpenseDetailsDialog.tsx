import type { ReactElement, Ref } from 'react';
import React, { useState, forwardRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  AppBar,
  Box,
  ButtonBase,
  Dialog,
  Divider,
  IconButton,
  Modal,
  Slide,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import StoreIcon from '@mui/icons-material/Store';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InfoIcon from '@mui/icons-material/Info';
import BillSplitList from 'components/molecules/BillSplitList/BillSplitList';
import DetailItem from 'components/molecules/DetailItem/DetailItem';
import { useTransactionServices } from 'services/useTransactionServices';
import useToastContext from 'hooks/useToastContext';
import type { IGetTransactionResponse } from '@repo/types';
import dayjs from 'dayjs';

const Transition = forwardRef(
  (
    props: TransitionProps & {
      children: ReactElement;
    },
    ref: Ref<unknown>,
  ) => <Slide direction="up" ref={ref} {...props} />,
);

Transition.displayName = 'Transition';

function ExpenseDetailsDialog() {
  const [transaction, setTransaction] = useState<IGetTransactionResponse | null>(null);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const { loading, getTransaction } = useTransactionServices();
  const toast = useToastContext();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async (transactionId: string) => {
      try {
        const { data } = await getTransaction(transactionId);
        setTransaction(data);
      } catch {
        toast.error('Transakcja nie istnieje lub nie masz do niej dostępu');
        handleClose();
      }
    };

    const transactionId = searchParams.get('transactionId');
    setOpen(Boolean(transactionId));

    if (transactionId) {
      getData(transactionId);
    } else {
      // Reset transaction data when dialog is closed
      setTransaction(null);
    }
  }, [searchParams]);

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <ButtonBase
          onClick={() => {
            setModalOpen(true);
          }}
          style={{
            backgroundImage: `url("${import.meta.env.VITE_API_DOMAIN}/bills/${transaction?.details.photo}")`,
            height: 150,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />

        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Szczegóły
            </Typography>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            padding: (theme) => theme.spacing(2),
          }}
        >
          <Stack spacing={1} divider={<Divider />}>
            <DetailItem
              icon={<StoreIcon />}
              title="Sklep"
              content={transaction?.details.store_name}
              loading={loading}
            />
            <DetailItem
              icon={<AccountBalanceWalletIcon />}
              title="Kwota"
              content={`${transaction?.details.total_amount} PLN`}
              loading={loading}
            />
            <DetailItem
              icon={<CalendarMonthIcon />}
              title="Data"
              content={dayjs(transaction?.details.purchase_date).format('DD.MM.YYYY')}
              loading={loading}
            />
            <DetailItem
              icon={<InfoIcon />}
              title="Dodatkowe informacje"
              content={transaction?.details.description || 'Brak'}
              block
              loading={loading}
            />
          </Stack>
        </Box>
        <BillSplitList loading={loading} payers={transaction?.participants} />
      </Dialog>
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 2,
          py: 5,
        }}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: 'rgba(0,0,0,0.85)',
            },
          },
        }}
      >
        <Box>
          <IconButton
            aria-label="delete"
            sx={{ position: 'absolute', top: 20, right: 20, color: 'white' }}
            onClick={() => {
              setModalOpen(false);
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            component="img"
            src={`${import.meta.env.VITE_API_DOMAIN}/bills/${transaction?.details.photo}`}
            alt="Receipt"
            sx={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}
          />
        </Box>
      </Modal>
    </>
  );
}

export default ExpenseDetailsDialog;
