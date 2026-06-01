const taskInput = document.getElementById('task-input');
const addTaskBth = document.getElementById('add-task');

const filters = document.querySelectorAll('.filter');
const todosList = document.getElementById('todos-list');

const emptyState = document.querySelector('.empty-state');
const dateElement = document.getElementById('date');

const clearCompletedBth = document.getElementById('clear-completed');
const itemsLeft = document.getElementById('items-left');


// Default values
let todos = []
let currentFilter = 'all';

addTaskBth.addEventListener('click', () => {
    addTodo(taskInput.value);
});

taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTodo(taskInput.value);
})

clearCompletedBth.addEventListener('click', clearCompleted);

// If white-space prevent from the process
function addTodo(text) {
    if (text.trim() === '') return;

    const todo = {
        id: Date.now(),
        text,
        completed: false
    }
    todos.push(todo);

    saveTodos();
    renderTodos();
    taskInput.value = '';
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
    updateItemsCount();
    checkEmptyState();
}

function updateItemsCount() {
    const uncompletedTodos = todos.filter(todo => !todo.completed);
    itemsLeft.textContent = `${uncompletedTodos?.length} item${
      uncompletedTodos?.length !== 1 ? 's' : '' } left`;
}

function checkEmptyState() {
    const filteredTodos = filterTodos(currentFilter);
    if (filteredTodos?.length === 0) emptyState.classList.remove('hidden');
    else emptyState.classList.add('hidden');
}

function filterTodos(filter) {
    switch (filter) {
        case "active":
            return todos.filter(todo => !todo.completed);
        case "completed":
            return todos.filter(todo => todo.completed);
        default: 
            return todos;
    }
}

function renderTodos() {
    todosList.innerHTML = '';
    const filteredTodos = filterTodos(currentFilter);

    filteredTodos.forEach(todo => {
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');
        if (todo.completed) todoItem.classList.add('completed');

        const checkboxConainer = document.createElement('label');
        checkboxConainer.classList.add('checkbox-container');

        const checkbox = document.createElement("input")
        checkbox.type = 'checkbox';
        checkbox.classList.add('todo-checkbox');
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => toggleTodo(todo.id));

        const checkmark = document.createElement('span');
        checkmark.classList.add('checkmark');

        checkboxConainer.appendChild(checkbox);
        checkboxConainer.appendChild(checkmark);

        const todoText = document.createElement('span');
        todoText.classList.add('todo-text');
        todoText.textContent = todo.text;

        const deleteBth = document.createElement('button');
        deleteBth.classList.add('delete-btn');
        deleteBth.innerHTML = '<i class="fas fa-times"></i>';
        deleteBth.addEventListener('click', () => deleteTodo(todo.id));

        todoItem.appendChild(checkboxConainer);
        todoItem.appendChild(todoText);
        todoItem.appendChild(deleteBth);

        todosList.appendChild(todoItem);
    });
}

function clearCompleted() {
    todos = todos.filter(todo => !todo.completed);
    saveTodos();
    renderTodos();
}

function toggleTodo(id) { 
    todos = todos.map((todo) => {
        if (todo.id === id) { 
            return {...todo, completed: !todo.completed};
        }
    return todo;
    });
    saveTodos();
    renderTodos();
}
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

function loadTodos() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
        renderTodos();
        updateItemsCount();
    }
}

filters.forEach(filter => { 
    filter.addEventListener('click', () => {
        setActiveFilter(filter.getAttribute('data-filter'));
    })
})

function setActiveFilter(filter) {
    currentFilter = filter;
    filters.forEach(item => {
        if (item.getAttribute('data-filter') === filter) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    renderTodos();
}

function setDate() {
    const options = {weekday: 'long', month: 'short', day: 'numeric'};
    const today = new Date();

    dateElement.textContent = today.toLocaleDateString('en-US', options);
}

window.addEventListener('DOMContentLoaded', () => {
    loadTodos();
    updateItemsCount();
    setDate();
});
