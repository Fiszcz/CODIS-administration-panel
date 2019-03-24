import {lighten} from "@material-ui/core/styles/colorManipulator";
import classNames from "classnames";
import {Button, Theme, withStyles} from "@material-ui/core";
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import FilterListIcon from "@material-ui/icons/FilterList";
import {DoneOutline, RemoveCircleOutline} from "@material-ui/icons";

const toolbarStyles = (theme: Theme) => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});

const TasksTableToolbar = (props: any) => {
    const { numSelected, classes } = props;

    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subtitle1">
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography variant="h6" id="tableTitle">
                        Tasks
                    </Typography>
                )}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {numSelected > 0 ?
                    <div style={{display: 'flex'}}>
                        <Button>
                            <DoneOutline style={{marginRight: '5px'}}/> Resolve
                        </Button>
                        <Button>
                            <RemoveCircleOutline style={{marginRight: '5px'}}/> Reject
                        </Button>
                    </div>
                : (
                    <Tooltip title="Filter list">
                        <IconButton aria-label="Filter list">
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </div>
        </Toolbar>
    );
};

export const TasksTableToolbarStyled = withStyles(toolbarStyles)(TasksTableToolbar);
