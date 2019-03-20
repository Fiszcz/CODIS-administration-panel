import React from 'react';
import {createStyles, WithStyles, withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import {NodesTableToolbarStyled} from "./NodesTableToolbar";
import {NodesTableHeader} from "./NodesTableHeader";
import {getSorting, stableSort} from "../../utils/sorting";
import {ExecutiveNode} from "../../Client/Api";

const rows = [
    { id: 'id', numeric: false, disablePadding: true, label: 'Id' },
    { id: 'startupDate', numeric: false, disablePadding: false, label: 'Startup Time' },
];

interface NodesTableState {
    order: 'desc' | 'asc';
    orderBy: string;
    selected: ExecutiveNode[];
    data: ExecutiveNode[];
    page: number;
    rowsPerPage: number;
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
});

class NodesTable extends React.Component<WithStyles<typeof styles>, NodesTableState> {

    state = {
        order: 'asc' as 'desc' | 'asc',
        orderBy: 'startupDate',
        selected: [],
        data: [
            {
                id: 'fg3k34en2k4js3',
                startupDate: (new Date()).toLocaleTimeString(),
            },
            {
                id: 'dfk43jk2ndsk24k',
                startupDate: (new Date()).toLocaleTimeString(),
            }
        ],
        page: 0,
        rowsPerPage: 5,
    };

    render() {
        const { classes } = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <Paper className={classes.root}>
                <NodesTableToolbarStyled numSelected={selected.length} />
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <NodesTableHeader
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
                                .map((n: ExecutiveNode) => {
                                    const isSelected = this.isSelected(n.id);
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => this.handleClick(event, n.id)}
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n.id}
                                            selected={isSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox checked={isSelected} />
                                            </TableCell>
                                            <TableCell component="th" scope="row" padding="none" align="center">
                                                {n.id}
                                            </TableCell>
                                            <TableCell align="center">{n.startupDate}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
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
            </Paper>
        );
    }

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

}

export const NodesTableStyled = withStyles(styles)(NodesTable);
