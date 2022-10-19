import { validatePassword } from "./password";

describe("Testing the validatePassword function", () => {
    test("password length must be 16", () => {
        // length = 15
        expect(validatePassword("123456789012345")).toBe(false);
        // length = 17
        expect(validatePassword("12345678901234567")).toBe(false);
        expect(validatePassword("a$BCDEFGHIJKLMN6")).toBe(true);
    });
    test("password must not start with number", () => {
        expect(validatePassword("1_Asdfghjklzxcvb")).toBe(false);
    });
    test("password must not start with special char", () => {
        expect(validatePassword("(_Asdfghjklasdf6")).toBe(false);
    });
    test("password contains a number", () => {
        expect(validatePassword("A$12345678901234")).toBe(true);
        expect(validatePassword("A$QWERTYUIOPASDF")).toBe(false);
    });
    test("password contains a special char", () => {
        expect(validatePassword("A123456789012345")).toBe(false);
        expect(validatePassword("A$23456780912343")).toBe(true);
    });
});
