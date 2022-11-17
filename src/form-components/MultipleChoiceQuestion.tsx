import React, { useMemo, useState } from "react";
import { Form } from "react-bootstrap";

export function MultipleChoiceQuestion({
    options,
    expectedAnswer
}: {
    options: string[];
    expectedAnswer: string;
}): JSX.Element {
    const [curSelection, setCurSelection] = useState<string>(options[0]);
    const status = useMemo(() => {
        if (curSelection === expectedAnswer) {
            return "✔️";
        }
        return "❌";
    }, [curSelection, expectedAnswer]);

    return (
        <div>
            <h3>Multiple Choice Question</h3>
            <Form.Group controlId="userEmotions">
                <Form.Label>How do you feel?</Form.Label>
                <Form.Select
                    value={curSelection}
                    onChange={(event) => {
                        setCurSelection(event.target.value);
                    }}
                >
                    {options.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            {status}
        </div>
    );
}
