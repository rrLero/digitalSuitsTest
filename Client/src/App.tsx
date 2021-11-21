import './App.scss';
import '../css/styles.scss';
import React, { useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
    const { tab } = useParams<'tab'>();

    const [value, setValue] = React.useState(Object.values(TabValues)
        .includes(tab as TabValues) ? tab as TabValues : TabValues.Info);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const navigate = useNavigate();

    const handleTabsChange = useCallback((value: TabValues) => {
        setValue(value);
        navigate(`/${value}`);
    }, []);

    const currentTabElement = useMemo(() => {
        if (value === TabValues.Info) {
            return <Info />;
        }
        if (value === TabValues.Upload) {
            return <Upload />;
        }
        if (value === TabValues.PreviewAll) {
            return <Preview />;
        }
        return (
            <Typography>404 Page NotFound</Typography>
        );
    }, [value]);

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
                <MainTabs value={value} setValue={handleTabsChange} />
            </Box>
            <Box marginTop={14}>
                {currentTabElement}
            </Box>
        </Box>
    );
};

export default App;
