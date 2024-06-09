import type { StyleInterface } from 'interfaces';

const styles: StyleInterface = {
  title: (theme) => ({
    ...theme.typography.h4,
    fontWeight: theme.typography.fontWeightMedium,
    textAlign: 'center',
  }),
};

export default styles;
