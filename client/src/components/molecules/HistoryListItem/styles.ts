import { StyleInterface } from 'interfaces';

const styles: StyleInterface = {
  listItem: { px: 0, alignItems: 'flex-start' },
  listItem_button: { px: 1 },
  listItem_primary: { display: 'flex', justifyContent: 'space-between' },
  listItem_secondary: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  listItem_avatarGroup: {
    '& .MuiAvatarGroup-avatar': {
      width: '20px',
      height: '20px',
      marginLeft: '-4px',
      fontSize: '12px',
      fontWeight: 'bold',
      backgroundColor: 'primary.main',
    },
  },
};

export default styles;
