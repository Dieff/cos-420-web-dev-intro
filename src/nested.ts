import { Answer } from "./interfaces/answer";
import { Question, QuestionType } from "./interfaces/question";
import { duplicateQuestion, makeBlankQuestion } from "./objects";

/**
 * Consumes an array of questions and returns a new array with only the questions
 * that are `published`.
 */
export function getPublishedQuestions(questions: Question[]): Question[] {
    return questions
        .filter(({ published }) => published)
        .map((q) => ({ ...q })); // copy the question objects
}

/**
 * Consumes an array of questions and returns a new array of only the questions that are
 * considered "non-empty". An empty question has an empty string for its `body` and
 * `expected`, and an empty array for its `options`.
 */
export function getNonEmptyQuestions(questions: Question[]): Question[] {
    // confusing prettier issue here:
    // prettier-ignore
    return questions.filter(({ body, expected, options }) =>
        body.length > 0 || expected.length > 0 || options.length > 0
    );
}

/***
 * Consumes an array of questions and returns the question with the given `id`. If the
 * question is not found, return `null` instead.
 */
export function findQuestion(
    questions: Question[],
    id: number
): Question | null {
    const search_result = questions.find(({ id: qid }) => id === qid);
    if (search_result) {
        return search_result;
    }
    return null;
}

/**
 * Consumes an array of questions and returns a new array that does not contain the question
 * with the given `id`.
 */
export function removeQuestion(questions: Question[], id: number): Question[] {
    return questions.filter(({ id: qid }) => qid !== id);
}

/***
 * Consumes an array of questions and returns a new array containing just the names of the
 * questions, as an array.
 */
export function getNames(questions: Question[]): string[] {
    return questions.map(({ name }) => name);
}

/***
 * Consumes an array of questions and returns the sum total of all their points added together.
 */
export function sumPoints(questions: Question[]): number {
    return questions.reduce((sum, { points }) => sum + points, 0);
}

/***
 * Consumes an array of questions and returns the sum total of the PUBLISHED questions.
 */
export function sumPublishedPoints(questions: Question[]): number {
    // is it ok to reuse functions I have already implemented?
    return sumPoints(getPublishedQuestions(questions));
}

/***
 * Consumes an array of questions, and produces a Comma-Separated Value (CSV) string representation.
 * A CSV is a type of file frequently used to share tabular data; we will use a single string
 * to represent the entire file. The first line of the file is the headers "id", "name", "options",
 * "points", and "published". The following line contains the value for each question, separated by
 * commas. For the `options` field, use the NUMBER of options.
 *
 * Here is an example of what this will look like (do not include the border).
 *`
id,name,options,points,published
1,Addition,0,1,true
2,Letters,0,1,false
5,Colors,3,1,true
9,Shapes,3,2,false
` *
 * Check the unit tests for more examples!
 */
export function toCSV(questions: Question[]): string {
    return questions.reduce(
        (csv, cq) =>
            `${csv}\n${cq.id},${cq.name},${cq.options.length},${cq.points},${cq.published}`,
        "id,name,options,points,published"
    );
}

/**
 * Consumes an array of Questions and produces a corresponding array of
 * Answers. Each Question gets its own Answer, copying over the `id` as the `questionId`,
 * making the `text` an empty string, and using false for both `submitted` and `correct`.
 */
export function makeAnswers(questions: Question[]): Answer[] {
    return questions.map(({ id }) => ({
        questionId: id,
        text: "",
        submitted: false,
        correct: false
    }));
}

/***
 * Consumes an array of Questions and produces a new array of questions, where
 * each question is now published, regardless of its previous published status.
 */
export function publishAll(questions: Question[]): Question[] {
    return questions.map((q) => ({ ...q, published: true }));
}

/***
 * Consumes an array of Questions and produces whether or not all the questions
 * are the same type. They can be any type, as long as they are all the SAME type.
 */
export function sameType(questions: Question[]): boolean {
    // it may actually be better to use a for loop here because
    // then we could break it when the condition fails and save time
    return questions.reduce((status, { type }, ind, arr) => {
        if (ind > 0) {
            const prev_question = arr[ind - 1];
            return status && prev_question.type === type;
        }
        return status;
    }, true as boolean);
}

/***
 * Consumes an array of Questions and produces a new array of the same Questions,
 * except that a blank question has been added onto the end. Reuse the `makeBlankQuestion`
 * you defined in the `objects.ts` file.
 */
export function addNewQuestion(
    questions: Question[],
    id: number,
    name: string,
    type: QuestionType
): Question[] {
    return [...questions, makeBlankQuestion(id, name, type)];
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its name should now be `newName`.
 */
export function renameQuestionById(
    questions: Question[],
    targetId: number,
    newName: string
): Question[] {
    return questions.map((q) => ({
        ...q,
        name: q.id === targetId ? newName : q.name
    }));
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `type` should now be the `newQuestionType`
 * AND if the `newQuestionType` is no longer "multiple_choice_question" than the `options`
 * must be set to an empty list.
 */
export function changeQuestionTypeById(
    questions: Question[],
    targetId: number,
    newQuestionType: QuestionType
): Question[] {
    return questions.map((q) => {
        const nq = { ...q };
        if (nq.id === targetId) {
            nq.type = newQuestionType;
            if (nq.type !== "multiple_choice_question") {
                nq.options = [];
            }
        }
        return nq;
    });
}

/**
 * Mutates a list to add or replace an option
 * @param options a list to be mutated
 * @param targetOptionIndex index or -1
 * @param newOption: string
 */
function replaceOrAppend<T>(
    options: T[],
    targetOptionIndex: number,
    newOption: T
) {
    if (targetOptionIndex < -1) {
        throw new Error("targetOptionIndex must be -1 or an array index");
    }
    if (targetOptionIndex == -1) {
        options.push(newOption);
        return;
    }
    if (targetOptionIndex < options.length) {
        options[targetOptionIndex] = newOption;
        return;
    }
    // if the targetOptionIndex is greater, do nothing
}

/**
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `option` array should have a new element.
 * If the `targetOptionIndex` is -1, the `newOption` should be added to the end of the list.
 * Otherwise, it should *replace* the existing element at the `targetOptionIndex`.
 *
 * Remember, if a function starts getting too complicated, think about how a helper function
 * can make it simpler! Break down complicated tasks into little pieces.
 */
export function editOption(
    questions: Question[],
    targetId: number,
    targetOptionIndex: number,
    newOption: string
): Question[] {
    return questions.map((q) => {
        const nq = { ...q, options: [...q.options] };
        if (nq.id === targetId) {
            replaceOrAppend(nq.options, targetOptionIndex, newOption);
        }
        return nq;
    });
}

/***
 * Consumes an array of questions, and produces a new array based on the original array.
 * The only difference is that the question with id `targetId` should now be duplicated, with
 * the duplicate inserted directly after the original question. Use the `duplicateQuestion`
 * function you defined previously; the `newId` is the parameter to use for the duplicate's ID.
 */
export function duplicateQuestionInArray(
    questions: Question[],
    targetId: number,
    newId: number
): Question[] {
    return questions.reduce<Question[]>((new_q_array, question) => {
        new_q_array.push(question);
        if (question.id === targetId) {
            new_q_array.push(duplicateQuestion(newId, question));
        }
        return new_q_array;
    }, []);
}
