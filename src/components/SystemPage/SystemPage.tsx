import * as React from "react";
import {createStyles, WithStyles, withStyles} from "@material-ui/core";
import {DesktopWindows, Done, ListAlt, Transform} from "@material-ui/icons";
import {GridContainerStyled} from "../Grid/GridContainer";
import {CardHeaderStyled} from "../Card/CardHeader";
import {CardIconStyled} from "../Card/CardIcon";
import {grayColor, hexToRgb, successColor, whiteColor} from "../../assets/jss/material-dashboard-react";
import {GridItemStyled} from "../Grid/GridItem";
import {CardStyled} from "../Card/Card";
import {ControlPointsConsole} from "../ControlPointsConsole/ControlPointsConsole";
import {ControlNotification} from "../../Client/Api";

const style = () => createStyles({
    successText: {
        color: successColor[0]
    },
    upArrowCardCategory: {
        width: "16px",
        height: "16px"
    },
    stats: {
        color: grayColor[0],
        display: "inline-flex",
        fontSize: "12px",
        lineHeight: "22px",
        "& svg": {
            top: "4px",
            width: "16px",
            height: "16px",
            position: "relative",
            marginRight: "3px",
            marginLeft: "3px"
        },
        "& .fab,& .fas,& .far,& .fal,& .material-icons": {
            top: "4px",
            fontSize: "16px",
            position: "relative",
            marginRight: "3px",
            marginLeft: "3px"
        }
    },
    cardCategory: {
        color: grayColor[0],
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        paddingTop: "10px",
        marginBottom: "0"
    },
    cardCategoryWhite: {
        color: "rgba(" + hexToRgb(whiteColor) + ",.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitle: {
        color: grayColor[2],
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: 300,
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: grayColor[1],
            fontWeight: 400,
            lineHeight: "1"
        }
    },
    cardTitleWhite: {
        color: whiteColor,
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: 300,
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: grayColor[1],
            fontWeight: 400,
            lineHeight: "1"
        }
    }
});

interface SystemPageProps extends WithStyles<typeof style> {
    connection: WebSocket | undefined;
}

interface SystemPageState {
    doneTasks: number;
    executingTasks: number;
    toDoTasks: number;
    nodes: number;
    controlNotifications: ControlNotification[];
}

export class SystemPage extends React.Component<SystemPageProps, SystemPageState> {

    state = {
        doneTasks: 0,
        executingTasks: 0,
        toDoTasks: 0,
        nodes: 0,
        controlNotifications: [],
    };

    componentDidMount(): void {
        this.props.connection!.onmessage = (message: { data: string; }) => {
            const {s, n} = JSON.parse(message.data);
            if (s)
                this.setState({
                    doneTasks: s.tasks - s.waitingTasks - s.runningTasks,
                    executingTasks: s.runningTasks,
                    toDoTasks: s.waitingTasks,
                    nodes: s.nodes,
                });
            if (n)
                this.setState((prevState) => {
                    return {
                        controlNotifications: prevState.controlNotifications.concat(n.map((controlNotification: any) => {
                            return {...controlNotification, time: new Date(controlNotification.time)}
                        })),
                    }
                });
        };
        this.props.connection!.send(JSON.stringify({order: 'system'}));
    }

    render() {
        const {classes} = this.props;
        const {doneTasks, executingTasks, toDoTasks, nodes, controlNotifications} = this.state;

        return <GridContainerStyled>
            <GridItemStyled xs={12} sm={6} md={3}>
                <CardStyled>
                    <CardHeaderStyled color="success" stats icon>
                        <CardIconStyled color="success">
                            <Done/>
                        </CardIconStyled>
                        <p className={classes.cardCategory}>Done Tasks</p>
                        <h3 className={classes.cardTitle}>{doneTasks}</h3>
                    </CardHeaderStyled>
                </CardStyled>
            </GridItemStyled>
            <GridItemStyled xs={12} sm={6} md={3}>
                <CardStyled>
                    <CardHeaderStyled color="warning" stats icon>
                        <CardIconStyled color="warning">
                            <Transform/>
                        </CardIconStyled>
                        <p className={classes.cardCategory}>Executing Tasks</p>
                        <h3 className={classes.cardTitle}>{executingTasks}</h3>
                    </CardHeaderStyled>
                </CardStyled>
            </GridItemStyled>
            <GridItemStyled xs={12} sm={6} md={3}>
                <CardStyled>
                    <CardHeaderStyled color="danger" stats icon>
                        <CardIconStyled color="danger">
                            <ListAlt/>
                        </CardIconStyled>
                        <p className={classes.cardCategory}>To Do Tasks</p>
                        <h3 className={classes.cardTitle}>{toDoTasks}</h3>
                    </CardHeaderStyled>
                </CardStyled>
            </GridItemStyled>
            <GridItemStyled xs={12} sm={6} md={3}>
                <CardStyled>
                    <CardHeaderStyled color="info" stats icon>
                        <CardIconStyled color="info">
                            <DesktopWindows/>
                        </CardIconStyled>
                        <p className={classes.cardCategory}>Nodes</p>
                        <h3 className={classes.cardTitle}>{nodes}</h3>
                    </CardHeaderStyled>
                </CardStyled>
            </GridItemStyled>
            <GridItemStyled xs={12}>
                <ControlPointsConsole controlPoints={controlNotifications}/>
            </GridItemStyled>
        </GridContainerStyled>
    }
}

export const SystemPageStyled = withStyles(style)(SystemPage);
