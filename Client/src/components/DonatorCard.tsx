import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CsvDto } from '../../csv-api.generated';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 350,
            margin: theme.spacing(),
        },
    }),
);

export default function DonatorCard({ card }: { card: CsvDto }) {
    const classes = useStyles();
    const { donor_name, donation_amount, donor_id, ...rest } = card;

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h4">
                        {donor_name || 'Anonymous'}: ${donation_amount}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {Object.values(rest).filter(Boolean).join(', ') || 'NO INFO'}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
