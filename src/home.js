import List from './lists.js';
import { createList, updateList, deleteList, lists } from './listController.js';
import { createTask, updateTask, deleteTask, toggleTaskCompletion } from './taskController.js';
// Import the library

export default function homePage() {

    const content = document.getElementById('content');
    const listNameHeading = document.createElement('h1');

    content.appendChild(listNameHeading);

    globalThis.lists = lists;

    lists.push(new List(1, '📥 Inbox', 'blue'));
    lists.push(new List(2, '🌅 Today', 'red'));
    lists.push(new List(3, '🗓️ This week', 'orange'));

    // How do we set the currentlistId 
    // What's the initially rendered list? Setting this to a number doesn't work.
    let currentListId = null; // In developer tools, it will always show this due to scope.
    globalThis.currentListId = currentListId;

    function initialRender() {
        const initialList = lists.find(list => list.id === 1);
        currentListId = initialList.id;
        return initialList.name;
    }

    function addListToDialog() {
        // List dropdown for create task dialog
        const modalListSelect = document.getElementById('list-select');

        // Get our three default lists with their IDs 1, 2, 3
        const defaultLists = lists.filter(list => list.id === 1 || list.id === 2 || list.id === 3);

        // Create an array to store the names of existing options in the dropdown
        const existingOptions = [];
        for (let i = 0; i < modalListSelect.options.length; i++) {
            existingOptions.push(modalListSelect.options[i].value);
        }

        // Add the default lists to the dropdown if they are not already present
        defaultLists.forEach(list => {
            if (!existingOptions.includes(list.name)) {
                const option = document.createElement('option');
                option.text = list.name;
                option.value = list.name;
                option.id = list.name;
                if (option.id === 'Inbox') {
                    option.selected = true;
                }
                modalListSelect.appendChild(option);
            }
        });

        // Filter out lists that are already in the dropdown or are default lists
        const newLists = lists.filter(list =>
            !existingOptions.includes(list.name) && !defaultLists.some(defaultList => defaultList.name === list.name)
        );

        // Add the new lists to the dropdown
        newLists.forEach(list => {
            const modalListOption = document.createElement('option');
            modalListOption.text = list.name;
            modalListOption.value = list.name;
            modalListOption.id = list.name;

            if (modalListOption.id === 'Inbox') {
                modalListOption.selected = true;
            }

            modalListSelect.appendChild(modalListOption);
        });
    }

    addListToDialog();

    listNameHeading.textContent = initialRender();

    // Add lists to sidebar
    lists.forEach(list => {
        globalThis[`list${list.id}Info`] = () => list.listInfo;
        // console.log(list.listInfo);
        const listItem = document.createElement('li');
        const button = document.createElement('button');
        const listParagraph = document.createElement('p');
    
        button.textContent = `${list.name}`;
        button.id = list.name;
        listItem.appendChild(button);
        listItem.appendChild(listParagraph);
        const smartListsContainer = document.getElementById('smart-lists-container');
        smartListsContainer.appendChild(listItem);
        // console.log(`All list tasks: ${list.tasks}`);

        listItem.addEventListener('click', () => {
            listNameHeading.textContent = (`${list.name}`);
            currentListId = list.id;
            appendTask();
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

    // Need to instead use the current lists array, and somehow have the user lists below 'my projects'
    const userListsArray = [];
    console.log(`userListsArray: ${userListsArray}`);
    console.log(`userListsArray length before button press: ${userListsArray.length}`);

    function appendList() {
        userListsContainer.innerHTML = '';
    
        userListsArray.forEach(list => {
            const listItem = document.createElement('li');
            const button = document.createElement('button');
            button.textContent = `${list.name}`;
            button.id = list.name;
            listItem.appendChild(button);
            userListsContainer.appendChild(listItem);
            console.log(`userListsArray length after button press: ${userListsArray.length}`);
            console.log(`list info: ${list.getInfo}`);

            listItem.addEventListener('click', () => {
                listNameHeading.textContent = (`${list.name}`);
                currentListId = list.id;
                appendTask();
                console.log(`current list ID: ${currentListId}`); // This doesn't appear to include the user's lists; not in lists array?
            });
        });
    }
    // 'Create list' dialog
    // This should instead be converted to a modal?
    const createListModal = document.getElementById('create-list-modal');
    // Default invisible
    createListModal.style.display = 'none';

    // When the create list button is clicked, add the inputted name to the projects array
    createListButton.addEventListener('click', () => {
        toggleVisibility(createListModal);
        // toggleVisibility(createTaskContainer);
    });

    // Logic for handling user input from create task form
    document.getElementById('create-list-form').addEventListener('submit', (event) => {
        event.preventDefault();

        const listName = document.getElementById('list-name').value;
        const listColor = document.getElementById('list-color').value;
        // Push the new list to the lists array
        // lists.push(new List(1, 'Inbox', '📥'));
    
        // Use the find function to find a list that matches the list name, then retrieve its ID
        if (!listName) {
            alert('Please enter a list name');
            return;
        }
        else if (!listColor) {
            alert('Please select a list colour');
            return;
        }

        const newList = createList(listName, listColor);
        console.log(newList);
        userListsArray.push(newList);
        appendList(newList);
        addListToDialog();
        // Hide the dialog
        toggleVisibility(createListModal);
        // toggleVisibility(createTaskContainer);
    });

    // Add the user's custom lists to the sidebar
    userListsArray.forEach(list => appendList(list));

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

    // Function for adding tasks to the content container
    function appendTask() {
        taskList.innerHTML = '';
        // Retrieve all tasks from that list
        // Display those tasks in the DOM
        const selectedList = lists.find(list => list.id === currentListId);
        // Something to do with the initial selected list
        selectedList.tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = 'task-item';
            const taskPriorityButton = document.createElement('button');
            // Task priority style colour switch logic
            taskPriorityButton.className = 'task-priority-color';
            taskPriorityButton.id = `${task.priority}`;
            let priorityColor;
        
            switch (task.priority) {
                case 'high':
                    priorityColor = '#CE2B37';
                    break;
                case 'medium':
                    priorityColor = '#FFA630';
                    break;
                case 'low':
                    priorityColor = '#3777FF';
                    break;
                default:
                    priorityColor = '#FFA630';
            }

            taskPriorityButton.style.borderColor = priorityColor;
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
            taskList.appendChild(taskItem);
            taskList.appendChild(dividingLine);

            // Also when clicked, toggle its done status
            taskPriorityButton.addEventListener('click', () => {
                task.toggleComplete();
                // If the task is complete, apply strikethrough text and make text & button grey
                taskName.style.textDecoration = task._completed ? 'line-through' : 'none';
                taskPriorityButton.style.borderColor = task._completed ? '#c8c9cc' : priorityColor;
            });
        });
    }

    // 'Create task' dialog plus its content
    const createTaskDialog = document.getElementById('create-task-dialog');

    // When the create task button is clicked, add the inputted task to the correct list 
    createTaskContainer.addEventListener('click', () => {
        // If the dialog isn't displayed, display it and hide the create task button
        toggleVisibility(createTaskDialog);
        content.appendChild(createTaskDialog);
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

        let selectedList;

        if (!listName) {
            selectedList = lists.find(list => list.id === currentListId);
        }
        else {
            selectedList = lists.find(list => list.name === listName);
        }

        if (!selectedList) {
            throw new Error('Selected list not found.');
        }
        // Using the list name, look up the list ID
        const listId = selectedList.id;
    
        const newTask = createTask(listId, taskName, description, dueDate, priority);
        console.log(newTask);
        // Something fishy here; appendTask appends all tasks, while not retaining a task's completion status
        appendTask();
        // appendTask(newTask);
        console.log(`selected list's properties: ${selectedList.listInfo}`);

        // Hide the dialog
        toggleVisibility(createTaskDialog);
        // toggleVisibility(createTaskContainer);
    });

    // toggle visibility using ternary operator?
    function toggleVisibility(element) {
        element.style.display = element.style.display === 'none' ? 'block' : 'none';
    }

    const cancelButtons = document.querySelectorAll('.reset');
    cancelButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const modalOrDialog = button.closest('.modal') || button.closest('dialog');
            if (modalOrDialog) {
                toggleVisibility(modalOrDialog);
            }
        });
    });
}