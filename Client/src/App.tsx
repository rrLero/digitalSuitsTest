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
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const App: React.FC = () => {
    const [value, setValue] = React.useState(2);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Box>
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        CSV Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box position="fixed" top={matches ? 60 : 56} width="100%" zIndex={1}>
                <MainTabs value={value} setValue={setValue} />
            </Box>
            <Box marginTop={14}>
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
