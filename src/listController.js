import List from './lists.js';

export const lists = [];

// CREATE
export function createList(listName, listColor) {
    let listId;
    do {
        listId = Math.floor(Math.random() * 100);
    } while (lists.some(list => list.id === listId));
    
    const newList = new List(listId, listName, listColor);
    lists.push(newList);
    console.log(newList.listInfo);
    return newList;
}

export function getListId(listId) {
    return lists.find(list => list.id === listId);
}

// UPDATE
export function updateList(list, { listId, name, color }) {
    // Logic to update a list with new details
    if (name !== undefined) list.name = name;
    if (color !== undefined) list.color = color;
    console.log(`List ${listId} updated to: ${name}, ${color}`);
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