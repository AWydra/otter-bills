import React, { ReactElement } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { Box, Button, Stack } from '@mui/material';
import ImagePreview from 'components/atoms/ImagePreview/ImagePreview';

interface Props {
  images: ImageListType;
  onChange: (imageList: ImageListType) => void;
}

const ImageInput = ({ images, onChange }: Props): ReactElement => (
  <ImageUploading value={images} onChange={onChange}>
    {({ imageList, onImageUpload, onImageUpdate, onImageRemove }) => {
      const image = imageList[0];
      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ImagePreview
            image={image}
            onImageUpload={onImageUpload}
            onImageUpdate={() => onImageUpdate(0)}
          />
          <Stack
            sx={{
              marginLeft: (theme) => theme.spacing(2),
              flexGrow: 1,
            }}
            direction="row"
            spacing={2}
          >
            <Button
              sx={{
                flexBasis: '100%',
              }}
              variant={image ? 'contained' : 'outlined'}
              onClick={image ? () => onImageUpdate(0) : onImageUpload}
            >
              {image ? 'Zmień' : 'Wgraj'}
            </Button>
            {image && (
              <Button
                sx={{
                  flexBasis: '100%',
                }}
                variant="outlined"
                onClick={() => onImageRemove(0)}
              >
                Usuń
              </Button>
            )}
          </Stack>
        </Box>
      );
    }}
  </ImageUploading>
);

export default ImageInput;
