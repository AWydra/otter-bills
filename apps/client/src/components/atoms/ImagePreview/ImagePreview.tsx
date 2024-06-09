import { Box } from '@mui/material';
import type { ReactElement } from 'react';
import React from 'react';
import type { ImageType } from 'react-images-uploading';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

interface Props {
  image: ImageType | undefined;
  onImageUpload: () => void;
  onImageUpdate: () => void;
}

function ImagePreview({ image, onImageUpload, onImageUpdate }: Props): ReactElement {
  return (
    <Box
      onClick={image ? onImageUpdate : onImageUpload}
      sx={{
        width: (theme) => theme.spacing(7),
        height: (theme) => theme.spacing(7),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: 'solid 3px',
        borderColor: (theme) => theme.palette.primary.main,
        borderRadius: (theme) => theme.spacing(1),
        overflow: 'hidden',
        backgroundImage: `url("${image?.dataURL}")`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      {!image && (
        <AddAPhotoIcon
          sx={{
            width: (theme) => theme.spacing(4),
            height: 'auto',
            marginLeft: (theme) => theme.spacing(-0.25),
          }}
          color="primary"
        />
      )}
    </Box>
  );
}

export default ImagePreview;
