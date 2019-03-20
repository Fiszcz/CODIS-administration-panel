import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Checkbox from "@material-ui/core/Checkbox";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableSortLabel from "@material-ui/core/TableSortLabel";

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

export class NodesTableHeader extends React.Component<NodesTableHeaderProps> {
    createSortHandler = (property:any) => (event:any) => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, rows } = this.props;

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
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
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
