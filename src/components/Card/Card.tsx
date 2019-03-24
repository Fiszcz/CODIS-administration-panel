import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import cardStyle from "../../assets/jss/material-dashboard-react/cardStyle";
// core components

// @material-ui/icons

function Card({ ...props }) {
    const {
        classes,
        className,
        children,
        plain,
        profile,
        chart,
        ...rest
    } = props;
    const cardClasses = classNames({
        [classes.card]: true,
        [classes.cardPlain]: plain,
        [classes.cardProfile]: profile,
        [classes.cardChart]: chart,
        [className]: className !== undefined
    });
    return (
        <div className={cardClasses} {...rest}>
            {children}
        </div>
    );
}

// @ts-ignore
export const CardStyled = withStyles(cardStyle)(Card);
