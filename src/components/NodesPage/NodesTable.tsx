import React from 'react';
import {createStyles, Theme, WithStyles, withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import {NodesTableToolbarStyled} from "./NodesTableToolbar";
import {NodesTableHeader} from "./NodesTableHeader";

function desc(a:any , b:any, orderBy:any) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array: any, cmp: any) {
    const stabilizedThis = array.map((el: any, index: any) => [el, index]);
    stabilizedThis.sort((a: any, b: any) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el:any) => el[0]);
}

function getSorting(order: any, orderBy: any) {
    return order === 'desc' ? (a:any, b:any) => desc(a, b, orderBy) : (a:any, b:any) => -desc(a, b, orderBy);
}
let counter = 0;

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
    counter += 1;
    return { id: counter, name, calories, fat, carbs, protein };
}
interface NodesTableState {
    order: 'desc' | 'asc';
    orderBy: string;
    selected: any[];
    data: any[];
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
        orderBy: 'calories',
        selected: [],
        data: [
            createData('Cupcake', 305, 3.7, 67, 4.3),
            createData('Donut', 452, 25.0, 51, 4.9),
            createData('Eclair', 262, 16.0, 24, 6.0),
            createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
            createData('Gingerbread', 356, 16.0, 49, 3.9),
            createData('Honeycomb', 408, 3.2, 87, 6.5),
            createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
            createData('Jelly Bean', 375, 0.0, 94, 0.0),
            createData('KitKat', 518, 26.0, 65, 7.0),
            createData('Lollipop', 392, 0.2, 98, 0.0),
            createData('Marshmallow', 318, 0, 81, 2.0),
            createData('Nougat', 360, 19.0, 9, 37.0),
            createData('Oreo', 437, 18.0, 63, 4.0),
        ],
        page: 0,
        rowsPerPage: 5,
    };

    handleRequestSort = (event:any, property:any) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order: order as 'desc' | 'asc', orderBy });
    };

    handleSelectAllClick = (event:any) => {
        if (event.target.checked) {
            this.setState(state => ({ selected: state.data.map((n:any) => n.id) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event:any, id:number) => {
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

    handleChangePage = (event:any, page:any) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = (event:any) => {
        this.setState({ rowsPerPage: event.target.value });
    };

    // @ts-ignore
    isSelected = (id:any) => this.state.selected.indexOf(id) !== -1;

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
                        />
                        <TableBody>
                            {stableSort(data, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((n:any) => {
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
                                            <TableCell component="th" scope="row" padding="none">
                                                {n.name}
                                            </TableCell>
                                            <TableCell align="right">{n.calories}</TableCell>
                                            <TableCell align="right">{n.fat}</TableCell>
                                            <TableCell align="right">{n.carbs}</TableCell>
                                            <TableCell align="right">{n.protein}</TableCell>
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
}

export const NodesTableStyled = withStyles(styles)(NodesTable);
