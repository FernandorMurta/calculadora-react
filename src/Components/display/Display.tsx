import React from 'react';
import './Display.css'
import TopDisplay from "./TopDisplay";
import BottomDisplay from "./BottomDisplay";

export interface IProps {
    value: string
}


function Display(props: IProps) {
    return (
        <div className="display">
            <TopDisplay value='teste' operation='hehe'/>
            <BottomDisplay value={props.value}/>
        </div>
    );
}

export default Display;
