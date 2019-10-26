import React from 'react';
import './Display.css'

export interface IProps {
    value: string,
    operation: string
}


function TopDisplay(props: IProps) {
    return (
        <div className="display">
            <p className="tiny-font"> {props.value} {props.operation} </p>
        </div>
    );
}

export default TopDisplay;
