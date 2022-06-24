import {Sorter} from "./Sorter";
import {NumbersCollection} from "./NumbersCollection";
import {CharactersCollection} from "./CharactersCollection";
import {LinkedList} from "./LinkedList";

const numberCollection = new NumbersCollection([-8, 2, 0, 1, -10]);
numberCollection.sort();
console.log(numberCollection.data);

const charactersCollection = new CharactersCollection("XaaYvB");
charactersCollection.sort();
console.log(charactersCollection.data);

const linkedList = new LinkedList();
linkedList.add(400);
linkedList.add(-100);
linkedList.add(3);
linkedList.add(4);
linkedList.add(100);

linkedList.sort();
linkedList.print();
