import List from './lists.js';

export const lists = [];

// CREATE
export function createList() {
    let listId = Math.floor(Math.random() * 100);
    // Ensure the list ID is unique
    do {
        listId = Math.floor(Math.random() * 100);
    } while (lists.some(list => list.id === listId));
    // For the below, we should create a pop-up modal
    const listName = prompt('Enter the name of your list.');
    const listEmoji = prompt('Enter the emoji for your list.');
    const newList = new List(listId, listName, listEmoji);
    lists.push(newList);
    console.log(newList.listInfo);
    return newList;
}

export function getListById(listId) {
    return lists.find(list => list.id === listId);
}

// UPDATE
export function updateList(list, { listId, name, emoji }) {
    // Logic to update a list with new details
    if (name !== undefined) list.name = name;
    if (emoji !== undefined) list.emoji = emoji;
    console.log(`List ${listId} updated to: ${name}, ${emoji}`);
}

// DELETE
export function deleteList(listId) {
    // Optionally remove from central tasks array if used
    const listIndex = lists.findIndex(list => list.id === listId);
    if (listIndex !== -1) {
        lists.splice(listIndex, 1);
    }
    console.log(`List ${listId} deleted`);
}