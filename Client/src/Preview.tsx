import React, { useEffect, useMemo, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useCsvApiControllerDownloadAllCsvQuery } from '../csv-api.generated';
import DonatorCard from './components/DonatorCard';
import { Box } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';

const Preview: React.FC = () => {
    const { data, isLoading, refetch } = useCsvApiControllerDownloadAllCsvQuery();
    const [showAnonymous, setShowAnonymous] = useState(true);

    useEffect(() => {
        if (data) {
            refetch();
        }
    }, [data, refetch]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShowAnonymous(event.target.checked);
    };

    const filteredData = useMemo(() => {
        return showAnonymous ? (data || []) : (data || []).filter(item => Boolean(item.donor_name));
    }, [data, showAnonymous]);

    if (isLoading) {
        return (
            <CircularProgress />
        );
    }

    return (
        <Box display="flex" flexWrap="wrap">
            <Box flexGrow={1} flexBasis="100%" padding={4}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={showAnonymous}
                            onChange={handleChange}
                            color="primary"
                        />
                    }
                    label="Show Anonymous"
                />
            </Box>
            {filteredData.map(item => (
                <DonatorCard
                    key={item.donor_id}
                    card={item}
                />
            ))}
        </Box>
    );
};

export default Preview;
