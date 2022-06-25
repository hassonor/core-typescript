import fs from 'fs';
import {CsvFileReader} from "./CsvFileReader";
import {MatchResult} from "./MatchResults";

const reader = new CsvFileReader("football.csv");
reader.read();


let manUnitedWins = 0;

for (let match of reader.data) {
    if (match[1] === 'Man United' && match[5] === MatchResult.HomeWin) {
        manUnitedWins++;
    } else if (match[2] === 'Man United' && match[5] === MatchResult.AwayWin) {
        manUnitedWins++;
    }
}

console.log(`Man United won ${manUnitedWins} games`);

