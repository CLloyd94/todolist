import './styles.css';
import homePage from './home.js';
import { createTask, updateTask, deleteTask, toggleTaskCompletion } from './taskController.js';
import { createList, updateList, deleteList } from './listController.js';
import Task from './tasks.js';
import List from './lists.js';

console.log('index.js file loaded correctly!');

document.addEventListener('DOMContentLoaded', () => {
    homePage();
    currentListId = 1;
});

if (homePage) {
    console.log('code successfully imported!');
}