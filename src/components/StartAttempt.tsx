import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";

const INITIAL_ATTEMPTS = 4;

export function StartAttempt(): JSX.Element {
    const [inProgress, setInPogress] = useState<boolean>(false);
    const [attempts, setAttempts] = useState(INITIAL_ATTEMPTS);

    const addAttempt = () =>
        setAttempts((attempts: number) => {
            if (!inProgress) {
                return attempts + 1;
            }
            return attempts;
        });
    const startQuiz = () => {
        setAttempts((at) => at - 1);
        setInPogress(true);
    };
    const stopQuiz = () => {
        setInPogress(false);
    };

    return (
        <div>
            <h4>Start Attempt</h4>
            <Container>
                <Row xs="auto">
                    <Col>
                        <Button
                            onClick={() => startQuiz()}
                            disabled={attempts == 0 || inProgress}
                        >
                            Start Quiz
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            onClick={() => stopQuiz()}
                            disabled={!inProgress}
                        >
                            Stop Quiz
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            onClick={() => addAttempt()}
                            disabled={inProgress}
                        >
                            Mulligan
                        </Button>
                    </Col>
                    <Col />
                </Row>
                <Row xs="auto">
                    <p>{attempts} attempts remain</p>
                </Row>
            </Container>
        </div>
    );
}
