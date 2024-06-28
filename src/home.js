import List from './lists.js';
import { createList, updateList, deleteList, lists } from './listController.js';
// import { lists } from './listController.js';
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
    // For the below, we should create a pop-up modal


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
            });
        });
    }

    // Create task modal
//     const createTaskModal = document.createElement('div');
//     createTaskModal.id = 'create-task-modal';
//     createTaskModal.className = 'modal';
//     // Create task form
//     const createTaskForm = document.createElement('form');
//     // Form fields
//     const taskNameField = document.createElement('input');
//     taskNameField.type = 'text';
//     taskNameField.id = 'task-name';
//     taskNameField.name = 'task-name';
//     const descriptionField = document.createElement('input');
//     const dueDateField = document.createElement('input');
//     const priorityField = document.createElement('input');
//     const listNameField = document.createElement('input');
    
//     <label for="fname">First name:</label><br>
//   <input type="text" id="fname" name="fname"><br>
//   <label for="lname">Last name:</label><br>
//   <input type="text" id="lname" name="lname"></input>


//     createTaskModal.appendChild(createTaskForm); 

    // When the create task button is clicked, add the inputted task to the correct list 
    createTaskContainer.addEventListener('click', () => {
        if (currentListId !== null) {
            const newTask = createTask(currentListId);
            tasksArray.push(newTask);
            appendTask();
        }
        else {
            alert('Please select a list first.');
        }
    });
}