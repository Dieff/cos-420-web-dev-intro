const digitRegex = RegExp(/\d/);
const specialRegex = RegExp(/\W/);
const letterRegex = RegExp(/[A-Za-z]/);

export function validatePassword(password: string): boolean {
    if (password.length !== 16) {
        return false;
    }
    const firstChar = password[0];
    // tell if first character is numeric
    if (digitRegex.test(firstChar)) {
        return false;
    }
    // tell i first character is special (not a upper or lower case letter or number)
    if (specialRegex.test(firstChar)) {
        return false;
    }
    // contains a number somewhere
    if (!digitRegex.test(password)) {
        return false;
    }
    // contains a special char somewhere (included space)
    if (!specialRegex.test(password)) {
        return false;
    }
    if (!letterRegex.test(password)) {
        return false;
    }

    return true;
}
