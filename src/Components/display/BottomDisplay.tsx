import React from 'react';
import './Display.css'

export interface IProps {
    value: string
}


function BottomDisplay(props: IProps) {
    return (
        <div className="display">
            {props.value}
        </div>
    );
}

export default BottomDisplay;
