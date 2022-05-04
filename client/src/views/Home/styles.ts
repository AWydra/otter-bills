import { SxProps } from '@mui/material';

const styles: { [key: string]: SxProps } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    mt: 2,
    mx: 1,
  },
  cardContainer: {
    display: 'grid',
    gap: 1,
    gridTemplateColumns: '1fr 1fr',
  },
  detailsButton: {
    alignSelf: 'flex-end',
  },
  addButton: {
    my: 3,
  },
};

export default styles;
