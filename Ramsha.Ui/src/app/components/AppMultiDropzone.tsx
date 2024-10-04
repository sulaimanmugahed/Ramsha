// import React, { useCallback } from 'react';
// import { useDropzone, FileRejection, DropEvent } from 'react-dropzone';
// import { Box, Typography, Button, IconButton, Grid } from '@mui/material';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { styled } from '@mui/material/styles';

// interface ReusableDropzoneProps {
//     onFileUpload?: (files: File[]) => void;
// }

// interface UploadedFile {
//     file: File;
//     preview: string; // URL for previewing the image
// }

// // Styled Dropzone Container
// const DropzoneContainer = styled(Box)<{ isdragging: number }>(({ theme, isdragging }) => ({
//     border: `2px dashed ${isdragging ? theme.palette.primary.main : theme.palette.grey[400]}`,
//     padding: theme.spacing(3),
//     borderRadius: theme.shape.borderRadius,
//     textAlign: 'center',
//     cursor: 'pointer',
//     position: 'relative',
//     height: 'auto',
//     minHeight: '250px',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'column',
//     transition: 'all 0.3s ease',
//     [theme.breakpoints.up('sm')]: {
//         minHeight: '300px',
//     },
//     [theme.breakpoints.up('md')]: {
//         minHeight: '350px',
//     },
//     '&:hover': {
//         boxShadow: theme.shadows[6],
//     }
// }));

// // Styled Preview Image
// const PreviewImage = styled('img')({
//     width: '100%',
//     height: '100%',
//     objectFit: 'cover',
//     position: 'absolute',
//     top: 0,
//     left: 0,
// });

// // Styled Overlay
// const Overlay = styled(Box)(({ theme }) => ({
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: theme.spacing(2),
// }));

// const ReusableDropzone: React.FC<ReusableDropzoneProps> = ({ onFileUpload }) => {
//     const [uploadedFiles, setUploadedFiles] = React.useState<UploadedFile[]>([]);

//     const onDrop = useCallback(
//         (acceptedFiles: File[], _: FileRejection[], __: DropEvent) => {
//             const newFiles = acceptedFiles.map((file) => ({
//                 file,
//                 preview: URL.createObjectURL(file), // Create preview URL for the image
//             }));
//             setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]); // Append new files

//             if (onFileUpload) {
//                 onFileUpload(acceptedFiles);
//             }
//         },
//         [onFileUpload]
//     );

//     const { getRootProps, getInputProps, isDragActive } = useDropzone({
//         onDrop,
//         multiple: true, // Enable multiple file uploads
//     });

//     const removeFile = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, fileToRemove: File) => {
//         event.stopPropagation()
//         setUploadedFiles((prevFiles) =>
//             prevFiles.filter((file) => file.file !== fileToRemove) // Remove the selected file
//         );
//     };

//     return (
//         <DropzoneContainer
//             {...getRootProps()}
//             isdragging={isDragActive ? 1 : 0}
//         >
//             <input {...getInputProps()} />
//             {uploadedFiles.length > 0 ? (
//                 <Grid container spacing={2} sx={{ mt: 2 }}>
//                     {uploadedFiles.map((uploadedFile, index) => (
//                         <Grid item xs={6} sm={4} md={3} key={index} sx={{ position: 'relative' }}>
//                             {/* Image Preview */}
//                             <Box sx={{ position: 'relative', width: '100%', paddingBottom: '100%', overflow: 'hidden' }}>
//                                 <PreviewImage src={uploadedFile.preview} alt={`Preview ${index}`} />
//                                 {/* Delete Button */}
//                                 <IconButton
//                                     sx={{
//                                         position: 'absolute',
//                                         top: '8px',
//                                         right: '8px',
//                                         backgroundColor: 'rgba(255, 255, 255, 0.7)',
//                                     }}
//                                     onClick={(e) => removeFile(e, uploadedFile.file)}
//                                 >
//                                     <DeleteIcon color="error" />
//                                 </IconButton>
//                             </Box>
//                         </Grid>
//                     ))}
//                 </Grid>
//             ) : (
//                 <Overlay>
//                     <CloudUploadIcon fontSize="large" color={isDragActive ? 'primary' : 'action'} />
//                     <Typography variant="h6" color={isDragActive ? 'primary' : 'textSecondary'} sx={{ mt: 2 }}>
//                         {isDragActive ? 'Drop the files here ...' : 'Drag & drop files here, or click to select files'}
//                     </Typography>
//                     <Button
//                         variant="outlined"
//                         color="primary"
//                         size="small"
//                         sx={{ mt: 3, fontWeight: 'bold' }}
//                     >
//                         Browse Files
//                     </Button>
//                 </Overlay>
//             )}
//         </DropzoneContainer>
//     );
// };

// export default ReusableDropzone;

import React, { useCallback } from 'react';
import { useDropzone, FileRejection, DropEvent } from 'react-dropzone';
import { Box, Typography, Button, IconButton, Grid, FormControl, FormHelperText } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import { useController, UseControllerProps } from 'react-hook-form';

interface UploadedFile {
    file: File;
    preview: string;
}

interface ReusableDropzoneProps extends UseControllerProps {
    onFileUpload?: (files: File[]) => void;
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
    flexDirection: 'column',
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

const PreviewImage = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
});

const Overlay = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
}));

const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};

const AppMultiDropzone: React.FC<ReusableDropzoneProps> = ({ onFileUpload, control, name }) => {
    const { field, fieldState } = useController({ name, control, defaultValue: [] });
    const [uploadedFiles, setUploadedFiles] = React.useState<UploadedFile[]>(field.value || []);


    // React.useEffect(() => {
    //     // Handle preloaded images from API (e.g., in an edit scenario)
    //     if (field.value?.length > 0) {
    //         setUploadedFiles(field.value.map((imageUrl: string) => ({ preview: imageUrl, isNew: false })));
    //     }
    // }, [field.value]);

    // React.useEffect(() => {
    //     // Revoke object URLs when component is unmounted or files are removed
    //     return () => {
    //         uploadedFiles.forEach((file) => {
    //             if (file.file) {
    //                 URL.revokeObjectURL(file.preview);
    //             }
    //         });
    //     };
    // }, [uploadedFiles]);

    const onDrop = useCallback(
        async (acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => {
            const newFilesPromises = acceptedFiles.map(async (file) => {
                const base64 = await convertFileToBase64(file); 
                return {
                    file,
                    preview: base64,
                };
            });

            const newFiles = await Promise.all(newFilesPromises);
            setUploadedFiles((prevFiles) => {
                const updatedFiles = [...prevFiles, ...newFiles];
                field.onChange(updatedFiles); 
                return updatedFiles;
            });

            if (onFileUpload) {
                onFileUpload(acceptedFiles);
            }
        },
        [onFileUpload, field]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: true,
    });

    const removeFile = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, fileToRemove: UploadedFile) => {
        event.stopPropagation();
        setUploadedFiles((prevFiles) => {
            const updatedFiles = prevFiles.filter((file) => file.preview !== fileToRemove.preview);
            field.onChange(updatedFiles); 
            return updatedFiles;
        });
    };

    return (
        <FormControl error={!!fieldState.error} fullWidth>
            <DropzoneContainer
                {...getRootProps()}
                isdragging={isDragActive ? 1 : 0}
            >
                <input {...getInputProps()} />
                {uploadedFiles.length > 0 ? (
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        {uploadedFiles.map((uploadedFile, index) => (
                            <Grid item xs={6} sm={4} md={3} key={index} sx={{ position: 'relative' }}>

                                <Box sx={{ position: 'relative', width: '100%', paddingBottom: '100%', overflow: 'hidden' }}>
                                    <PreviewImage src={uploadedFile.preview} alt={`Preview ${index}`} />

                                    <IconButton
                                        sx={{
                                            position: 'absolute',
                                            top: '8px',
                                            right: '8px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                        }}
                                        onClick={(e) => removeFile(e, uploadedFile)}
                                    >
                                        <DeleteIcon color="error" />
                                    </IconButton>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Overlay>
                        <CloudUploadIcon fontSize="large" color={isDragActive ? 'primary' : 'action'} />
                        <Typography variant="h6" color={isDragActive ? 'primary' : 'textSecondary'} sx={{ mt: 2 }}>
                            {isDragActive ? 'Drop the files here ...' : 'Drag & drop files here, or click to select files'}
                        </Typography>
                        <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            sx={{ mt: 3, fontWeight: 'bold' }}
                        >
                            Browse Files
                        </Button>
                    </Overlay>
                )}
            </DropzoneContainer>
            <FormHelperText>{fieldState.error?.message}</FormHelperText>
        </FormControl>
    );
};

export default AppMultiDropzone;

