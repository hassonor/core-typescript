function CalculateLateFee(daysLate: number): number {
    return daysLate * .75;
}

function MaxBooksAllowed(age: number): number {
    if (age < 18) {
        return 3;
    } else {
        return 20;
    }
}

function privateFunc(): void {
    console.log('This is private :)...');
}

export {CalculateLateFee, MaxBooksAllowed};