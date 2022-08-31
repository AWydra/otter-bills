import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HistoryList from 'components/organisms/HistoryList/HistoryList';
import ExpenseDetailsDialog from 'components/organisms/Dialogs/ExpenseDetailsDialog/ExpenseDetailsDialog';

const History = () => {
  // TODO implement filter options
  // const [shopIds, setShopIds] = useState<number | null>(null);
  // const [period, setPeriod] = useState<string | null>(null);
  // const [amount, setAmount] = useState<string | null>(null);
  // const [type, setType] = useState<OperationTypeEnum | null>(null);

  // useEffect(() => {
  //   console.log({ shopIds, period, amount, type });
  // }, [shopIds, period, amount, type]);

  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <Box
        sx={(theme) => ({
          width: '100vw',
          padding: theme.spacing(2),
          overflowX: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        })}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            width: 'fit-content',
          }}
        >
          <Button
            variant="outlined"
            size="small"
            endIcon={<ExpandMoreIcon />}
            sx={{
              width: '100%',
            }}
          >
            Sklep
          </Button>
          <Button
            variant="outlined"
            size="small"
            endIcon={<ExpandMoreIcon />}
            sx={{
              width: '100%',
            }}
          >
            Okres
          </Button>
          <Button
            variant="outlined"
            size="small"
            endIcon={<ExpandMoreIcon />}
            sx={{
              width: '100%',
            }}
          >
            Kwota
          </Button>
          <Button
            variant="outlined"
            size="small"
            endIcon={<ExpandMoreIcon />}
            sx={{
              width: '100%',
            }}
          >
            Typ
          </Button>
        </Stack>
      </Box>
      <Box
        sx={{
          height: 'calc(100vh - 56px - 69px - 56px)',
          padding: (theme) => theme.spacing(0, 2),
          flexGrow: 1,
          overflowY: 'auto',
        }}
      >
        <HistoryList />
      </Box>
      <ExpenseDetailsDialog />
    </Box>
  );
};

export default History;
