const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');
const newTodoInput = document.getElementById('new-todo-input');

function newTodo() {
  const todoText = newTodoInput.value;
  
  if (!todoText) {
    alert('Please enter a TODO description!');
    return;
  }
  
  const todoItem = document.createElement('li');
  todoItem.classList.add(classNames.TODO_ITEM);

  const todoTextElement = document.createElement('span');
  todoTextElement.classList.add(classNames.TODO_TEXT);
  todoTextElement.textContent = todoText;

  const todoCheckbox = document.createElement('input');
  todoCheckbox.type = 'checkbox';
  todoCheckbox.classList.add(classNames.TODO_CHECKBOX);
  todoCheckbox.addEventListener('change', updateUncheckedCount);

  const todoDelete = document.createElement('button');
  todoDelete.classList.add(classNames.TODO_DELETE);
  todoDelete.textContent = 'Delete';
  todoDelete.addEventListener('click', deleteTodo);

  todoItem.appendChild(todoTextElement);
  todoItem.appendChild(todoCheckbox);
  todoItem.appendChild(todoDelete);

  list.appendChild(todoItem);
  newTodoInput.value = '';

  updateItemCount();
  updateUncheckedCount();

  // Зберігаємо список справ в Local Storage
  saveTodoList();
}

function updateItemCount() {
  const itemCount = list.children.length;
  itemCountSpan.textContent = itemCount;
}

function updateUncheckedCount() {
  const uncheckedCount = Array.from(list.getElementsByClassName(classNames.TODO_CHECKBOX)).filter((checkbox) => !checkbox.checked).length;
  uncheckedCountSpan.textContent = uncheckedCount;
  saveTodoList();
}

function deleteTodo() {
  const todoItem = this.parentElement;
  list.removeChild(todoItem);
  updateItemCount();
  updateUncheckedCount();
}

function saveTodoList() {
  const todoItems = Array.from(list.getElementsByClassName(classNames.TODO_TEXT)).map((todoTextElement) => todoTextElement.textContent);
  localStorage.setItem('todoList', JSON.stringify(todoItems));
}

function loadTodoList() {
  const savedTodoItems = JSON.parse(localStorage.getItem('todoList'));
  if (savedTodoItems) {
    savedTodoItems.forEach((todoText) => {
      newTodoInput.value = todoText;
      newTodo();
    });
  }
}

// Завантажуємо список справ з Local Storage при завантаженні сторінки
loadTodoList();


