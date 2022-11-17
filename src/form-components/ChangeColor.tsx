import React, { useState } from "react";
import { Form } from "react-bootstrap";

const COLORS = [
    "darkcyan",
    "hotpink",
    "lemonchiffon",
    "salmon",
    "yellowgreen",
    "springgreen",
    " mediumslateblue",
    "lavenderblush",
    "aquamarine"
];

export function ChangeColor(): JSX.Element {
    const [color, setColor] = useState<string>(COLORS[0]);

    return (
        <div>
            <h3>Change Color</h3>
            <Form.Group>
                {COLORS.map((c) => (
                    <Form.Check
                        type="radio"
                        key={c}
                        onChange={() => setColor(c)}
                        label={c}
                        value={c}
                        checked={c == color}
                        inline
                    />
                ))}
            </Form.Group>
            <span>
                You have chosen{" "}
                <span
                    data-testid="colored-box"
                    style={{ backgroundColor: color, padding: "0.2rem" }}
                >
                    {color}
                </span>
                .
            </span>
        </div>
    );
}
