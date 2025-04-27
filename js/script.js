// // Theme toggle functionality
// const themeToggle = document.getElementById('theme-toggle');
// const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// // Check for saved theme preference or use system preference
// const currentTheme = localStorage.getItem('theme') || 
//                    (prefersDarkScheme.matches ? 'dark' : 'light');
// if (currentTheme === 'dark') {
//     document.body.classList.add('dark-mode');
//     themeToggle.textContent = '☀️';
// }

// // Toggle theme on button click
// themeToggle.addEventListener('click', function() {
//     if (document.body.classList.contains('dark-mode')) {
//         document.body.classList.remove('dark-mode');
//         localStorage.setItem('theme', 'light');
//         themeToggle.textContent = '🌓';
//     } else {
//         document.body.classList.add('dark-mode');
//         localStorage.setItem('theme', 'dark');
//         themeToggle.textContent = '☀️';
//     }
// });



document.addEventListener('DOMContentLoaded', function () {
    // Tabs functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Modal functionality
    const modal = document.getElementById('add-task-modal');
    const addNewBtn = document.getElementById('add-new-btn');
    const closeModalBtn = document.querySelector('.close-modal');
    const cancelBtn = document.querySelector('.close-modal-btn');

    if (addNewBtn && modal) {
        addNewBtn.addEventListener('click', function () {
            modal.style.display = 'block';
        });
    }

    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener('click', function () {
            modal.style.display = 'none';
        });
    }

    if (cancelBtn && modal) {
        cancelBtn.addEventListener('click', function () {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // TODO LIST FUNCTIONALITY
    const todoForm = document.querySelector('.add-todo-form');
    const todoInput = todoForm?.querySelector('.form-input');
    const todoList = document.querySelector('.todo-list');
    const addTodoBtn = todoForm?.querySelector('.btn-primary');

    if (todoForm && todoInput && addTodoBtn && todoList) {
        addTodoBtn.addEventListener('click', function () {
            addTodoItem();
        });

        todoInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault(); // Prevent form submission
                addTodoItem();
            }
        });
    }

    function addTodoItem() {
        const todoText = todoInput.value.trim();
        if (todoText) {
            const todoId = 'todo' + Date.now();

            const todoItem = document.createElement('div');
            todoItem.className = 'todo-item';
            todoItem.innerHTML = `
                <input type="checkbox" class="todo-check" id="${todoId}">
                <div class="todo-content">
                    <label for="${todoId}" class="todo-title">${todoText}</label>
                    <div class="todo-meta">
                        <div><i>📅</i> Due Today</div>
                        <div><i>🏷️</i> General</div>
                    </div>
                </div>
                <div class="todo-actions">
                    <button class="btn-icon edit-todo"><i>✏️</i></button>
                    <button class="btn-icon delete-todo"><i>🗑️</i></button>
                </div>
            `;

            todoList.appendChild(todoItem);
            todoInput.value = '';
            addEventListenersToTodoItem(todoItem);
        }
    }

    function addEventListenersToTodoItem(todoItem) {
        const deleteBtn = todoItem.querySelector('.delete-todo');
        deleteBtn.addEventListener('click', function () {
            todoItem.remove();
        });

        const editBtn = todoItem.querySelector('.edit-todo');
        editBtn.addEventListener('click', function () {
            const todoLabel = todoItem.querySelector('.todo-title');
            const currentText = todoLabel.textContent;

            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.className = 'form-input';
            inputField.value = currentText;

            todoLabel.parentNode.replaceChild(inputField, todoLabel);
            inputField.focus();

            inputField.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    saveEditedTodo(todoItem, inputField);
                }
            });

            inputField.addEventListener('blur', function () {
                saveEditedTodo(todoItem, inputField);
            });
        });

        const checkbox = todoItem.querySelector('.todo-check');
        checkbox.addEventListener('change', function () {
            const todoTitle = todoItem.querySelector('.todo-title');
            const todoMeta = todoItem.querySelector('.todo-meta');

            if (this.checked) {
                todoTitle.classList.add('completed');
                todoMeta.innerHTML = `
                    <div><i>✅</i> Completed</div>
                    <div><i>🏷️</i> General</div>
                `;
            } else {
                todoTitle.classList.remove('completed');
                todoMeta.innerHTML = `
                    <div><i>📅</i> Due Today</div>
                    <div><i>🏷️</i> General</div>
                `;
            }
        });
    }

    function saveEditedTodo(todoItem, inputField) {
        const newText = inputField.value.trim();
        const checkboxId = todoItem.querySelector('.todo-check').id;

        const todoLabel = document.createElement('label');
        todoLabel.className = 'todo-title';
        todoLabel.setAttribute('for', checkboxId);
        todoLabel.textContent = newText || 'Untitled Task';

        inputField.parentNode.replaceChild(todoLabel, inputField);
    }

    // Initialize any pre-existing todo items
    document.querySelectorAll('.todo-item').forEach(item => {
        addEventListenersToTodoItem(item);
    });

    // Modal form task addition
    const modalForm = document.querySelector('.modal-form');
    const addTaskBtn = modalForm?.querySelector('.btn-primary');

    if (modalForm && addTaskBtn && modal) {
        addTaskBtn.addEventListener('click', function () {
            const taskTitle = modalForm.querySelector('input[type="text"]').value.trim();
            const taskCategory = modalForm.querySelector('.form-select').value;
            const taskDueDate = modalForm.querySelector('input[type="date"]').value;

            if (taskTitle) {
                const todoId = 'todo' + Date.now();

                const todoItem = document.createElement('div');
                todoItem.className = 'todo-item';
                todoItem.innerHTML = `
                    <input type="checkbox" class="todo-check" id="${todoId}">
                    <div class="todo-content">
                        <label for="${todoId}" class="todo-title">${taskTitle}</label>
                        <div class="todo-meta">
                            <div><i>📅</i> ${taskDueDate ? 'Due ' + formatDate(taskDueDate) : 'No due date'}</div>
                            <div><i>🏷️</i> ${taskCategory}</div>
                        </div>
                    </div>
                    <div class="todo-actions">
                        <button class="btn-icon edit-todo"><i>✏️</i></button>
                        <button class="btn-icon delete-todo"><i>🗑️</i></button>
                    </div>
                `;

                todoList.appendChild(todoItem);
                modalForm.querySelector('input[type="text"]').value = '';
                modalForm.querySelector('input[type="date"]').value = '';
                addEventListenersToTodoItem(todoItem);
                modal.style.display = 'none';
            }
        });
    }

    function formatDate(dateString) {
        const options = { month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
});

function lock(){
    alert("Access Blockedd until register and Login");
}
localStorage.setItem('userLoggedIn', 'true');

function logout() {
    // Clear the login state
    localStorage.removeItem('userLoggedIn');

    // Use history.replaceState to prevent going back
    history.replaceState(null, '', 'index.html');
    
    // Redirect to index.html
    window.location.href = 'index.html';
}


// When page is loaded, check if the user is logged in
window.onload = function() {
    const userLoggedIn = localStorage.getItem('userLoggedIn');

    // If not logged in, redirect to index or login page
    if (!userLoggedIn && window.location.pathname !== '/index.html') {
        // Prevent backtracking if user tries to go to the dashboard without being logged in
        window.location.href = 'index.html';
    }
};

