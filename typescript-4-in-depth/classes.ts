import {Book, DamageLogger, Author, Librarian} from "./interfaces";


class UniversityLibrarian implements Librarian {
    name: string;
    email: string;
    department: string;

    assistCustomer(customerName: string): void {
        console.log(this.name + ' is assisting ' + customerName);
    }
}

export {UniversityLibrarian};