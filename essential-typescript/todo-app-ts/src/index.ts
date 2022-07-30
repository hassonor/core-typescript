import {TodoItem} from "./todoItem";
import {TodoCollection} from "./TodoCollection";

let todos: TodoItem[] = [
    new TodoItem(1, "Buy Me Flowers"), new TodoItem(2, "Get New Shoes"),
    new TodoItem(2, "Buy Hapoel Tel Aviv tickets for the Derby"), new TodoItem(4, "Call Shira ex.", true)];


let collection: TodoCollection = new TodoCollection("Or Hasson", todos);

console.clear();
console.log(`${collection.userName}'s Todo List`);

let newId: number = collection.addTodo("Go to Gym");
let todoItem: TodoItem = collection.getTodoById(newId);
todoItem.printDetails();





