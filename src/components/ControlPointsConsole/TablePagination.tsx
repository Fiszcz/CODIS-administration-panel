import {IconButton} from "@material-ui/core";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@material-ui/icons";
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import * as React from "react";

export class TablePaginationActions extends React.Component<any, any> {
    handleFirstPageButtonClick = (event: any) => {
        this.props.onChangePage(event, 0);
    };

    handleBackButtonClick = (event: any) => {
        this.props.onChangePage(event, this.props.page - 1);
    };

    handleNextButtonClick = (event: any) => {
        this.props.onChangePage(event, this.props.page + 1);
    };

    handleLastPageButtonClick = (event: any) => {
        this.props.onChangePage(
            event,
            Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
        );
    };

    render() {
        const { count, page, rowsPerPage } = this.props;

        return (
            <div style={{flexShrink: 0, marginLeft: 20}}>
                <IconButton
                    onClick={this.handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="First Page"
                >
                    <FirstPageIcon />
                </IconButton>
                <IconButton
                    onClick={this.handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="Previous Page"
                >
                    <KeyboardArrowLeft />
                </IconButton>
                <IconButton
                    onClick={this.handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Next Page"
                >
                    <KeyboardArrowRight />
                </IconButton>
                <IconButton
                    onClick={this.handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Last Page"
                >
                    <LastPageIcon />
                </IconButton>
            </div>
        );
    }
}