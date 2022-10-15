import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";

// prettier-ignore
type Holiday =
      "🚩" /*  May Day, May 1 */ 
    | "🥧" /* Pie Day, March 14 */ 
    | "🎂" /* Birthday, Feb 19 */ 
    | "🎃" /* Halloween, Oct 31 */ 
    | "🐻" /* Maine Day, April 26 */ ;

const HOLIDAY_BY_DATE: Record<Holiday, Holiday> = {
    "🎂": "🥧",
    "🥧": "🐻",
    "🐻": "🚩",
    "🚩": "🎃",
    "🎃": "🎂"
};

const HOLIDAY_BY_LETTER: Record<Holiday, Holiday> = {
    "🎂": "🎃",
    "🎃": "🐻",
    "🐻": "🚩",
    "🚩": "🥧",
    "🥧": "🎂"
};

export function CycleHoliday(): JSX.Element {
    const [curHoliday, setHoliday] = useState<Holiday>("🐻");

    const advanceByDate = () => {
        setHoliday((oh) => HOLIDAY_BY_DATE[oh]);
    };
    const advanceByLetter = () => {
        setHoliday((oh) => HOLIDAY_BY_LETTER[oh]);
    };

    return (
        <div>
            <h4>Cycle Holiday</h4>
            <Container>
                <Row>
                    <Col xs={2}>
                        <span>Holiday: {curHoliday}</span>
                    </Col>
                </Row>
                <Row>
                    <Col xs={2}>
                        <Button onClick={() => advanceByDate()}>
                            Advance by Year
                        </Button>
                    </Col>
                    <Col xs={2}>
                        <Button onClick={() => advanceByLetter()}>
                            Advance by Alphabet
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
