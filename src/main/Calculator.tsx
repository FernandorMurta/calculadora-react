import React from 'react'
import './Calculator.css'
import Button from "../Components/button/Button";
import BottomDisplay from "../Components/display/BottomDisplay";
import TopDisplay from "../Components/display/TopDisplay";

export interface IProps {

}

export interface IState {
    displayValue: string
    cleanDisplay: boolean
    operation: any
    values: Array<any>
    current: number
}

class Calculator extends React.Component<IProps, IState> {

    cleanState = {
        displayValue: '0',
        cleanDisplay: false,
        operation: null,
        values: [0, 0],
        current: 0
    };

    constructor(props: IProps) {
        super(props);
        this.state = this.cleanState;
    }


    private cleanMemory(): void {
        this.setState(this.cleanState);
    }

    private setOperation(operation: string): void {

        if(this.state.current === 0 && operation === '='){
            return
        }

        if (this.state.current === 0) {
            this.setState({displayValue: '0', operation, current: 1, cleanDisplay: true})
        } else {
            const equals = operation === '=';
            const currentOperation = this.state.operation;

            const values = [...this.state.values];
            try {
                values[0] = Calculator.executeOperation(values[0], currentOperation, values[1]);
            } catch (e) {
                values[0] = this.state.values[0]
            }
            values[1] = 0;

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                cleanDisplay: !equals,
                values
            })
        }
    }

    private static executeOperation(firstNumber: number, operation: string, secondNumber: number): number{

        switch (operation) {
            case '+': {
                return firstNumber + secondNumber;
            }

            case '-': {
                return firstNumber - secondNumber;
            }

            case '*': {
                return firstNumber * secondNumber;
            }

            case '/': {
                return firstNumber / secondNumber;
            }
        }

        return 0;
    }

    public setDigit(digit: string): void {
        if (digit === '.' && this.state.displayValue.includes('.')) {
            return
        }

        const clearDisplay = this.state.displayValue === '0' || this.state.cleanDisplay;
        const currentValue = clearDisplay ? '' : this.state.displayValue;
        const displayValue = currentValue + digit;

        this.setState({displayValue, cleanDisplay: false});

        if (digit !== '.') {
            const current = this.state.current
            const newValue = parseFloat(displayValue);
            const values = [...this.state.values];
            values[current] = newValue;
            this.setState({values})
        }
    }

    public render(): JSX.Element {
        const addDigit = (digit: string) => this.setDigit(digit);
        const setOperation = (operation: string) => this.setOperation(operation);
        return (
            <h1 className="calculator">
                <TopDisplay value={this.state.values[0]} operation={this.state.operation}/>
                <BottomDisplay value={this.state.displayValue}/>
                <Button label="AC" class={false} double={false} triple={true} click={() => this.cleanMemory()}/>
                <Button label="/" class={true} double={false} triple={false} click={setOperation}/>
                <Button label="7" class={false} double={false} triple={false} click={addDigit}/>
                <Button label="8" class={false} double={false} triple={false} click={addDigit}/>
                <Button label="9" class={false} double={false} triple={false} click={addDigit}/>
                <Button label="*" class={true} double={false} triple={false} click={setOperation}/>
                <Button label="4" class={false} double={false} triple={false} click={addDigit}/>
                <Button label="5" class={false} double={false} triple={false} click={addDigit}/>
                <Button label="6" class={false} double={false} triple={false} click={addDigit}/>
                <Button label="-" class={true} double={false} triple={false} click={setOperation}/>
                <Button label="1" class={false} double={false} triple={false} click={addDigit}/>
                <Button label="2" class={false} double={false} triple={false} click={addDigit}/>
                <Button label="3" class={false} double={false} triple={false} click={addDigit}/>
                <Button label="+" class={true} double={false} triple={false} click={setOperation}/>
                <Button label="0" class={false} double={true} triple={false} click={addDigit}/>
                <Button label="." class={false} double={false} triple={false} click={addDigit}/>
                <Button label="=" class={true} double={false} triple={false} click={setOperation}/>
            </h1>
        )
    }
}

export default Calculator;
