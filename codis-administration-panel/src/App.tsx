import React from 'react';
import classNames from 'classnames';
import {createStyles, StyleRules, Theme, WithStyles, withStyles} from '@material-ui/core/styles';
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
import {
    BrowserRouter as Router,
    Route,
    NavLink,
    withRouter,
    RouteComponentProps,
    Redirect,
    Switch
} from "react-router-dom";

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
            backgroundColor: '#3f51b5cf !important',
        }
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

interface Props extends WithStyles<typeof styles>, RouteComponentProps {
}

class App extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    state = {
        open: false,
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

        console.log(this.props.location);

        return (
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
                        <Typography variant="h6" color="inherit" noWrap>
                            CODIS - Administration panel
                        </Typography>
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
                        <Switch>
                            <Route path="/system">System</Route>
                            <Route path="/tasks">Tasks</Route>
                            <Route path="/nodes">Nodes</Route>
                            <Route path="/settings">Settings</Route>
                            <Redirect exact from="/" to="/system"/>
                        </Switch>
                    </main>
                </Router>
            </div>
        );
    }
}

export const AppWithStyles = withStyles(styles, {withTheme: true})(withRouter(App));