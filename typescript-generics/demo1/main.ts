let junkDrawer: any[] = ['Cool String', 41, true];

let companies: Array<string> = ['Google', 'Amazon', 'Microsoft'];

let primeNumbers: Array<number> = [7, 11, 13, 17, 23];

let lastValue = primeNumbers.pop();

function shortenArray<T>(data: Array<T>, amountToShorten: number): Array<T> {
    return data.splice(amountToShorten, data.length);
}

let stringArray: string[] = ['VB', 'C++', 'TypeScript', 'JavaScript', 'Python'];

console.log(shortenArray<string>(stringArray, 2));

