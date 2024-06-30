import React from 'react';
import type { AvatarProps } from '@mui/material/Avatar';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material';
import { spreadSx } from 'utils';

const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

const stringAvatar = (name: string, getContrastText: (background: string) => string) => {
  const bgcolor: string = stringToColor(name);
  return {
    sx: {
      bgcolor,
      color: getContrastText(bgcolor),
      fontSize: '1.125rem',
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
};

interface IProps extends AvatarProps {
  name?: string;
}

function UserAvatar({ name, src, ...props }: IProps) {
  const {
    palette: { getContrastText },
  } = useTheme();

  if (src) {
    return <Avatar alt={name} src={src} {...props} />;
  } else if (!name) {
    return <Avatar {...props} />;
  }

  const { sx, children } = stringAvatar(name, getContrastText);

  return (
    <Avatar {...props} sx={{ ...sx, ...(Array.isArray(props.sx) ? props.sx : [props.sx]) }}>
      {children}
    </Avatar>
  );
}

export default UserAvatar;
