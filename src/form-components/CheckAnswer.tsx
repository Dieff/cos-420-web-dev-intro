import React, { useMemo, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";

export function CheckAnswer({
    expectedAnswer
}: {
    expectedAnswer: string;
}): JSX.Element {
    const [userAnswer, setUserAnswer] = useState<string>("");
    const answerStatus = useMemo(() => {
        if (userAnswer === expectedAnswer) {
            return "✔️";
        }
        return "❌";
    }, [userAnswer]);

    return (
        <Container>
            <Col>
                <Row>
                    <h3>Check Answer</h3>
                </Row>
                <Row>
                    <Form.Control
                        value={userAnswer}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setUserAnswer(e.target.value);
                        }}
                    />
                    <Form.Label>{answerStatus}</Form.Label>
                </Row>
            </Col>
        </Container>
    );
}
