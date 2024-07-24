export default class Task {
    constructor(id, name, description, dueDate, priority, list, completed = false) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
        this._list = list;
        this._completed = completed;
    }

    get taskInfo() {
        return `Task ID: ${this._id}, 
        Task name: ${this._name}, 
        Task description: ${this._description}, 
        Task due date: ${this._dueDate}, 
        Task priority: ${this._priority}, 
        Task list: ${this._list},
        Task completion status: ${this.completed}`;
    }

    // Getter and setter for task ID
    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
        console.log(`Task ID is ${this._id}`);
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
        console.log('toggleComplete function called');
        this._completed = !this._completed;
        console.log('toggleComplete function successfully called');
    }
} 