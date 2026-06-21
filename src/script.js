document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Digite uma tarefa!");
        return;
    }

    const task = {
        text: taskText,
        done: false
    };

    createTask(task);
    saveTask(task);

    input.value = "";
}

function createTask(task) {
    const li = document.createElement("li");

    if (task.done) {
        li.style.textDecoration = "line-through";
        li.style.opacity = "0.6";
    }

    const span = document.createElement("span");
    span.textContent = task.text;

    span.addEventListener("click", function () {
        task.done = !task.done;
        updateTask(task);
        li.remove();
        createTask(task);
    });

    const btn = document.createElement("button");
    btn.textContent = "X";
    btn.style.marginLeft = "10px";

    btn.addEventListener("click", function () {
        li.remove();
        deleteTask(task.text);
    });

    li.appendChild(span);
    li.appendChild(btn);

    document.getElementById("taskList").appendChild(li);
}

function saveTask(task) {
    let tasks = getTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function loadTasks() {
    const tasks = getTasks();
    tasks.forEach(task => createTask(task));
}

function updateTask(updatedTask) {
    let tasks = getTasks();
    tasks = tasks.map(t =>
        t.text === updatedTask.text ? updatedTask : t
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(taskText) {
    let tasks = getTasks();
    tasks = tasks.filter(t => t.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}