import {Sorter} from "./Sorter";
import {NumbersCollection} from "./NumbersCollection";
import {CharactersCollection} from "./CharactersCollection";

const numberCollection = new NumbersCollection([-8, 2, 0, 1]);
const sorter = new Sorter(numberCollection);
sorter.sort();
console.log(numberCollection.data);

const charactersCollection = new CharactersCollection("XaaYvB");
const sorter2 = new Sorter(charactersCollection);
sorter2.sort();
console.log(charactersCollection.data);
