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
import {ControlNotification} from "../../Client/Api";
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
    controlPoints: ControlNotification[];
}

interface ControlPointsConsoleState {
    rowsPerPage: number;
    page: number;
}

export class ControlPointsConsole extends React.PureComponent<ControlPointsConsoleProps, ControlPointsConsoleState> {

    state = {
        rowsPerPage: 10,
        page: 0,
    };

    render() {
        const {rowsPerPage, page} = this.state;
        const reversedControlPoints = this.reverseArray(this.props.controlPoints); // TODO: display array without reversing

        return (
            <Paper style={{width: '100%'}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell style={{fontSize: '15px', borderTopRightRadius: '5px', borderTopLeftRadius: '5px'}}>
                                Master thread console
                            </CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reversedControlPoints.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(controlPoint => (
                            <TableRow key={JSON.stringify(controlPoint)}>
                                <CustomTableCell component="th" style={{backgroundColor: this.getValueOfColor(controlPoint.type)}}>
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

    private getValueOfColor = (type: string) => {
        switch (type) {
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
                return 'white';
        }
    };

    private handleChangePage = (event: any, page: number) => {
        this.setState({ page });
    };

    private handleChangeRowsPerPage = (event: any) => {
        this.setState({ page: 0, rowsPerPage: event.target.value });
    };

    private reverseArray = (arr: any[]) => {
        let newArray = [];
        for (let iterator = arr.length - 1; iterator >= 0; iterator--) {
            newArray.push(arr[iterator]);
        }
        return newArray;
    }

}