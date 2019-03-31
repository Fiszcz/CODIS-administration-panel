import React from 'react';
import classNames from 'classnames';
import {
    createMuiTheme,
    createStyles,
    MuiThemeProvider,
    StyleRules,
    Theme,
    WithStyles,
    withStyles
} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsSystemDaydream from '@material-ui/icons/SettingsSystemDaydream';
import Settings from '@material-ui/icons/Settings';
import DesktopWindows from '@material-ui/icons/DesktopWindows';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import {BrowserRouter as Router, NavLink, Redirect, Route, Switch} from "react-router-dom";
import {NodesTableStyled} from "./components/NodesPage/NodesTable";
import {TasksTableStyled} from "./components/TasksPage/TasksTable";
import {SystemPageStyled} from "./components/SystemPage/SystemPage";
import {Button} from "@material-ui/core";
import {ConnectModalStyled} from "./components/ConnectModal/ConnectModal";

const drawerWidth = 240;

const styles: (theme: Theme) => StyleRules = ({transitions, spacing, zIndex, breakpoints, mixins}: Theme): StyleRules => createStyles({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: zIndex.drawer + 1,
        transition: transitions.create(['width', 'margin'], {
            easing: transitions.easing.sharp,
            duration: transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: transitions.create(['width', 'margin'], {
            easing: transitions.easing.sharp,
            duration: transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: transitions.create('width', {
            easing: transitions.easing.sharp,
            duration: transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: transitions.create('width', {
            easing: transitions.easing.sharp,
            duration: transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: spacing.unit * 6 + 1,
        [breakpoints.up('sm')]: {
            width: spacing.unit * 7 + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: spacing.unit * 3,
    },
    activeLink: {
        '& > *': {
            backgroundColor: '#15517e !important',
        },
        '& > * > *': {
            color: 'white !important',
        },
        '& > * > * > *': {
            color: 'white !important',
        },
    },
    listLinks: {
        '& > *': {
            textDecoration: 'none !important',
        }
    },
    listItem: {
        paddingTop: 15,
        paddingBottom: 15,
        marginBottom: 8,
    }
});

const overrideTheme = createMuiTheme({
    palette: {
        primary: {
            light: '#1585b7',
            main: '#15517e',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#ffffff',
        },
        secondary: {
            light: '#1690c8',
            main: '#1672a6',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#ffffff',
        },
    },
});

interface Props extends WithStyles<typeof styles> {
}

class App extends React.Component<Props> {

    state = {
        isOpenDrawer: false,
        webSocketConnection: undefined,
        isOpenConnection: false,
        key: '',
        address: '',
    };

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    render() {
        // @ts-ignore
        const {classes, theme} = this.props;

        return (
            <MuiThemeProvider theme={overrideTheme}>
                <div className={classes.root}>
                    <CssBaseline/>
                    <AppBar
                        position="fixed"
                        className={classNames(classes.appBar, {
                            [classes.appBarShift]: this.state.open,
                        })}
                    >
                        <Toolbar disableGutters={!this.state.open}>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.handleDrawerOpen}
                                className={classNames(classes.menuButton, {
                                    [classes.hide]: this.state.open,
                                })}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" color="inherit" noWrap style={{flexGrow: 1}}>
                                CODIS - Administration panel
                            </Typography>
                            <Button color="inherit" variant={'outlined'} style={{marginRight: '20px'}}>Logout</Button>
                        </Toolbar>
                    </AppBar>
                    <Router>
                        <Drawer
                            variant="permanent"
                            className={classNames(classes.drawer, {
                                [classes.drawerOpen]: this.state.open,
                                [classes.drawerClose]: !this.state.open,
                            })}
                            classes={{
                                paper: classNames({
                                    [classes.drawerOpen]: this.state.open,
                                    [classes.drawerClose]: !this.state.open,
                                }),
                            }}
                            open={this.state.open}
                        >
                            <div className={classes.toolbar}>
                                <IconButton onClick={this.handleDrawerClose}>
                                    {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                                </IconButton>
                            </div>
                            <Divider/>
                            <List className={classes.listLinks}>
                                <NavLink to="/system" activeClassName={classes.activeLink}>
                                    <ListItem button className={classes.listItem}>
                                        <ListItemIcon><SettingsSystemDaydream/></ListItemIcon>
                                        <ListItemText primary={'System'}/>
                                    </ListItem>
                                </NavLink>
                                <NavLink to="/tasks" activeClassName={classes.activeLink}>
                                    <ListItem button className={classes.listItem}>
                                        <ListItemIcon><AssignmentTurnedIn/></ListItemIcon>
                                        <ListItemText primary={'Tasks'}/>
                                    </ListItem>
                                </NavLink>
                                <NavLink to="/nodes" activeClassName={classes.activeLink}>
                                    <ListItem button className={classes.listItem}>
                                        <ListItemIcon><DesktopWindows/></ListItemIcon>
                                        <ListItemText primary={'Nodes'}/>
                                    </ListItem>
                                </NavLink>
                            </List>
                            <Divider/>
                            <List className={classes.listLinks}>
                                <NavLink to="/settings" activeClassName={classes.activeLink}>
                                    <ListItem button className={classes.listItem}>
                                        <ListItemIcon><Settings/></ListItemIcon>
                                        <ListItemText primary={'Settings'}/>
                                    </ListItem>
                                </NavLink>
                            </List>
                        </Drawer>
                        <main className={classes.content}>
                            <div className={classes.toolbar}/>
                            {this.state.isOpenConnection &&
                            <Switch>
                                <Route path="/system">
                                    <SystemPageStyled connection={this.state.webSocketConnection}/>
                                </Route>
                                <Route path="/tasks">
                                    <TasksTableStyled connection={this.state.webSocketConnection}/>
                                </Route>
                                <Route path="/nodes">
                                    <NodesTableStyled connection={this.state.webSocketConnection}/>
                                </Route>
                                <Route path="/settings">Settings</Route>
                                <Redirect exact from="/" to="/system"/>
                            </Switch>
                            }
                        </main>
                    </Router>
                    <ConnectModalStyled
                        isConnected={this.state.isOpenConnection}
                        handleChangeAddress={this.handleChangeAddress}
                        handleChangeKey={this.handleChangeKey}
                        handleClickConnect={this.connect}
                        keyToConnection={this.state.key}
                        address={this.state.address}
                    />
                </div>
            </MuiThemeProvider>
        );
    };

    private logout = () => {
        this.setState({webSocketConnection: undefined, isOpenConnection: false});
    };

    private connect = () => {
        document.cookie = 'X-Authorization=' + this.state.key + '; path=/';
        const webSocketConnection = new WebSocket(this.state.address, 'administration-protocol');
        webSocketConnection.onopen = () => {
            this.setState({isOpenConnection: true});
        };
        webSocketConnection.onerror = () => {
            this.setState({isOpenConnection: false});
        };
        this.setState({webSocketConnection})
    };

    private handleChangeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({address: event.target.value})
    };

    private handleChangeKey = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({key: event.target.value})
    };

}

export const AppWithStyles = withStyles(styles, {withTheme: true})(App);
