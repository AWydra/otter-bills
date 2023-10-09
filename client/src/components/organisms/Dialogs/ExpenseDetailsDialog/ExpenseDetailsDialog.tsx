import React, { useState, ReactElement, forwardRef, Ref, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import DetailItem from 'components/molecules/DetailItem/DetailItem';
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
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import StoreIcon from '@mui/icons-material/Store';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InfoIcon from '@mui/icons-material/Info';
import BillSplitList from 'components/molecules/BillSplitList/BillSplitList';
import { ExpenseDetailsResponseInterface } from 'interfaces';

const Transition = forwardRef(
  (
    props: TransitionProps & {
      children: ReactElement;
    },
    ref: Ref<unknown>,
  ) => <Slide direction="up" ref={ref} {...props} />,
);

const data = {
  id: 2,
  image: 'https://www.wykop.pl/cdn/c3201142/comment_IZgatIRmzImVcgne4k04732jU8JqNYvu.jpg',
  shop: 'Biedronka',
  amount: '53,92',
  date: '16.08.2022',
  additionalInfo:
    'Tutaj można coś wpisać konkretnego jak np. nazwę sprzętu, dzięki czemu paragon się nie zgubi',
  payers: [
    {
      id: 1,
      name: 'Kyle Hicks',
      avatar: 'https://i.pravatar.cc/300?img=1',
      amount: '12,53',
    },
    {
      id: 2,
      name: 'Michael Williams',
      avatar: 'https://i.pravatar.cc/300?img=2',
      amount: '43',
    },
    {
      id: 3,
      name: 'Jacqueline Payne',
      avatar: 'https://i.pravatar.cc/300?img=3',
      amount: '73,3',
    },
  ],
} as ExpenseDetailsResponseInterface;

const ExpenseDetailsDialog = () => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setOpen(!!id);
  }, [id]);

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <ButtonBase
          onClick={() => setModalOpen(true)}
          style={{
            backgroundImage: `url("${data.image}")`,
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
            <DetailItem icon={<StoreIcon />} title="Sklep" content={data.shop} />
            <DetailItem
              icon={<AccountBalanceWalletIcon />}
              title="Kwota"
              content={`${data.amount} PLN`}
            />
            <DetailItem icon={<CalendarMonthIcon />} title="Data" content={data.date} />
            <DetailItem
              icon={<InfoIcon />}
              title="Dodatkowe informacje"
              content={data.additionalInfo}
              block
            />
          </Stack>
        </Box>
        <BillSplitList payers={data.payers} />
      </Dialog>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
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
        BackdropProps={{
          sx: {
            backgroundColor: 'rgba(0,0,0,0.85)',
          },
        }}
      >
        <Box>
          <IconButton
            aria-label="delete"
            sx={{ position: 'absolute', top: 20, right: 20, color: 'white' }}
            onClick={() => setModalOpen(false)}
          >
            <CloseIcon />
          </IconButton>
          <Box
            component="img"
            src={data.image}
            alt="Receipt"
            sx={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}
          />
        </Box>
      </Modal>
    </>
  );
};

export default ExpenseDetailsDialog;
