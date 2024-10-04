import React, { useCallback } from 'react';
import { useDropzone, FileRejection, DropEvent } from 'react-dropzone';
import { Box, Typography, IconButton, FormControl, FormHelperText, Fab } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { styled } from '@mui/material/styles';
import { useController, UseControllerProps } from 'react-hook-form';
import { AppUploadImageIcon } from './icons/AppUploadImageIcon';

export type FileWithPreview = {
    file?: File;
    preview?: string;
};

interface ReusableDropzoneProps extends UseControllerProps {
    onFileUpload?: (newFile: FileWithPreview) => void;
    previewUrl?: string;
    previewUploaded?: boolean;
}

const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};

const DropzoneContainer = styled(Box)<{ isdragging: number }>(({ theme, isdragging }) => ({
    border: `1px dashed ${isdragging ? theme.palette.primary.main : theme.palette.primary.dark}`,
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    textAlign: 'center',
    cursor: 'pointer',
    position: 'relative',
    height: 'auto',
    minHeight: '250px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.3s ease',
    [theme.breakpoints.up('sm')]: {
        minHeight: '300px',
    },
    [theme.breakpoints.up('md')]: {
        minHeight: '350px',
    },
    '&:hover': {
        boxShadow: theme.shadows[6],
    },
}));

const PreviewImage = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
});

const Overlay = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(3),
    },
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(4),
    },
}));

const ReusableDropzone: React.FC<ReusableDropzoneProps> = ({ previewUrl, control, name, previewUploaded = true, onFileUpload }) => {
    const { field, fieldState } = useController({ name, control, defaultValue: null });

    const onDrop = useCallback(
        async (acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => {
            const file = acceptedFiles[0];
            const base64String = await convertFileToBase64(file);
            const newFile = {
                file,
                preview: base64String
            };

            field.onChange(newFile);

            if (onFileUpload) {
                onFileUpload(newFile);
            }

            if (fileRejections.length > 0) {
                console.error('File rejected', fileRejections);
            }
        },
        [field, onFileUpload]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
    });

    const removeFile = (event: React.MouseEvent) => {
        event.stopPropagation();
        field.onChange(null); 
    };

    const imageToShow = field.value ? field.value.preview : previewUrl;

    return (
        <FormControl error={!!fieldState.error} fullWidth>
            <DropzoneContainer {...getRootProps()} isdragging={isDragActive ? 1 : 0}>
                <input {...getInputProps()} />
                {imageToShow && previewUploaded ? (
                    <>
                        <PreviewImage src={imageToShow} alt="Preview" />

                        <IconButton
                            sx={{
                                position: 'absolute',
                                top: '8px',
                                right: '8px',
                                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                zIndex: 2,
                            }}
                            onClick={removeFile}
                        >
                            <DeleteIcon color="error" />
                        </IconButton>
                    </>
                ) : (
                    <Overlay>
                        <Typography variant="h6" color={isDragActive ? 'primary' : 'textSecondary'} sx={{ mt: 2 }}>
                            {isDragActive ? 'Drop the files here ...' : 'Drag & drop files here, or click to select files'}
                        </Typography>
                        <Fab
                            color="primary"
                            aria-label="upload"
                            sx={{ mt: 3 }}
                        >
                            <AppUploadImageIcon />
                        </Fab>
                    </Overlay>
                )}
            </DropzoneContainer>
            <FormHelperText>{fieldState.error?.message}</FormHelperText>
        </FormControl>
    );
};

export default ReusableDropzone;



