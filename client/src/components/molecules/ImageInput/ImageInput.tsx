import React, { ReactElement, useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import ImagePreview from 'components/atoms/ImagePreview/ImagePreview';
import { Box, Button, Stack } from '@mui/material';

const ImageInput = (): ReactElement => {
  const [images, setImages] = useState([]);

  const onChange = (imageList: ImageListType) => {
    setImages(imageList as never[]);
  };

  return (
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
                variant="contained"
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
};

export default ImageInput;
