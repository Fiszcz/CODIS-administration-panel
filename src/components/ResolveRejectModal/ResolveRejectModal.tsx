import * as React from "react";
import {Button, createStyles, Modal, TextField, Theme, Typography, WithStyles, withStyles} from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
    paper: {
        position: "absolute",
        width: '50%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
        top: '20%',
        left: '25%',
        right: '25%',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%',
    },
});

interface ResolveRejectModalProps extends WithStyles<typeof styles> {
    open: boolean;
    isResolve: boolean;
    idTask: string[];
    handleCloseModal: () => void;
    connection: WebSocket;
}

interface ResolveRejectModalState {
    resolveRejectInput: string;
}

export class ResolveRejectModal extends React.Component<ResolveRejectModalProps, ResolveRejectModalState> {

    state = {
        resolveRejectInput: '',
    };

    render() {
        const {open, isResolve, idTask, classes, handleCloseModal} = this.props;

        return <Modal open={open} onClose={handleCloseModal}>
            <div className={classes.paper}>
                <Typography variant="h6" id="modal-title" align={"center"}>
                    {isResolve ? 'Resolve' : 'Reject'} Task with id: <b>{idTask.toString()}</b>
                </Typography>
                <TextField
                    id="standard-textarea"
                    label="Value to send"
                    multiline
                    className={classes.textField}
                    margin="normal"
                    value={this.state.resolveRejectInput}
                    onChange={this.handleChangeResolveRejectText}
                />
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
                    <Button variant={'outlined'} onClick={this.handleResolveRejectClick}>{isResolve ? 'Resolve' : 'Reject'}</Button>
                </div>
            </div>
        </Modal>
    };

    private handleChangeResolveRejectText = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({resolveRejectInput: event.target.value})
    };

    private handleResolveRejectClick = () => {
        this.props.connection.send(JSON.stringify(
            {
                order: this.props.isResolve ? 'resolve' : 'reject',
                idTask: this.props.idTask,
                content: this.state.resolveRejectInput
            }
        ));
        this.props.handleCloseModal();
    };

}

export const ResolveRejectModalStyled = withStyles(styles)(ResolveRejectModal);
