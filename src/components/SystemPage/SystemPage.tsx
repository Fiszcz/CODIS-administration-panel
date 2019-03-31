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
import {ControlPoint} from "../../Client/Api";

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

const exampleControlPoints: ControlPoint[] = [
    {
        message: 'dfsdfasef sdf se fse ddssds ',
        assignation: 'primary',
        time: new Date(),
    },
    {
        message: 'geroew oer pegfkp dofkg do r ',
        assignation: 'error',
        time: new Date(),
    },
    {
        message: 'fdgokeor eor kfdog dkfd',
        assignation: 'warning',
        time: new Date(),
    },
    {
        message: 'fdgokeor eor kfdog dkfd',
        assignation: '',
        time: new Date(),
    },
    {
        message: 'fdgokeor eor kfdog dkfd',
        assignation: 'success',
        time: new Date(),
    },
    {
        message: 'fdgokeor eor kfdog dkfd kfdog dkfdkfdog dkfdkfdog dkfdkfdog dkfdkfdog dkfdkfdog dkfdkfdog dkfdkfdog dkfdkfdog dkfdkfdog dkfdkfdog dkfdkfdog dkfdkfdog dkfdkfdog dkfdkfdog dkfdkfdog dkfdkfdog dkfdkfdog dkfdkfdog dkfdkfdog dkfdkfdog dkfdkfdog dkfdkfdog dkfdkfdog dkfdkfdog dkfdkfdog dkfdkfdog dkfdkfdog dkfdkfdog dkfdkfdog dkfdkfdog dkfdkfdog dkfd',
        assignation: 'custom',
        time: new Date(),
    },
];

interface SystemPageProps extends WithStyles<typeof style> {
    connection: WebSocket | undefined;
}

interface SystemPageState {
    doneTasks: number;
    executingTasks: number;
    toDoTasks: number;
    nodes: number;
}

export class SystemPage extends React.Component<SystemPageProps, SystemPageState> {

    state = {
        doneTasks: 0,
        executingTasks: 0,
        toDoTasks: 0,
        nodes: 0,
    };

    componentDidMount(): void {
        this.props.connection!.onmessage = (message: { data: string; }) => {
            const {s} = JSON.parse(message.data);
            if (s)
                this.setState({
                    doneTasks: s.tasks - s.waitingTasks - s.runningTasks,
                    executingTasks: s.runningTasks,
                    toDoTasks: s.waitingTasks,
                    nodes: s.nodes,
                });
        };
        this.props.connection!.send(JSON.stringify({order: 'system'}));
    }

    render() {
        const {classes} = this.props;
        return <GridContainerStyled>
            <GridItemStyled xs={12} sm={6} md={3}>
                <CardStyled>
                    <CardHeaderStyled color="success" stats icon>
                        <CardIconStyled color="success">
                            <Done/>
                        </CardIconStyled>
                        <p className={classes.cardCategory}>Done Tasks</p>
                        <h3 className={classes.cardTitle}>{this.state.doneTasks}</h3>
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
                        <h3 className={classes.cardTitle}>{this.state.executingTasks}</h3>
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
                        <h3 className={classes.cardTitle}>{this.state.toDoTasks}</h3>
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
                        <h3 className={classes.cardTitle}>{this.state.nodes}</h3>
                    </CardHeaderStyled>
                </CardStyled>
            </GridItemStyled>
            <GridItemStyled xs={12}>
                <ControlPointsConsole controlPoints={exampleControlPoints}/>
            </GridItemStyled>
        </GridContainerStyled>
    }
}

export const SystemPageStyled = withStyles(style)(SystemPage);
