import * as React from "react";

export const TimeField = (props: {date: Date | null}) => {
    return !!props.date ? <>{props.date.toLocaleTimeString()} <br/> {props.date.toLocaleDateString()}</> : '-';
};
