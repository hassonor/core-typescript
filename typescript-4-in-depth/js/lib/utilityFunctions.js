"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaxBooksAllowed = exports.CalculateLateFee = void 0;
function CalculateLateFee(daysLate) {
    return daysLate * .75;
}
exports.CalculateLateFee = CalculateLateFee;
function MaxBooksAllowed(age) {
    if (age < 18) {
        return 3;
    }
    else {
        return 20;
    }
}
exports.MaxBooksAllowed = MaxBooksAllowed;
function privateFunc() {
    console.log('This is private :)...');
}
