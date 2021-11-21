import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { TabValues } from './constants';

type Props = {
    value: TabValues;
    setValue: (tab: TabValues) => void;
}

const MainTabs: React.FC<Props> = ({ value, setValue }) => {

    const handleChange = (event: React.ChangeEvent<{}>, newValue: TabValues) => {
        setValue(newValue);
    };
    return (
        <Paper square>
            <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="disabled tabs example"
            >
                <Tab label="Upload CSV" value={TabValues.Upload}/>
                <Tab label="Preview All" value={TabValues.PreviewAll}/>
                <Tab label="Info" value={TabValues.Info}/>
            </Tabs>
        </Paper>
    );
};

export default MainTabs;
