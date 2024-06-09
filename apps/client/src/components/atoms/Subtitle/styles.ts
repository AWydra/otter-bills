import type { StyleInterface } from 'interfaces';

const styles: StyleInterface = {
  subtitle: (theme) => ({
    ...theme.typography.h6,
    fontWeight: theme.typography.fontWeightRegular,
    lineHeight: theme.typography.h4.lineHeight,
    color: theme.palette.text.secondary,
    textAlign: 'center',
  }),
};

export default styles;
