const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const todosList = document.getElementById('todos-list');
const emptyState = document.getElementById('empty-state');
const dateElement = document.getElementById('date');
const itemsLeft = document.getElementById('items-left');
const clearCompletedButton = document.getElementById('clear-completed');

const filters = document.querySelectorAll('.filter');

// live collection rerenders itself when dom changes
const renderedItems = todosList.getElementsByTagName('li');
const renderedCompleted = todosList.getElementsByClassName('completed');


let todos = [];
let currentFilter = 'all';
 
const EMPTY_MESSAGES = {
    all: 'No tasks here yet',
    active: 'No active tasks',
    completed: 'No completed tasks yet',
};

 
const STORAGE_KEY = 'todos';
 
function saveTodos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function loadTodos() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        todos = Array.isArray(saved) ? saved : [];
    } catch {
        todos = [];
    }
}

function addTodo(text) {
    const trimmed = text.trim();
    if (trimmed === '') return;
 
    todos.push({ id: Date.now(), text: trimmed, completed: false });
    saveAndRender();
    taskInput.value = '';
}

function toggleTodo(id) {
    todos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
    saveAndRender();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveAndRender();
}
 
function clearCompleted() {
    todos = todos.filter(todo => !todo.completed);
    saveAndRender();
}
 
function setFilter(filter) {
    currentFilter = filter;
    render();
}

function saveAndRender() {
    saveTodos();
    render();
}

function render() {
    renderList();
    // comes from the live collection, so it updates automatically
    renderEmptyState(); 
    renderFilters();
    renderItemsLeft();
}

function filterTodos(filter) {
    switch (filter) {
        case 'active':
            return todos.filter(todo => !todo.completed);
        case 'completed':
            return todos.filter(todo => todo.completed);
        default:
            return todos;
    }
}


function renderList() {
    todosList.innerHTML = '';
    filterTodos(currentFilter).forEach(todo => {
        todosList.appendChild(createTodoItem(todo));
    });
}

function createTodoItem(todo) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.classList.toggle('completed', todo.completed);
    li.dataset.id = todo.id;
 
    li.innerHTML = `
        <label class="checkbox-container">
            <input type="checkbox" class="todo-checkbox">
            <span class="checkmark"></span>
        </label>
        <span class="todo-text"></span>
        <button class="delete-button"><i class="fas fa-trash"></i></button>
    `;

    li.querySelector('.todo-checkbox').checked = todo.completed;
    li.querySelector('.todo-text').textContent = todo.text;

    return li;
}

function renderEmptyState() {
    if (renderedItems.length > 0) {
        emptyState.innerHTML = '';
        return;
    }
 
    emptyState.innerHTML = '<i class="fas fa-clipboard-list"></i><p></p>';
    emptyState.querySelector('p').textContent = EMPTY_MESSAGES[currentFilter];
}

function renderFilters() {
    filters.forEach(filter => filter.classList.remove('active'));

    document.querySelector(`.filter[data-filter="${currentFilter}"]`).classList.add('active');
}

function renderItemsLeft() {
    const count = todos.filter(todo => !todo.completed).length;
    itemsLeft.textContent = `${count} ${count === 1 ? 'item' : 'items'} left`;
}

function renderDate() {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    dateElement.textContent = new Date().toLocaleDateString('en-US', options);
}


addTaskButton.addEventListener('click', () => addTodo(taskInput.value));

taskInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') addTodo(taskInput.value);
});

clearCompletedButton.addEventListener('click', clearCompleted);

filters.forEach(filter => {
    filter.addEventListener('click', () => setFilter(filter.dataset.filter));
});

todosList.addEventListener('click', event => { 
    
    if (!event.target.matches('.todo-checkbox')) return;
    toggleTodo(getTodoId(event.target));
});

todosList.addEventListener('click', event => {
    const deleteButton = event.target.closest('.delete-button');
    if (!deleteButton) return;
    deleteTodo(getTodoId(deleteButton));
});
 
const getTodoId = element => Number(element.closest('.todo-item').dataset.id);


loadTodos();
renderDate();
render();
