import React, { useState } from "react";
import { Button } from "react-bootstrap";

export const COLORS = ["red", "blue", "green"];
const DEFAULT_COLOR_INDEX = 0;

interface ChangeColorProps {
    changeState: () => void;
}

const ChangeColor: React.FC<ChangeColorProps> = (props) => {
    return <Button onClick={() => props.changeState()}>Next Color</Button>;
};

interface ColorPreviewProps {
    index: number;
}

const ColorPreview: React.FC<ColorPreviewProps> = (props) => {
    return (
        <div
            data-testid="colored-box"
            style={{
                width: "50px",
                height: "50px",
                backgroundColor: COLORS[props.index],
                display: "inline-block",
                verticalAlign: "bottom",
                marginLeft: "5px"
            }}
        ></div>
    );
};

export function ColoredBox(): JSX.Element {
    const [colorIndex, setColorIndex] = useState<number>(DEFAULT_COLOR_INDEX);
    const updateIndex = () => {
        setColorIndex((index) => (index + 1) % COLORS.length);
    };

    return (
        <div>
            <h3>Colored Box</h3>
            <span>The current color is: {COLORS[DEFAULT_COLOR_INDEX]}</span>
            <div>
                <ChangeColor changeState={updateIndex}></ChangeColor>
                <ColorPreview index={colorIndex}></ColorPreview>
            </div>
        </div>
    );
}
