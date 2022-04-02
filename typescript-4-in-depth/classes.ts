import {Librarian} from "./interfaces";


class UniversityLibrarian implements Librarian {
    name: string;
    email: string;
    department: string;

    assistCustomer(customerName: string): void {
        console.log(this.name + ' is assisting ' + customerName);
    }
}

abstract class ReferenceItem {
    private _publisher: string;
    static department: string = 'Computer Science'

    get publisher(): string {
        return this._publisher
    }

    set publisher(newPublisher: string) {
        this._publisher = newPublisher;
    }

    constructor(public title: string, protected year: number) {
        console.log('Creating a new ReferenceItem...');
    }

    printItem(): void {
        console.log(`${this.title} was published in ${this.year}.`);
        console.log(`Department: ${ReferenceItem.department}`)
    }

    abstract printCitation(): void;

}

class Encyclopedia extends ReferenceItem {

    constructor(newTitle: string, newYear: number, public edition: number) {
        super(newTitle, newYear);
    }

    printItem(): void {
        super.printItem();
        console.log(`Edition: ${this.edition} (${this.year})`);
    }

    printCitation() {
        console.log(`${this.title} - ${this.year}`)
    }
}

export {UniversityLibrarian, ReferenceItem, Encyclopedia};