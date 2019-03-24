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
    selected: Task[];
    data: Task[];
    page: number;
    rowsPerPage: number;
    anchorEl: any;
    endTimeElementForAction: Date | null;
    isOpenModal: boolean;
    isResolveModal: boolean;
    idTaskToResolveReject: string[];
    idTaskForMenu: string;
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

class TasksTable extends React.Component<WithStyles<typeof styles>, TasksTableState> {

    state = {
        order: 'asc' as 'desc' | 'asc',
        orderBy: 'startupDate',
        selected: [],
        data: [
            {
                id: 'fg3k34en2k4js3',
                createdTime: new Date(),
                takeTime: new Date(),
                endTime: null,
                node: 'gfdk2jsfo32o',
            },
            {
                id: 'dfk43jk2ndsk24k',
                createdTime: new Date(),
                takeTime: new Date(2015, 1, 12),
                endTime: new Date(),
                node: 'lfsl351opeodsks',
            }
        ],
        page: 0,
        rowsPerPage: 10,
        anchorEl: null,
        endTimeElementForAction: null,
        isOpenModal: false,
        isResolveModal: true,
        idTaskToResolveReject: [],
        idTaskForMenu: '',
    };

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
                <TasksTableToolbarStyled numSelected={selected.length} />
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <TasksTableHeaderStyled
                            numSelected={selected.length}
                            order={order as 'desc' | 'asc'}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
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
                                        >
                                            <TableCell
                                                padding="checkbox"
                                                className={classes.checkboxWidth}
                                                onClick={(event: React.MouseEvent) => this.handleClick(event, n.id)}
                                            >
                                                <Checkbox checked={isSelected} />
                                            </TableCell>
                                            <TableCell align="center" className={classes.tableCell}><b>{n.id}</b></TableCell>
                                            <TableCell align="center" className={classes.tableCell}>
                                                {TimeField({date: n.createdTime})}
                                            </TableCell>
                                            <TableCell align="center" className={classes.tableCell}>
                                                {TimeField({date: n.takeTime})}
                                            </TableCell>
                                            <TableCell align="center" className={classes.tableCell}>
                                                {TimeField({date: n.endTime})}
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
                        <MenuItem onClick={() => {}}>Show Task</MenuItem>
                        {this.state.endTimeElementForAction && <MenuItem onClick={() => {}}>Show Solution</MenuItem>}
                        {this.state.endTimeElementForAction === null && <MenuItem onClick={this.handleResolveClick}>Resolve</MenuItem>}
                        {this.state.endTimeElementForAction === null && <MenuItem onClick={this.handleRejectClick}>Reject</MenuItem>}
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
                />
            </Paper>
        );
    }

    private handleResolveClick = () => {
        this.setState({ isOpenModal: true, isResolveModal: true, idTaskToResolveReject: [this.state.idTaskForMenu] });
    };

    private handleRejectClick = () => {
        this.setState({ isOpenModal: true, isResolveModal: false, idTaskToResolveReject: [this.state.idTaskForMenu] });
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
        if (event.target.checked) {
            this.setState(state => ({ selected: state.data.map((n:any) => n.id) }));
            return;
        }
        this.setState({ selected: [] });
    };

    private handleClick = (event: any, id: string) => {
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

    private handleClickAction = (event: React.MouseEvent<HTMLElement>, endTime: Date | null, idTask: string) => {
        this.setState({ anchorEl: event.currentTarget, endTimeElementForAction: endTime, idTaskForMenu: idTask });
    };

    private handleCloseAction = () => {
        this.setState({ anchorEl: null });
    };

}

export const TasksTableStyled = withStyles(styles)(TasksTable);
