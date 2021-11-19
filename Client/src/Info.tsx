import React, { useEffect, useMemo, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { useCsvApiControllerGetCsvDataInfoQuery } from '../csv-api.generated';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
            margin: theme.spacing(2),
        },
    }),
);

const Info: React.FC = () => {
    const classes = useStyles();
    const { data, isLoading, refetch } = useCsvApiControllerGetCsvDataInfoQuery();

    useEffect(() => {
        if (data) {
            refetch();
        }
    }, [data, refetch]);

    if (isLoading) {
        return (
            <CircularProgress />
        );
    }

    if (!data) {
        return null;
    }

    return (
        <List className={classes.root}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <ImageIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Total donation amount, $" secondary={data.totalValue} />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <WorkIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="All donation records" secondary={data.totalNumber} />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <BeachAccessIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary="Percentage of **Anonymous** donations"
                    secondary={`${data.anonymousPerc || 0}%`}
                />
            </ListItem>
        </List>
    );
};

export default Info;
