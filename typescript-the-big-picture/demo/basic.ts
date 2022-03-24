class Customer {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    announce(){
        return "Hello, my name is " + this.name;
    }
}


let firstCustomer = new Customer("Or Hasson");
let newMessage: string = firstCustomer.announce();

//c change the text on the page
let webHeading = document.querySelector('h1');
webHeading!.textContent = newMessage;