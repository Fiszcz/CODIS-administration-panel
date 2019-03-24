import * as React from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    withStyles
} from "@material-ui/core";
import {ControlPoint} from "../../Client/Api";
import {TablePaginationActions} from "./TablePagination";

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

interface ControlPointsConsoleProps {
    controlPoints: ControlPoint[];
}

interface ControlPointsConsoleState {
    rowsPerPage: number;
    page: number;
}

export class ControlPointsConsole extends React.Component<ControlPointsConsoleProps, ControlPointsConsoleState> {

    state = {
        rowsPerPage: 10,
        page: 0,
    };

    render() {
        const {rowsPerPage, page} = this.state;

        return (
            <Paper style={{width: '100%'}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell style={{fontSize: '15px', borderTopRightRadius: '5px', borderTopLeftRadius: '5px'}}>
                                Main thread console
                            </CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.controlPoints.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(controlPoint => (
                            <TableRow>
                                <CustomTableCell component="th" style={{backgroundColor: this.getValueOfColor(controlPoint.assignation)}}>
                                    <b>
                                        ({controlPoint.time.toLocaleTimeString() + ' - ' + controlPoint.time.toLocaleDateString() + '): '}
                                        &nbsp;&nbsp;
                                    </b>
                                    {controlPoint.message}
                                </CustomTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 15, 20, 25, 60, 150, 400]}
                                colSpan={3}
                                count={this.props.controlPoints.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </Paper>
        );
    }

    private getValueOfColor = (assignation: string) => {
        switch (assignation) {
            case 'primary':
                return '#1fc1d5b5';
            case 'error':
                return '#e73e3aad';
            case 'success':
                return '#52ab5669';
            case 'custom':
                return '#f80afc33';
            case 'warning':
                return '#fcdb0a7d';
            default:
                return 'inherit';
        }
    };

    private handleChangePage = (event: any, page: number) => {
        this.setState({ page });
    };

    private handleChangeRowsPerPage = (event: any) => {
        this.setState({ page: 0, rowsPerPage: event.target.value });
    };

}