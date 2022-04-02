"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("./enum");
const classes_1 = require("./classes");
function GetAllBooks() {
    let books = [
        { id: 1, title: 'Ulysses', author: 'James Joyce', available: true, category: enum_1.Category.Fiction },
        {
            id: 2,
            title: 'A Farewell to Arms',
            author: 'Ernest Hemingway',
            available: false,
            category: enum_1.Category.Fiction
        },
        {
            id: 3,
            title: 'I Know Why the Caged Bird Sings',
            author: 'Maya Angelou',
            available: true,
            category: enum_1.Category.Poetry
        },
        { id: 4, title: 'Moby Dick', author: 'Herman Melville', available: true, category: enum_1.Category.Fiction }
    ];
    return books;
}
function LogFirstAvailable(books = GetAllBooks()) {
    let numberOfBooks = books.length;
    let firstAvailable = '';
    for (let currentBook of books) {
        if (currentBook.available) {
            firstAvailable = currentBook.title;
            break;
        }
    }
    console.log('Total Books: ' + numberOfBooks);
    console.log('First Available: ' + firstAvailable);
}
function GetBookTitlesByCategory(categoryFilter = enum_1.Category.Fiction) {
    console.log('Getting books in category: ' + enum_1.Category[categoryFilter]);
    const allBooks = GetAllBooks();
    const filteredTitles = [];
    for (let currentBook of allBooks) {
        if (currentBook.category === categoryFilter) {
            filteredTitles.push(currentBook.title);
        }
    }
    return filteredTitles;
}
function LogBookTitles(titles) {
    for (let title of titles) {
        console.log(title);
    }
}
LogFirstAvailable();
function getBookByID(id) {
    const allBooks = GetAllBooks();
    return allBooks.filter(book => book.id === id)[0];
}
function CreateCustomerID(name, id) {
    return name + id;
}
function createCustomer(name, age, city) {
    console.log('Creating customer ' + name);
    if (age) {
        console.log('Age: ' + age);
    }
    if (city) {
        console.log('City: ' + city);
    }
}
function CheckoutBooks(customer, ...bookIDs) {
    console.log('Checking out books for ' + customer);
    let booksCheckedOut = [];
    for (let id of bookIDs) {
        let book = getBookByID(id);
        if (book.available) {
            booksCheckedOut.push(book.title);
        }
    }
    return booksCheckedOut;
}
// *******************************************
let IdGenerator;
IdGenerator = CreateCustomerID;
let IdGenerator2;
IdGenerator2 = (name, id) => {
    return name + id;
};
let myID = IdGenerator('daniel', 10);
console.log(myID);
function GetTitles(author, available) {
    const allBooks = GetAllBooks();
    const searchResults = [];
    if (available !== undefined) {
        for (let book of allBooks) {
            if (book.author === author && book.available === available) {
                searchResults.push(book.title);
            }
        }
    }
    else {
        for (let book of allBooks) {
            if (book.author === author) {
                searchResults.push(book.title);
            }
        }
    }
    return searchResults;
}
let myBooks = GetTitles('James Joyce', false);
myBooks.forEach(title => console.log(title));
function PrintBook(currentBook) {
    console.log(currentBook.title + ' by ' + currentBook.author);
}
let myBook = {
    id: 5,
    title: 'Pride and Prejudice',
    author: 'Or Hasson',
    available: true,
    category: enum_1.Category.Biography,
    pages: 250,
    markDamaged: (reason) => console.log('Damaged: ' + reason)
};
PrintBook(myBook);
myBook.markDamaged('My Dog eat the book');
let logDamage;
logDamage = (damage) => console.log('Damage reported: ' + damage);
logDamage('coffee stains');
let favoriteLibrarian = new classes_1.UniversityLibrarian();
favoriteLibrarian.name = 'Or';
favoriteLibrarian.assistCustomer('Hasson');
// **************************************
let refBook = new classes_1.Encyclopedia('Math', 2022, 2);
refBook.printItem();
refBook.printCitation();
/** Class Expression Example **/
let Newspaper = class extends classes_1.ReferenceItem {
    printCitation() {
        console.log(`Newspaper: ${this.title}`);
    }
};
let myPaper = new Newspaper('Israel Ayom', 2022);
myPaper.printCitation();
class Novel extends class {
} {
}
let favoriteNovel = new Novel();
//*********************************************
