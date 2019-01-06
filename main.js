const
    toDoList = document.querySelector('.todo-list-js'),
    inputText = document.querySelector('.inputText'),
    doneList = document.querySelector('.done-list-js');

function moveItem() {
    const listItemId = this.id.replace('li_', '');
    const listItem = document.getElementById(`li_${listItemId}`);
    const listItemParentId = listItem.parentElement;

    console.log(listItemParentId);

    if (listItemParentId == doneList) {
        todoList.appendChild(listItem);
    } else {
        doneList.appendChild(listItem);
    }
}

function renameItem() {
    const newText = prompt("what should this item be renamed to?");
    if (!newText || newText === "" || newText === " ") return false;

    const spanId = this.id.replace('pencilIcon_', '');
    const span = document.getElementById(`item_${spanId}`);

    span.innerText = newText;
}

function updateItemStatus() {
    let chId = this.id.replace('cb_', '');
    const item = document.getElementById(`item_${chId}`);
    const listItem = document.getElementById(`li_${chId}`);

    if (this.checked) {
        item.className = 'checked';
        doneList.appendChild(listItem);
    } else {
        item.className = '';
        toDoList.appendChild(listItem);
    }
}

function deleteItem() {
    let listItemId = this.id.replace('delete_', '');
    console.log(listItemId);
    toDoList.removeChild(document.getElementById(`li_${listItemId}`));
}

function mouseover() {
    const penId = this.id;
    const pencilIcon = document.querySelector(`#${penId} .fa-pencil-alt`);
    pencilIcon.style.visibility = 'visible';
}

function mouseout() {
    const penId = this.id;
    const pencilIcon = document.querySelector(`#${penId} .fa-pencil-alt`);
    pencilIcon.style.visibility = 'hidden';
}

function addNewItem(list, itemText) {
    const date = new Date();
    const id = "" + date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds();

    const listItem = document.createElement('li');
    listItem.id = 'li_' + id;
    // listItem.ondblclick = deleteItem;
    listItem.addEventListener('mouseover', mouseover);
    listItem.addEventListener('mouseout', mouseout);

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.id = 'cb_' + id;
    checkBox.addEventListener('click', updateItemStatus);

    const span = document.createElement('span');
    span.id = 'item_' + id;
    span.innerText = itemText;

    const pencilIcon = document.createElement('i');
    pencilIcon.className = 'fas fa-pencil-alt';
    pencilIcon.id = 'pencilIcon_' + id;
    pencilIcon.addEventListener('click', renameItem);

    const deleteIcon = document.createElement('i');
    deleteIcon.className = 'fas fa-trash-alt';
    deleteIcon.id = 'delete_' + id;
    deleteIcon.onclick = deleteItem;

    listItem.appendChild(deleteIcon);
    listItem.appendChild(pencilIcon);
    listItem.appendChild(checkBox);
    listItem.appendChild(span);
    list.appendChild(listItem);
}

inputText.focus();

inputText.addEventListener('keypress', function (event) {
    if (event.which === 13) {
        const itemText = inputText.value;
        if (!itemText || itemText === '' || itemText === ' ') return false;
        addNewItem(toDoList, itemText);
        inputText.focus();
        inputText.select();
        inputText.value = '';
    }
});



