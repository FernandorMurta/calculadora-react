import React from 'react';
import './Button.css'

export interface IProps {
    label: string
    class: boolean
    double: boolean
    triple: boolean
    click: any
}

function setClass(props: IProps): string {
    return 'button ' + operation(props.class) + ' ' + double(props.double) + ' ' + triple(props.triple);
}

function operation(operation: boolean) {
    return `${operation ? 'operation' : ''}`
}

function double(double: boolean) {
    return `${double ? 'double' : ''}`
}

function triple(triple: boolean) {
    return `${triple ? 'triple' : ''}`
}

function Button(props: IProps) {
    return (
        <button className={setClass(props)}
                onClick={() => props.click && props.click(props.label)}>{props.label}</button>
    );
}

export default Button;
