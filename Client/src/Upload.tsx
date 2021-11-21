import React, { useCallback, useState } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useCsvApiControllerUploadFileMutation } from '../csv-api.generated';
import CircularProgress from '@material-ui/core/CircularProgress';

export const Upload: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [fetcher, { isLoading }] = useCsvApiControllerUploadFileMutation();
    const [key, setKey] = useState(1);

    const handleUpload = useCallback(() => {
        const formData = new FormData();
        formData.append(
            'file',
            files[0],
            files[0].name,
        );
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        fetcher({ body: formData }).then(() => {
            setFiles([]);
            setKey(prev => prev + 1);
        });
    }, [files, fetcher]);

    return (
        <Box margin={2}>
            <DropzoneArea
                key={key}
                filesLimit={1}
                onChange={setFiles}
            />
            <Box marginTop={2} display="flex">
                <Button
                    variant="contained"
                    color="primary"
                    disabled={files.length === 0 || isLoading}
                    onClick={handleUpload}
                >
                    Upload To Server
                </Button>
                {isLoading && (
                    <CircularProgress />
                )}
            </Box>
        </Box>
    );
};
