import React from 'react';
import {createStyles, WithStyles, withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import {getSorting, stableSort} from "../../utils/sorting";
import {Task} from "../../Client/Api";
import {TasksTableToolbarStyled} from "./TasksTableToolbar";
import {TasksTableHeaderStyled} from "./TasksTableHeader";
import {TimeField} from "../TimeField/TimeField";
import {Button, Menu, MenuItem} from "@material-ui/core";
import {ResolveRejectModalStyled} from "../ResolveRejectModal/ResolveRejectModal";
import {openInNewTab} from "../../utils/browserTab";

const rows = [
    { id: 'id', numeric: false, disablePadding: true, label: 'Id' },
    { id: 'createdTime', numeric: false, disablePadding: true, label: 'Created Time' },
    { id: 'takeTime', numeric: false, disablePadding: true, label: 'Take Time' },
    { id: 'endTime', numeric: false, disablePadding: true, label: 'End Time' },
    { id: 'node', numeric: false, disablePadding: true, label: 'Node' },
    { id: 'action', numeric: false, disablePadding: true, label: 'Action' },
];

interface TasksTableState {
    order: 'desc' | 'asc';
    orderBy: string;
    selected: number[];
    data: Task[];
    page: number;
    rowsPerPage: number;
    anchorEl: any;
    endTimeElementForAction: Date | null;
    isOpenModal: boolean;
    isResolveModal: boolean;
    idTaskToResolveReject: number[];
    idTaskForMenu: number | undefined;
}

const styles = () => createStyles({
    root: {
        width: '100%',
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    checkboxWidth: {
        width: '1px',
    },
    tableCell: {
        padding: '0px !important',
    }
});

interface TasksTableProps extends WithStyles<typeof styles> {
    connection: any;
}

class TasksTable extends React.Component<TasksTableProps, TasksTableState> {

    state = {
        order: 'asc' as 'desc' | 'asc',
        orderBy: 'startupDate',
        selected: [],
        data: [],
        page: 0,
        rowsPerPage: 10,
        anchorEl: null,
        endTimeElementForAction: null,
        isOpenModal: false,
        isResolveModal: true,
        idTaskToResolveReject: [],
        idTaskForMenu: undefined,
    };

    componentDidMount(): void {
        this.props.connection.onmessage = (message: { data: string; }) => {
            const {t, task, solution} = JSON.parse(message.data);
            if (t)
                this.setState({data: t});
            else if (task !== undefined) {
                openInNewTab(task);
            } else if (solution !== undefined) {
                openInNewTab(solution);
            }
        };
        this.props.connection.send(JSON.stringify({order: 'tasks'}));
    }

    render() {
        const { classes } = this.props;
        const {
            data,
            order,
            orderBy,
            selected,
            rowsPerPage,
            page,
            anchorEl,
            isOpenModal,
            isResolveModal,
            idTaskToResolveReject
        } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <Paper className={classes.root}>
                <TasksTableToolbarStyled
                    numSelected={selected.length}
                    handleResolveClick={this.handleResolveMultipleClick}
                    handleRejectClick={this.handleRejectMultipleClick}
                />
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <TasksTableHeaderStyled
                            numSelected={selected.length}
                            order={order as 'desc' | 'asc'}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            undoneRowCount={data.filter((task: Task) => !task.endTime).length}
                            rows={rows}
                        />
                        <TableBody>
                            {stableSort(data, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((n: Task) => {
                                    const isSelected = this.isSelected(n.id);
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n.id}
                                            selected={isSelected}
                                            style={{backgroundColor: n.endTime ? '#85e88570' : n.takeTime ? '#fffa8670' : ''}}
                                        >
                                            <TableCell
                                                padding="checkbox"
                                                className={classes.checkboxWidth}
                                                onClick={(event: React.MouseEvent) => this.handleClick(event, n.id)}
                                            >
                                                {!n.endTime &&
                                                <Checkbox checked={isSelected}/>
                                                }
                                            </TableCell>
                                            <TableCell align="center" className={classes.tableCell}>
                                                <b>
                                                    {n.id}
                                                </b>
                                            </TableCell>
                                            <TableCell align="center" className={classes.tableCell}>
                                                {n.createdTime && TimeField({date: new Date(n.createdTime)})}
                                            </TableCell>
                                            <TableCell align="center" className={classes.tableCell}>
                                                {n.takeTime && TimeField({date: new Date(n.takeTime)})}
                                            </TableCell>
                                            <TableCell align="center" className={classes.tableCell}>
                                                {n.endTime && TimeField({date: new Date(n.endTime)})}
                                            </TableCell>
                                            <TableCell align="center" className={classes.tableCell}>{n.node}</TableCell>
                                            <TableCell align="center" className={classes.tableCell}>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    color="primary"
                                                    onClick={(event: React.MouseEvent<HTMLElement>) => this.handleClickAction(event, n.endTime, n.id)}
                                                >
                                                    Action
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={7} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleCloseAction}
                    >
                        <MenuItem onClick={this.handleShowTaskClick}>Show Task</MenuItem>
                        {this.state.endTimeElementForAction &&
                        <MenuItem onClick={this.handleShowSolutionClick}>Show Solution</MenuItem>
                        }
                        {this.state.endTimeElementForAction === undefined &&
                        <MenuItem onClick={this.handleResolveClick}>Resolve</MenuItem>
                        }
                        {this.state.endTimeElementForAction === undefined &&
                        <MenuItem onClick={this.handleRejectClick}>Reject</MenuItem>
                        }
                    </Menu>
                </div>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 60, 150, 400]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
                <ResolveRejectModalStyled
                    open={isOpenModal}
                    idTask={idTaskToResolveReject}
                    isResolve={isResolveModal}
                    handleCloseModal={this.handleCloseModal}
                    connection={this.props.connection}
                />
            </Paper>
        );
    }

    private handleShowSolutionClick = () => {
        this.props.connection.send(JSON.stringify({order: 'showSolution', idTask: this.state.idTaskForMenu}));
    };

    private handleShowTaskClick = () => {
        this.props.connection.send(JSON.stringify({order: 'showTask', idTask: this.state.idTaskForMenu}));
    };

    private handleResolveClick = () => {
        this.setState({ isOpenModal: true, isResolveModal: true, idTaskToResolveReject: [this.state.idTaskForMenu!] });
    };

    private handleRejectClick = () => {
        this.setState({ isOpenModal: true, isResolveModal: false, idTaskToResolveReject: [this.state.idTaskForMenu!] });
    };

    private handleResolveMultipleClick = () => {
        this.setState({ isOpenModal: true, isResolveModal: true, idTaskToResolveReject: this.state.selected });
    };

    private handleRejectMultipleClick = () => {
        this.setState({ isOpenModal: true, isResolveModal: false, idTaskToResolveReject: this.state.selected });
    };

    private handleCloseModal = () => {
        this.setState({ isOpenModal: false });
    };

    private handleRequestSort = (event: Event, property: string) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order: order as 'desc' | 'asc', orderBy });
    };

    private handleSelectAllClick = (event: any) => {
        if (event.target.checked)
            this.setState(state => ({selected: state.data.filter((task: Task) => !task.endTime).map((n: any) => n.id)}));
        else
            this.setState({selected: []});
    };

    private handleClick = (event: any, id: number) => {
        const { selected } = this.state;
        // @ts-ignore
        const selectedIndex = selected.indexOf(id);
        let newSelected: any[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    private handleChangePage = (event: any, page: number) => {
        this.setState({ page });
    };

    private handleChangeRowsPerPage = (event:any) => {
        this.setState({ rowsPerPage: event.target.value });
    };

    // @ts-ignore
    private isSelected = (id:any) => this.state.selected.indexOf(id) !== -1;

    private handleClickAction = (event: React.MouseEvent<HTMLElement>, endTime: Date | null, idTask: number) => {
        this.setState({ anchorEl: event.currentTarget, endTimeElementForAction: endTime, idTaskForMenu: idTask });
    };

    private handleCloseAction = () => {
        this.setState({ anchorEl: null });
    };

}

export const TasksTableStyled = withStyles(styles)(TasksTable);
