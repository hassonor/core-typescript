import {Category} from "./enum";
import {Book, DamageLogger, Author, Librarian, Magazine} from './interfaces';
import {Encyclopedia, ReferenceItem, UniversityLibrarian} from "./classes";
import {CalculateLateFee as CalcFee, MaxBooksAllowed, Purge} from "./lib/utilityFunctions";
import Shelf from './shelf';

function GetAllBooks(): Book[] {
    let books = [
        {id: 1, title: 'Ulysses', author: 'James Joyce', available: true, category: Category.Fiction},
        {
            id: 2,
            title: 'A Farewell to Arms',
            author: 'Ernest Hemingway',
            available: false,
            category: Category.Fiction
        },
        {
            id: 3,
            title: 'I Know Why the Caged Bird Sings',
            author: 'Maya Angelou',
            available: true,
            category: Category.Poetry
        },
        {id: 4, title: 'Moby Dick', author: 'Herman Melville', available: true, category: Category.Fiction}
    ];
    return books;
}

function LogFirstAvailable(books = GetAllBooks()): void {
    let numberOfBooks: number = books.length;
    let firstAvailable: string = '';

    for (let currentBook of books) {

        if (currentBook.available) {
            firstAvailable = currentBook.title;
            break;
        }
    }
    console.log('Total Books: ' + numberOfBooks);
    console.log('First Available: ' + firstAvailable);
}

function GetBookTitlesByCategory(categoryFilter: Category = Category.Fiction): Array<string> {
    console.log('Getting books in category: ' + Category[categoryFilter]);

    const allBooks = GetAllBooks();
    const filteredTitles: string[] = [];

    for (let currentBook of allBooks) {
        if (currentBook.category === categoryFilter) {
            filteredTitles.push(currentBook.title);
        }
    }

    return filteredTitles;
}

function LogBookTitles(titles: string[]): void {
    for (let title of titles) {
        console.log(title);
    }
}

LogFirstAvailable();


function getBookByID(id: number): Book {
    const allBooks = GetAllBooks();
    return allBooks.filter(book => book.id === id)[0];
}

function CreateCustomerID(name: string, id: number): string {
    return name + id;
}

function createCustomer(name: string, age?: number, city?: string): void {
    console.log('Creating customer ' + name);
    if (age) {
        console.log('Age: ' + age);
    }
    if (city) {
        console.log('City: ' + city);
    }
}

function CheckoutBooks(customer: string, ...bookIDs: number[]): string[] {
    console.log('Checking out books for ' + customer);

    let booksCheckedOut: string[] = [];

    for (let id of bookIDs) {
        let book = getBookByID(id);
        if (book.available) {
            booksCheckedOut.push(book.title);
        }
    }
    return booksCheckedOut;
}


// *******************************************


let IdGenerator: (chars: string, nums: number) => string;
IdGenerator = CreateCustomerID;

let IdGenerator2: (chars: string, nums: number) => string;
IdGenerator2 = (name: string, id: number) => {
    return name + id;
}

let myID: string = IdGenerator('daniel', 10);
console.log(myID);

// **************************************************************

// const fictionBooks = GetBookTitlesByCategory(Category.Fiction);
// fictionBooks.forEach((val, idx, arr) => console.log(++idx + ' - ' + val));


/** Overloading Example **/
function GetTitles(author: string): string[];

function GetTitles(author: string, available: boolean): string[];
function GetTitles(author: string, available?: boolean): string[] {
    const allBooks = GetAllBooks();
    const searchResults: string[] = [];

    if (available !== undefined) {
        for (let book of allBooks) {
            if (book.author === author && book.available === available) {
                searchResults.push(book.title);
            }
        }
    } else {
        for (let book of allBooks) {
            if (book.author === author) {
                searchResults.push(book.title);
            }
        }
    }
    return searchResults;
}

let myBooks: string[] = GetTitles('James Joyce', false);
myBooks.forEach(title => console.log(title));


function PrintBook(currentBook: Book): void {
    console.log(currentBook.title + ' by ' + currentBook.author);
}

let myBook = {
    id: 5,
    title: 'Pride and Prejudice',
    author: 'Or Hasson',
    available: true,
    category: Category.Biography,
    pages: 250,
    markDamaged: (reason: string) => console.log('Damaged: ' + reason)
}

PrintBook(myBook);
myBook.markDamaged('My Dog eat the book');

let logDamage: DamageLogger;
logDamage = (damage: string) => console.log('Damage reported: ' + damage);
logDamage('coffee stains');


let favoriteLibrarian: Librarian = new UniversityLibrarian();
favoriteLibrarian.name = 'Or';
favoriteLibrarian.assistCustomer('Hasson');


// **************************************

let refBook: ReferenceItem = new Encyclopedia('Math', 2022, 2);
refBook.printItem()
refBook.printCitation()


/** Class Expression Example **/
let Newspaper = class extends ReferenceItem {
    printCitation(): void {
        console.log(`Newspaper: ${this.title}`)
    }
}

let myPaper = new Newspaper('Israel Ayom', 2022);
myPaper.printCitation();


class Novel extends class {
    title: string
} {
    mainCharacter: string;
}

let favoriteNovel = new Novel();


//*********************************************

let inventory: Array<Book> = [
    {id: 10, title: 'The C Programming Language', author: 'K & R', available: true, category: Category.Software},
    {id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: Category.Software},
    {id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: Category.Software},
    {id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software}
];

let purgedBooks: Array<Book> = Purge(inventory);
purgedBooks.forEach(book => console.log(book.title));

let purgedNumber: Array<number> = Purge([1, 2, 3, 4, 5, 6]);
purgedNumber.forEach(number => console.log(number));

let bookShelf: Shelf<Book> = new Shelf<Book>();
inventory.forEach(book => bookShelf.add(book));

let firstBook: Book = bookShelf.getFirst();

let magazines: Array<Magazine> = [
    {title: 'Programming Language Monthly', publisher: 'Code Mags'},
    {title: 'Literary Fiction Quarterly', publisher: 'College Press'},
    {title: 'Five Points', publisher: 'GSU'}
];

let magazineShelf: Shelf<Magazine> = new Shelf<Magazine>();
magazines.forEach(magazine => magazineShelf.add(magazine));

let firstMagazine: Magazine = magazineShelf.getFirst();

magazineShelf.printTitles();

let softwareBook = bookShelf.find('Code Complete');
console.log(`${softwareBook.title} (${softwareBook.author})`);


