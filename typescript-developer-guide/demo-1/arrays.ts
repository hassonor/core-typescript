const carMakers: string[] = ['ford', 'bmw', 'chevy'];
const dates: Date[] = [new Date(), new Date()];

const carsByMake: string[][] = [];

// Help with inference when extracting values
const car = carMakers[0];
const myCar = carMakers.pop();

// Flexible types
const importantDates: (Date | string)[] = [new Date()];
importantDates.push('1987-02-27');
importantDates.push(new Date());
