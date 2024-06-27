import Task from './tasks.js';
import { lists } from './listController.js';
import List from './lists.js';

const tasks = [];

export function createTask(listId) {
    const list = lists.find(list => list.id === listId);
    if (!(list)) {
        throw new Error('List not found');
    }
    else if (!(list instanceof List)) {
        throw new Error('Invalid list provided');
    }
    const taskId = Math.floor(Math.random() * 100);
    const taskName = prompt('Enter the name of your task');
    const newTask = new Task(taskId, taskName);
    list.addTask(newTask);
    tasks.push(newTask);
    return newTask;
}

// UPDATE
export function updateTask(task, { name, description, dueDate, priority, list, completed }) {
    if (name !== undefined) task.name = name;
    if (description !== undefined) task.description = description;
    if (dueDate !== undefined) task.dueDate = dueDate;
    if (priority !== undefined) task.priority = priority;
    if (list !== undefined) task.list = list;
    if (completed !== undefined) task.completed = completed;
}

// DELETE
export function deleteTask(list, taskId) {
    list.removeTask(taskId);
    // Optionally remove from central tasks array if used
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
    }
}
// MARK COMPLETE
export function toggleTaskCompletion(task) {
    task.toggleComplete();
}