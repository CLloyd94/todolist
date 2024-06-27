export default class Task {
    constructor(id, name, description = '', dueDate = null, priority = 'medium', list = null, completed = false) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
        this._list = list;
        this._completed = completed;
    }

    get taskInfo() {
        return `Task name: ${this._name}, 
        Task description: ${this._description}, 
        Task due date: ${this._dueDate}, 
        Task priority: ${this._priority}, 
        Task list: ${this._list},
        Task completion status: ${this.completed}`;
    }

    // Getter and setter for task name
    get name() {
        return this._name;
    }
    
    set name(name) {
        this._name = name;
        console.log(`Task named ${this._name}`);
    }

    // Getter and setter for task description
    get description() {
        return this._description;
    }
    
    set description(description) {
        this._description = description;
        console.log(`Task description changed to ${this._description}`);
    }

    // Getter and setter for task due date
    get dueDate() {
        return this._dueDate;
    }
    
    set dueDate(dueDate) {
        this._dueDate = dueDate;
        console.log(`Task due date changed to ${this._dueDate}`);
    }

    // Getter and setter for task priority
    get priority() {
        return this._priority;
    }

    set priority(priority) {
        this._priority = priority;
        console.log(`Task priority changed to ${this._priority}`);
    }

    // Getter and setter for associated list
    get list() {
        return this._list;
    }

    set list(list) {
        this._list = list;
        console.log(`Task moved to list ${this._list}`);
    }
    
    // Toggle task complete
    toggleComplete() {
        this.completed = !this.completed;
        console.log(`Task completion status is now ${this.completed}`);
    } 
    // set status(status) {
    //     this._status = status;
    //     console.log(`Task status is now ${this.status}`);
    // }
} 