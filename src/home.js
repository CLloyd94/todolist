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

    createTask(1, 'test task for All', 'test description', '2024-07-31', 'high-priority');

    globalThis.lists = lists;

    lists.forEach(list => {
        globalThis[`list${list.id}Info`] = () => list.listInfo;
        const listItem = document.createElement('li');
        const button = document.createElement('button');
        // Display the number of incomplete tasks per list
        const incompleteTasks = list.tasks.filter((task) => task.completed === false);
        const incompleteTasksDisplay = document.createElement('p');
        const numIncompleteTasks = incompleteTasks.length;
        if (numIncompleteTasks !== 0) {
            incompleteTasksDisplay.textContent = numIncompleteTasks;
        }        
        button.textContent = `${list.emoji} ${list.name}`;
        button.id = list.name;
        listItem.appendChild(button);
        listItem.appendChild(incompleteTasksDisplay);
        smartListsContainer.appendChild(listItem);
        console.log(`All list tasks: ${list.tasks}`)

        listItem.addEventListener('click', () => {
            listNameHeading.textContent = (`${list.emoji} ${list.name}`);
            currentListId = list.id;
            console.log(`current list ID: ${currentListId}`);
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
                console.log(`current list ID: ${currentListId}`);
            });
        });
    }

    // When the create list button is clicked, add the inputted name to the projects array
    createListButton.addEventListener('click', () => {
        const newList = createList();
        userListsArray.push(newList);
        appendList();
    });

    // Add the user's custom lists to the sidebar
    userListsArray.forEach(list => appendList(list));

    // What's the initially rendered list? Setting this to a number doesn't work.
    let currentListId = null; // In developer tools, it will always show this due to scope.
    globalThis.currentListId = currentListId;

    // Create a 'create task' button
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
    
    // List of all tasks in the content container
    const taskList = document.createElement('ul');
    taskList.id = 'task-list';
    // Add the list of tasks to the content container, then the create task button
    content.appendChild(taskList);
    content.appendChild(createTaskContainer);

    const tasksArray = [];

    // Function for adding tasks to the content container
    function appendTask() {
        taskList.innerHTML = '';
        // Instead of tasks array, retrieve tasks for the current/selected list?
        // Using the currentListId, look up the list with that ID
        // Retrieve all tasks from that list
        // Display those tasks in the DOM
        const selectedList = lists.find(list => list.id === currentListId);
        selectedList.tasks.forEach(task => {
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
            // Display key details for each task
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
            // With task list, we need to get the ID/name of the current list,
            // and only add it to the list if it matches the list the user specified
            // Using the list ID, use the addtasks function from lists.js
            // taskList.appendChild(list.tasks);
            taskList.appendChild(taskItem);
            taskList.appendChild(dividingLine);

            // Also when clicked, toggle its done status
            taskPriorityButton.addEventListener('click', () => {
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

    // 'Create task' dialog plus its content
    const createTaskDialog = document.getElementById('create-task-dialog');

    // When the create task button is clicked, add the inputted task to the correct list 
    createTaskContainer.addEventListener('click', () => {
        // If the dialog isn't displayed, display it and hide the create task button
        createTaskDialog.style.display = 'block';
        createTaskContainer.style.display = 'none';
    });

    // List dropdown for create task dialog
    const dialogListSelect = document.getElementById('list-select');
    lists.forEach(list => {
        const dialogListOption = document.createElement('option');
        dialogListOption.text = `${list.emoji} ${list.name}`;
        dialogListOption.value = list.name;
        dialogListSelect.appendChild(dialogListOption);
    });

    // Logic for creating new tasks from form data
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
        const listId = selectedList.id;
        
        const newTask = createTask(listId, taskName, description, dueDate, priority);
        console.log(newTask);
        selectedList.addTask(newTask);
        // console.log(typeof (selectedList));
        // console.log(`selectedList tasks: ${selectedList.listInfo()}`);
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