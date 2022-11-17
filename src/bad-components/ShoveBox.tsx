import React, { useState } from "react";
import { Button } from "react-bootstrap";

interface SBButtonProps {
    setPosition: () => void;
}

const ShoveBoxButton: React.FC<SBButtonProps> = (props) => {
    return <Button onClick={() => props.setPosition()}>Shove the Box</Button>;
};

interface MoveableBoxProps {
    position: number;
}

const MoveableBox: React.FC<MoveableBoxProps> = (props) => {
    return (
        <div
            data-testid="moveable-box"
            style={{
                width: "50px",
                height: "50px",
                backgroundColor: "lightblue",
                border: "1px solid blue",
                display: "inline-block",
                verticalAlign: "bottom",
                marginLeft: `${props.position}px`
            }}
        ></div>
    );
};

export function ShoveBox(): JSX.Element {
    const [position, setPosition] = useState<number>(10);

    const shiftBox = () => {
        setPosition((bp) => bp + 4);
    };

    return (
        <div>
            <h3>Shove Box</h3>
            <span>The box is at: {position}</span>
            <div>
                <ShoveBoxButton setPosition={shiftBox} />
                <MoveableBox position={position} />
            </div>
        </div>
    );
}
