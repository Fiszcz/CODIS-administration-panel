import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import cardFooterStyle from "../../assets/jss/material-dashboard-react/cardFooterStyle";
// @material-ui/icons

// core components

function CardFooter({ ...props }) {
    const {
        classes,
        className,
        children,
        plain,
        profile,
        stats,
        chart,
        ...rest
    } = props;
    const cardFooterClasses = classNames({
        [classes.cardFooter]: true,
        [classes.cardFooterPlain]: plain,
        [classes.cardFooterProfile]: profile,
        [classes.cardFooterStats]: stats,
        [classes.cardFooterChart]: chart,
        [className]: className !== undefined
    });
    return (
        <div className={cardFooterClasses} {...rest}>
            {children}
        </div>
    );
}

CardFooter.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    plain: PropTypes.bool,
    profile: PropTypes.bool,
    stats: PropTypes.bool,
    chart: PropTypes.bool
};

// @ts-ignore
export const CardFooterStyled = withStyles(cardFooterStyle)(CardFooter);
