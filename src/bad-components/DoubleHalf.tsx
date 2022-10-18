import React, { Dispatch, SetStateAction, useState } from "react";
import { Button } from "react-bootstrap";

interface ButtonProps {
    setDhValue: Dispatch<SetStateAction<number>>;
}

function Doubler({ setDhValue }: ButtonProps): JSX.Element {
    return (
        <Button onClick={() => setDhValue((dhValue) => 2 * dhValue)}>
            Double
        </Button>
    );
}

function Halver({ setDhValue }: ButtonProps): JSX.Element {
    return (
        <Button onClick={() => setDhValue((dhValue) => 0.5 * dhValue)}>
            Halve
        </Button>
    );
}

const INITIAL_DOUBLE_HALF_VALUE = 10;

export function DoubleHalf(): JSX.Element {
    const [dhValue, setDhValue] = useState(INITIAL_DOUBLE_HALF_VALUE);

    return (
        <div>
            <h3>Double Half</h3>
            <div>
                The current value is: <span>{dhValue}</span>
            </div>
            <Doubler setDhValue={setDhValue}></Doubler>
            <Halver setDhValue={setDhValue}></Halver>
        </div>
    );
}
