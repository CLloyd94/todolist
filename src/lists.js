export default class List {
    constructor(id, name, emoji) {
        this._id = id;
        this._name = name;
        this._emoji = emoji;
        this._tasks = [];
    }

    get listInfo() {
        return `List ID: ${this._id}, 
        List emoji: ${this._emoji}, 
        List name: ${this._name}, 
        List tasks: ${this._tasks}`;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get emoji() {
        return this._emoji;
    }

    get tasks() {
        return this._tasks;
    }

    set name(newName) {
        this._name = newName;
        console.log(`List name is now ${this._name}`);
    }

    set emoji(newEmoji) {
        this._emoji = newEmoji;
        console.log(`List emoji is now ${this._emoji}`);
    }

    addTask(task) {
        this._tasks.push(task);
        console.log(`${task} was added to list ${this._name}`);
    }

    removeTask(task) {
        const index = this._tasks.indexOf(task);
        if (index > -1) {
            this._tasks.splice(index, 1);
            console.log(`${task} has been removed from list ${this._name}.`);
        } else {
            console.log(`${task} is not in list ${this._name}.`);
        }
    }
} 