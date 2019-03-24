import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
// @material-ui/core components
import {withStyles} from "@material-ui/core";
// core components
import cardHeaderStyle from "../../assets/jss/material-dashboard-react/cardHeaderStyle";

// @material-ui/icons

function CardHeader({ ...props }) {
    const {
        classes,
        className,
        children,
        color,
        plain,
        stats,
        icon,
        ...rest
    } = props;
    const cardHeaderClasses = classNames({
        [classes.cardHeader]: true,
        [classes[color + "CardHeader"]]: color,
        [classes.cardHeaderPlain]: plain,
        [classes.cardHeaderStats]: stats,
        [classes.cardHeaderIcon]: icon,
        [className]: className !== undefined
    });
    return (
        <div className={cardHeaderClasses} {...rest}>
            {children}
        </div>
    );
}

// @ts-ignore
export const CardHeaderStyled = withStyles(cardHeaderStyle)(CardHeader);
