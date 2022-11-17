import React, { useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";

export function GiveAttempts(): JSX.Element {
    const [remainingAttempts, setRemainingAttempts] = useState<number>(3);
    const [attemptAdd, setAttemptAdd] = useState<string>("0");

    return (
        <div>
            <h3>Give Attempts</h3>
            <Container>
                <Row>
                    <Col>
                        <Button
                            disabled={remainingAttempts === 0}
                            onClick={() => {
                                setRemainingAttempts((ra) => {
                                    if (ra > 0) {
                                        return ra - 1;
                                    }
                                    return 0;
                                });
                            }}
                        >
                            use
                        </Button>
                    </Col>
                    <Form.Group as={Row}>
                        <Col>
                            <Form.Control
                                type="number"
                                value={attemptAdd}
                                onChange={(e) => {
                                    setAttemptAdd(e.target.value);
                                }}
                            />
                        </Col>
                        <Col>
                            <Button
                                onClick={() => {
                                    const attemptInt = parseInt(attemptAdd);
                                    if (!isNaN(attemptInt) && attemptInt > 0) {
                                        setRemainingAttempts(
                                            (ra) => ra + attemptInt
                                        );
                                    }
                                    setAttemptAdd("0");
                                }}
                            >
                                gain
                            </Button>
                        </Col>
                    </Form.Group>
                </Row>
                <Row>You have {remainingAttempts} attempts remaining.</Row>
            </Container>
        </div>
    );
}
