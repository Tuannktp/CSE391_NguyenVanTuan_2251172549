"use strict";

const todoInput = document.querySelector('#todoInput');
const addTodoBtn = document.querySelector('#addTodoBtn');
const todoList = document.querySelector('#todoList');
const todoCount = document.querySelector('#todoCount');
const filterButtons = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.querySelector('#clearCompleted');

const STORAGE_KEY = 'todoAppTodos';
let todos = [];
let currentFilter = 'all';

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function loadTodos() {
  const stored = localStorage.getItem(STORAGE_KEY);
  todos = stored ? JSON.parse(stored) : [];
}

function updateCount() {
  const activeCount = todos.filter(todo => !todo.completed).length;
  todoCount.textContent = `${activeCount} item${activeCount === 1 ? '' : 's'} left`;
}

function setFilter(filter) {
  currentFilter = filter;
  filterButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.filter === filter));
  renderTodos();
}

function createTodoElement(todo) {
  const li = document.createElement('li');
  li.className = 'todo-item';
  li.dataset.id = todo.id;
  if (todo.completed) {
    li.classList.add('completed');
  }

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'todo-checkbox';
  checkbox.checked = todo.completed;
  checkbox.dataset.action = 'toggle';

  const label = document.createElement('span');
  label.className = 'todo-label';
  label.textContent = todo.text;
  label.dataset.action = 'toggle';
  label.title = 'Double click to edit';

  const removeBtn = document.createElement('button');
  removeBtn.className = 'todo-remove';
  removeBtn.textContent = '✕';
  removeBtn.dataset.action = 'remove';
  removeBtn.ariaLabel = 'Remove todo';

  li.append(checkbox, label, removeBtn);
  return li;
}

function renderTodos() {
  while (todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }

  const filtered = todos.filter(todo => {
    if (currentFilter === 'active') return !todo.completed;
    if (currentFilter === 'completed') return todo.completed;
    return true;
  });

  filtered.forEach(todo => {
    todoList.appendChild(createTodoElement(todo));
  });

  updateCount();
}

function addTodo(text) {
  const trimmed = text.trim();
  if (!trimmed) return;
  todos.push({ id: Date.now().toString(), text: trimmed, completed: false });
  saveTodos();
  renderTodos();
  todoInput.value = '';
}

function removeTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveTodos();
  renderTodos();
}

function toggleTodo(id) {
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  saveTodos();
  renderTodos();
}

function clearCompleted() {
  todos = todos.filter(todo => !todo.completed);
  saveTodos();
  renderTodos();
}

function startEditing(itemElement, todo) {
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'edit-input';
  editInput.value = todo.text;

  const label = itemElement.querySelector('.todo-label');
  itemElement.replaceChild(editInput, label);
  editInput.focus();
  editInput.setSelectionRange(editInput.value.length, editInput.value.length);

  const finishEdit = () => {
    const updatedValue = editInput.value.trim();
    if (updatedValue) {
      todo.text = updatedValue;
      saveTodos();
    }
    renderTodos();
  };

  editInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      finishEdit();
    }
    if (event.key === 'Escape') {
      renderTodos();
    }
  });

  editInput.addEventListener('blur', finishEdit);
}

function handleListClick(event) {
  const action = event.target.dataset.action;
  const itemElement = event.target.closest('.todo-item');
  if (!itemElement) return;

  const id = itemElement.dataset.id;
  if (action === 'remove') {
    removeTodo(id);
    return;
  }

  if (action === 'toggle') {
    toggleTodo(id);
  }
}

function handleListDblClick(event) {
  const itemElement = event.target.closest('.todo-item');
  if (!itemElement) return;
  if (event.target.dataset.action !== 'toggle' && !event.target.classList.contains('todo-label')) return;

  const id = itemElement.dataset.id;
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    startEditing(itemElement, todo);
  }
}

addTodoBtn.addEventListener('click', () => addTodo(todoInput.value));
todoInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    addTodo(todoInput.value);
  }
});

filterButtons.forEach(button => {
  button.addEventListener('click', () => setFilter(button.dataset.filter));
});

clearCompletedBtn.addEventListener('click', clearCompleted);

todoList.addEventListener('click', handleListClick);
todoList.addEventListener('dblclick', handleListDblClick);

loadTodos();
renderTodos();
