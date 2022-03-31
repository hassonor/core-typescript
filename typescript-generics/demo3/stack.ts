interface DataStructure<T> {
    push(newItem: T): void;

    pop(): T;
}

export class Stack<T> implements DataStructure<T> {
    items: Array<T> = [];

    pop(): T {
        return this.items.pop();
    }

    push(newItem: T): void {
        this.items.push(newItem);
    }

    peek(): T {
        return this.items[this.items.length - 1];
    }

}