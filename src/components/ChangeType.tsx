import React, { useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { QuestionType } from "../interfaces/question";

const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
    multiple_choice_question: "Multiple Choice",
    short_answer_question: "Short Answer"
};

export function ChangeType(): JSX.Element {
    const [curType, setType] = useState<QuestionType>(
        () => "short_answer_question"
    );
    const typeLabel = useMemo(() => QUESTION_TYPE_LABELS[curType], [curType]);

    return (
        <div>
            <h4>Change Type</h4>
            <div>
                <Button
                    onClick={() =>
                        setType((lt) => {
                            if (lt === "multiple_choice_question") {
                                return "short_answer_question";
                            }
                            if (lt === "short_answer_question") {
                                return "multiple_choice_question";
                            }
                            return "short_answer_question";
                        })
                    }
                >
                    Change Type
                </Button>
                <p>{typeLabel}</p>
            </div>
        </div>
    );
}
