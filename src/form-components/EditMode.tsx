import React, { useEffect, useMemo, useState } from "react";
import { Container, Row, Form, Col } from "react-bootstrap";

interface EditToggleProps {
    isEditing: boolean;
    toggleEditing: () => void;
}

const EditToggle: React.FC<EditToggleProps> = (props) => (
    <Form.Check
        type="switch"
        label="Edit"
        checked={props.isEditing}
        onChange={props.toggleEditing}
    />
);

export function EditMode(): JSX.Element {
    const [name, setName] = useState<string>("Your Name");
    const [isStudent, setIsStudent] = useState<boolean>(true);
    const displayText = useMemo(() => {
        if (isStudent) {
            return `${name} is a student`;
        }
        return `${name} is not a student`;
    }, [name, isStudent]);
    const [editing, setEditing] = useState<boolean>(false);
    // reset the name when edit mode starts.
    useEffect(() => {
        if (editing) {
            setName("");
        }
    }, [editing]);

    return (
        <div>
            <h3>Edit Mode</h3>
            <Container>
                {editing ? (
                    <Row>
                        <Col> {displayText} </Col>
                        <Col>
                            <Form.Control
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Check
                                    type="checkbox"
                                    id="student"
                                    name="student"
                                    label="student"
                                    checked={isStudent}
                                    onChange={() => setIsStudent((s) => !s)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <EditToggle
                                isEditing={editing}
                                toggleEditing={() => setEditing((e) => !e)}
                            />
                        </Col>
                    </Row>
                ) : (
                    <Row>
                        <Col> {displayText} </Col>
                        <Col>
                            <EditToggle
                                isEditing={editing}
                                toggleEditing={() => setEditing((e) => !e)}
                            />
                        </Col>
                    </Row>
                )}
            </Container>
        </div>
    );
}
