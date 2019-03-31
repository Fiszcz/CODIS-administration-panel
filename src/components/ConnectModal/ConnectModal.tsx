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
    isConnected: boolean;
    keyToConnection: string;
    address: string;
    handleChangeAddress(event: React.ChangeEvent<HTMLInputElement>): void;
    handleChangeKey(event: React.ChangeEvent<HTMLInputElement>): void;
    handleClickConnect(): void;
}

export class ConnectModal extends React.Component<ResolveRejectModalProps> {

    render() {
        const {
            isConnected,
            classes,
            address,
            keyToConnection,
            handleChangeAddress,
            handleChangeKey,
            handleClickConnect,
        } = this.props;

        return <Modal open={!isConnected}>
            <div className={classes.paper}>
                <Typography variant="h6" id="modal-title" align={"center"}>
                    Connect with Administration API
                </Typography>
                <TextField
                    id="address"
                    label="Address"
                    className={classes.textField}
                    margin="normal"
                    value={address}
                    onChange={handleChangeAddress}
                />
                <TextField
                    id="key"
                    label="Key"
                    className={classes.textField}
                    margin="normal"
                    value={keyToConnection}
                    onChange={handleChangeKey}
                />
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
                    <Button variant={'outlined'} onClick={handleClickConnect}>Connect</Button>
                </div>
            </div>
        </Modal>
    };

}

export const ConnectModalStyled = withStyles(styles)(ConnectModal);
