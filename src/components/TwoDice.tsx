import React, { useState } from "react";
import { Button, Container, Row, Col, Stack } from "react-bootstrap";

/**
 * Here is a helper function you *must* use to "roll" your die.
 * The function uses the builtin `random` function of the `Math`
 * module (which returns a random decimal between 0 up until 1) in order
 * to produce a random integer between 1 and 6 (inclusive).
 */
export function d6(): number {
    return 1 + Math.floor(Math.random() * 6);
}

export function TwoDice(): JSX.Element {
    const [dl, dlUpdate] = useState(1);
    const [dr, drUpdate] = useState(2);

    let winMessage = "...";
    if (dl === 1 && dr === 1) {
        winMessage = "You Lose";
    } else if (dl === dr) {
        winMessage = "You Win";
    }

    return (
        <Container>
            <Row>
                <h4>Two Dice Game</h4>
            </Row>
            <Row>
                <Stack direction="horizontal" gap={2}>
                    <Button onClick={() => dlUpdate(() => d6())}>
                        Roll Left
                    </Button>
                    <span data-testid="left-die">{dl}</span>
                    <Button onClick={() => drUpdate(() => d6())}>
                        Roll Right
                    </Button>
                    <span data-testid="right-die">{dr}</span>
                </Stack>
            </Row>
            <Row>
                <Col xs={1}>
                    <span>{winMessage}</span>
                </Col>
            </Row>
        </Container>
    );
}
