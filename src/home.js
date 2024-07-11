import List from './lists.js';
import { createList, updateList, deleteList, lists } from './listController.js';
import { createTask, updateTask, deleteTask, toggleTaskCompletion } from './taskController.js';

export default function homePage() {
    const content = document.getElementById('content');
    const listNameHeading = document.createElement('h1');
    content.appendChild(listNameHeading);
    
    // CREATE SMART LISTS
    const smartListsContainer = document.getElementById('smart-lists-container');

    // const smartListsArray = [];
    lists.push(new List(1, 'All', '📚'));
    lists.push(new List(2, 'Today', '🌅'));
    lists.push(new List(3, 'Inbox', '📥'));

    lists.forEach(list => {
        const listItem = document.createElement('li');
        const button = document.createElement('button');
        button.textContent = `${list.emoji} ${list.name}`;
        button.id = list.name;
        listItem.appendChild(button);
        smartListsContainer.appendChild(listItem);

        listItem.addEventListener('click', () => {
            listNameHeading.textContent = (`${list.emoji} ${list.name}`);
            currentListId = list.id;
        });
    });

    // CREATE LISTS
    const userListsContainer = document.getElementById('user-lists-container');
    const userListsHeadingContainer = document.getElementById('user-lists-heading-container');
    const userListsHeading = document.createElement('h3');
    userListsHeading.textContent = 'My Projects';
    userListsHeadingContainer.appendChild(userListsHeading);

    const createListButton = document.createElement('button');
    createListButton.textContent = '+';
    createListButton.id = 'create-list';
    userListsHeadingContainer.appendChild(createListButton);
    
    // Add logic for user input adding a project/list to this array
    const userListsArray = [];

    function appendList() {
        userListsContainer.innerHTML = '';
        
        userListsArray.forEach(list => {
            const listItem = document.createElement('li');
            const button = document.createElement('button');
            button.textContent = `${list.emoji} ${list.name}`;
            button.id = list.name;
            listItem.appendChild(button);
            userListsContainer.appendChild(listItem);

            listItem.addEventListener('click', () => {
                listNameHeading.textContent = (`${list.emoji} ${list.name}`);
                currentListId = list.id;
            });
        });
    }
    const allLists = lists.concat(userListsArray);
    // For the below, we should create a pop-up dialog


    // When the create list button is clicked, add the inputted name to the projects array
    createListButton.addEventListener('click', () => {
        const newList = createList();
        userListsArray.push(newList);
        // console.log(userListsArray);
        appendList();
    });

    userListsArray.forEach(list => appendList(list));

    let currentListId = null;

    const createTaskContainer = document.createElement('div');
    createTaskContainer.id = 'create-task-container';
    const createTaskButton = document.createElement('button');
    createTaskButton.textContent = '+';
    createTaskButton.id = 'create-task-plus';
    const createTaskText = document.createElement('button');
    createTaskText.textContent = 'Create task';
    createTaskText.id = 'create-task-text';
    createTaskContainer.appendChild(createTaskButton);
    createTaskContainer.appendChild(createTaskText);
    content.appendChild(createTaskContainer);

    const taskList = document.createElement('ul');
    taskList.id = 'task-list';
    content.appendChild(taskList);

    const tasksArray = [];

    function appendTask() {
        taskList.innerHTML = '';
        tasksArray.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = 'task-item';
            const taskPriorityButton = document.createElement('button');
            // Task priority style colour switch logic
            taskPriorityButton.className = 'task-priority-color';
            taskPriorityButton.id = `${task.priority}`;
            
            switch (task.priority) {
                case 'high':
                    taskPriorityButton.style.borderColor = '#CE2B37';
                    break;
                case 'medium':
                    taskPriorityButton.style.borderColor = '#FFA630';
                    break;
                case 'low':
                    taskPriorityButton.style.borderColor = '#3777FF';
                    break;
                default:
                    taskPriorityButton.style.borderColor = '#FFA630';
            }
            const taskName = document.createElement('p');
            taskName.textContent = task.name;
            const dueDate = document.createElement('p');
            dueDate.textContent = task.dueDate;
            const dividingLine = document.createElement('hr');
            dividingLine.className = 'task-dividing-line';

            // Create task item
            taskItem.appendChild(taskPriorityButton);
            taskItem.appendChild(taskName);
            taskItem.appendChild(dueDate);
            // Add task item to list and add dividing line
            taskList.appendChild(taskItem);
            taskList.appendChild(dividingLine);

            // Also when clicked, toggle its done status
            taskPriorityButton.addEventListener('click', () => {
                console.log('task priority button clicked!');
                task.toggleComplete();
                // If it's done, apply strikethrough text
                if (task.completed) {
                    taskName.style.textDecoration = 'line-through';
                    taskPriorityButton.style.borderColor = '#c8c9cc';
                }
                // This needs to be put into its own function
                else {
                    taskName.style.textDecoration = 'none';
                    switch (task.priority) {
                        case 'high':
                            taskPriorityButton.style.borderColor = '#CE2B37';
                            break;
                        case 'medium':
                            taskPriorityButton.style.borderColor = '#FFA630';
                            break;
                        case 'low':
                            taskPriorityButton.style.borderColor = '#3777FF';
                            break;
                        default:
                            taskPriorityButton.style.borderColor = '#FFA630';
                    }
                }
            });
        });
    }

    const createTaskDialog = document.getElementById('create-task-dialog');

    const dialogListSelect = document.getElementById('list-select');
    lists.forEach(list => {
        const dialogListOption = document.createElement('option');
        dialogListOption.text = `${list.emoji} ${list.name}`;
        dialogListOption.id = list.name;
        dialogListSelect.appendChild(dialogListOption);
        console.log('options created');
    });   

    // When the create task button is clicked, add the inputted task to the correct list 
    createTaskContainer.addEventListener('click', () => {
        // If the dialog isn't displayed, display it and hide the create task button
        createTaskDialog.style.display = 'block';
        createTaskContainer.style.display = 'none';
    });

    document.getElementById('create-task-form').addEventListener('submit', (event) => {
        event.preventDefault();

        const taskName = document.getElementById('task-name').value;
        const description = document.getElementById('description').value;
        const dueDate = document.getElementById('due-date').value;
        const priority = document.getElementById('priority-select').value;
        const listName = document.getElementById('list-select').value;
        // Use the find function to find a list that matches the list name, then retrieve its ID
        const selectedList = lists.find(list => list.name === listName);

        if (!selectedList) {
            throw new Error('Selected list not found.');
        }

        // Using the list name, look up the list ID
        const listID = selectedList.id;
        
        const newTask = createTask(listID, taskName, description, dueDate, priority);
        tasksArray.push(newTask);
        appendTask();

        // Hide the dialog
        createTaskDialog.style.display = 'none';
        createTaskContainer.style.display = 'block';
    });

    window.onclick = function (event) {
        if (event.target == createTaskDialog) {
            createTaskDialog.style.display = 'none';
            createTaskContainer.style.display = 'block';
        }
    }
}