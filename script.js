// Пошук елементів
const addListBtn = document.getElementById('add-list-btn');
const listsContainer = document.getElementById('lists-container');

// Відновлення списків з LocalStorage
let lists = JSON.parse(localStorage.getItem('lists')) || [];

// Оновлення LocalStorage
function saveToLocalStorage() {
  localStorage.setItem('lists', JSON.stringify(lists));
}

// Відображення списків
function renderLists() {
  listsContainer.innerHTML = ''; // Очищення контейнера
  lists.forEach((list, index) => {
    const listElement = document.createElement('div');
    listElement.className = 'list';

    listElement.innerHTML = `
      <h2>${list.name}</h2>
      <button class="delete-list-btn" onclick="deleteList(${index})">🗑 Delete List</button>
      <ul>
        ${list.tasks
          .map(
            (task, taskIndex) => `
          <li class="task ${task.completed ? 'completed' : ''}">
            <div class="task-info">
              <span>${task.text}</span>
              <span>Created: ${task.creationDate}</span>
            </div>
            <div>
              <button onclick="toggleTask(${index}, ${taskIndex})">✔</button>
              <button onclick="deleteTask(${index}, ${taskIndex})">❌</button>
            </div>
          </li>`
          )
          .join('')}
      </ul>
      <div class="add-task-container">
        <input type="text" placeholder="New task..." id="new-task-input-${index}">
        <button onclick="addTask(${index})">Add Task</button>
      </div>
    `;

    listsContainer.appendChild(listElement);
  });
}

// Додати новий список
addListBtn.addEventListener('click', () => {
  const listName = prompt('Enter the name of the list:');
  if (listName) {
    lists.push({ name: listName, tasks: [] });
    saveToLocalStorage();
    renderLists();
  }
});

// Видалення списку
function deleteList(index) {
  if (confirm('Are you sure you want to delete this list?')) {
    lists.splice(index, 1);
    saveToLocalStorage();
    renderLists();
  }
}

// Додати нову задачу
function addTask(listIndex) {
  const input = document.getElementById(`new-task-input-${listIndex}`);
  const taskText = input.value.trim();
  if (taskText) {
    const currentDate = new Date().toISOString().split('T')[0]; // Формат дати: YYYY-MM-DD
    lists[listIndex].tasks.push({
      text: taskText,
      completed: false,
      creationDate: currentDate,
    });
    input.value = '';
    saveToLocalStorage();
    renderLists();
  }
}

// Видалити задачу
function deleteTask(listIndex, taskIndex) {
  lists[listIndex].tasks.splice(taskIndex, 1);
  saveToLocalStorage();
  renderLists();
}

// Відмітити як виконане
function toggleTask(listIndex, taskIndex) {
  lists[listIndex].tasks[taskIndex].completed = !lists[listIndex].tasks[taskIndex].completed;
  saveToLocalStorage();
  renderLists();
}

// Ініціалізація
renderLists();
