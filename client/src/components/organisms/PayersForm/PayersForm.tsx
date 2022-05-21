import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from 'hooks';
import { setPayers } from 'slices/billSlice';
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Checkbox,
  Avatar,
  Paper,
} from '@mui/material';
import { PayersInterface } from 'interfaces';
import { RouteEnum } from 'enums';

const data: PayersInterface[] = [
  {
    id: 1,
    name: 'Kyle Hicks',
    avatar: 'https://i.pravatar.cc/300?img=1',
  },
  {
    id: 2,
    name: 'Michael Williams',
    avatar: 'https://i.pravatar.cc/300?img=2',
  },
  {
    id: 3,
    name: 'Jacqueline Payne',
    avatar: 'https://i.pravatar.cc/300?img=3',
  },
  {
    id: 4,
    name: 'Ronald Nelson',
    avatar: 'https://i.pravatar.cc/300?img=4',
  },
  {
    id: 5,
    name: 'Michael Watkins',
    avatar: 'https://i.pravatar.cc/300?img=5',
  },
  {
    id: 6,
    name: 'Kristie Rangel',
    avatar: 'https://i.pravatar.cc/300?img=6',
  },
  {
    id: 7,
    name: 'Stephanie Nelson',
    avatar: 'https://i.pravatar.cc/300?img=7',
  },
  {
    id: 8,
    name: 'Nicole Doyle',
    avatar: 'https://i.pravatar.cc/300?img=8',
  },
  {
    id: 9,
    name: 'Gerald Snyder',
    avatar: 'https://i.pravatar.cc/300?img=9',
  },
  {
    id: 10,
    name: 'Shane Weiss',
    avatar: 'https://i.pravatar.cc/300?img=10',
  },
  {
    id: 11,
    name: 'Nicole Doyle',
    avatar: 'https://i.pravatar.cc/300?img=11',
  },
  {
    id: 12,
    name: 'Gerald Snyder',
    avatar: 'https://i.pravatar.cc/300?img=12',
  },
  {
    id: 13,
    name: 'Shane Weiss',
    avatar: 'https://i.pravatar.cc/300?img=13',
  },
];

const PayersForm = (): ReactElement => {
  const { payers } = useAppSelector((state) => state.bill);
  const [checked, setChecked] = React.useState<PayersInterface[]>(payers);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleToggle = (payer: PayersInterface) => {
    const isInArray = checked.some((el: PayersInterface) => el.id === payer.id);

    if (isInArray) {
      setChecked((prevState) => prevState.filter((el) => el.id !== payer.id));
    } else {
      setChecked((prevState) => [...prevState, payer].sort((a, b) => a.id - b.id));
    }
  };

  const handlePayers = () => {
    dispatch(setPayers(checked));
    navigate(`${RouteEnum.ADD_RECEIPT}/3`);
  };

  return (
    <Box sx={{ width: '100%', px: 2, display: 'flex', flexDirection: 'column' }}>
      <List
        dense
        sx={{ width: '100%', bgcolor: 'background.paper', maxHeight: '50vh', overflowY: 'scroll' }}
        component={Paper}
        elevation={3}
        square
      >
        {data.map(({ id, avatar, name }) => {
          return (
            <ListItem
              key={id}
              onClick={() => handleToggle({ id, avatar, name })}
              secondaryAction={
                <Checkbox
                  edge="end"
                  inputProps={{ 'aria-labelledby': `${id}` }}
                  checked={checked.some((el) => el.id === id)}
                />
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar alt={name} src={avatar} />
                </ListItemAvatar>
                <ListItemText id={`${id}`} primary={name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Button sx={{ mt: 3 }} onClick={handlePayers} disabled={!checked.length} variant="contained">
        Dalej
      </Button>
    </Box>
  );
};

export default PayersForm;
