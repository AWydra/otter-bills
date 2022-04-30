import { SxProps } from '@mui/material';

const styles: { [key: string]: SxProps } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
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
