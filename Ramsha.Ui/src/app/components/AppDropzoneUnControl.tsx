import React, { useCallback } from 'react';
import { useDropzone, FileRejection, DropEvent } from 'react-dropzone';
import { Box, Typography, Button, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';

interface ReusableDropzoneProps {
    onFileUpload?: (files: File[]) => void;
    previewUrl?: string;
}

interface UploadedFile {
    file: File;
    preview: string;
}

const DropzoneContainer = styled(Box)<{ isdragging: number }>(({ theme, isdragging }) => ({
    border: `2px dashed ${isdragging ? theme.palette.primary.main : theme.palette.grey[400]}`,
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
    }
}));

// Styled Preview Image
const PreviewImage = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
});

// Styled Overlay
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

const ReusableDropzone: React.FC<ReusableDropzoneProps> = ({ onFileUpload, previewUrl }) => {
    const [uploadedFile, setUploadedFile] = React.useState<UploadedFile | null>(null);

    const onDrop = useCallback(
        (acceptedFiles: File[], _: FileRejection[], __: DropEvent) => {
            const file = acceptedFiles[0];
            const newFile = {
                file,
                preview: URL.createObjectURL(file),
            };
            setUploadedFile(newFile); 

            if (onFileUpload) {
                onFileUpload(acceptedFiles);
            }
        },
        [onFileUpload]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
    });

    const removeFile = (event: React.MouseEvent) => {
        event.stopPropagation();
        setUploadedFile(null);
    };

    const imageToShow = uploadedFile ? uploadedFile.preview : previewUrl;

    return (
        <DropzoneContainer
            {...getRootProps()}
            isdragging={isDragActive ? 1 : 0}
        >
            <input {...getInputProps()} />
            {imageToShow ? (
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
                    <CloudUploadIcon fontSize="large" color={isDragActive ? 'primary' : 'action'} />
                    <Typography variant="h6" color={isDragActive ? 'primary' : 'textSecondary'} sx={{ mt: 2 }}>
                        {isDragActive ? 'Drop the files here ...' : 'Drag & drop files here, or click to select files'}
                    </Typography>
                    <Button
                        variant="outlined"
                        color="primary"
                        size='small'
                        sx={{ mt: 3, fontWeight: 'bold' }}
                    >
                        Browse Files
                    </Button>
                </Overlay>
            )}
        </DropzoneContainer>
    );
};

export default ReusableDropzone;
