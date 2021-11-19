import './App.scss';
import '../css/styles.scss';
import React from 'react';
import MainTabs from './MainTabs';
import Preview from './Preview';
import Info from './Info';
import { TabValues } from './constants';
import { Upload } from './Upload';
import { Box } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const App: React.FC = () => {
    const [value, setValue] = React.useState(2);

    return (
        <Box>
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        CSV Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box marginTop={8}>
                <MainTabs value={value} setValue={setValue} />
                {value === TabValues.PreviewAll && (
                    <Preview />
                )}
                {value === TabValues.Info && (
                    <Info />
                )}
                {value === TabValues.Upload && (
                    <Upload />
                )}
            </Box>
        </Box>

    );
};

export default App;
