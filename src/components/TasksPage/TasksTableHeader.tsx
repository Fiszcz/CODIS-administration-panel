import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Checkbox from "@material-ui/core/Checkbox";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import {createStyles, WithStyles, withStyles} from "@material-ui/core";

const styles = () => createStyles({
    marginForIcon: {
        paddingLeft: '20px !important',
    },
});

interface row {
    id: string;
    numeric: boolean;
    disablePadding: boolean;
    label: string;
}

interface NodesTableHeaderProps {
    rows: row[];
    numSelected: number;
    onRequestSort: any;
    onSelectAllClick: any;
    order: "desc" | "asc";
    orderBy: string;
    rowCount: number;
}

export class TasksTableHeader extends React.Component<NodesTableHeaderProps & WithStyles<typeof styles>> {
    createSortHandler = (property:any) => (event:any) => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, rows, classes } = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {rows.map(
                        row => (
                            <TableCell
                                key={row.id}
                                align={row.numeric ? 'right' : 'center'}
                                padding={'none'}
                                sortDirection={orderBy === row.id ? order : false}
                                variant={'head'}
                                classes={{head: classes.marginForIcon}}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        ),
                    )}
                </TableRow>
            </TableHead>
        );
    }
}

export const TasksTableHeaderStyled = withStyles(styles)(TasksTableHeader);
