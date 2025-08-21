let tasks = [];
let filter = "all";

function addTask() {
  const input = document.getElementById("taskInput");
  const priority = document.getElementById("priorityInput").value;
  const dueDate = document.getElementById("dateInput").value;
  const taskText = input.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    priority: priority,
    dueDate: dueDate || "No date",
    completed: false
  };

  tasks.push(task);
  input.value = "";
  document.getElementById("dateInput").value = "";

  renderTasks();
}

function toggleComplete(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

function editTask(id) {
  const newText = prompt("Edit your task:");
  if (newText) {
    tasks = tasks.map(task =>
      task.id === id ? { ...task, text: newText } : task
    );
    renderTasks();
  }
}

function filterTasks(type) {
  filter = type;
  document.querySelectorAll(".filters button").forEach(btn => btn.classList.remove("active"));
  document.querySelector(`.filters button[onclick="filterTasks('${type}')"]`).classList.add("active");
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  let filteredTasks = tasks;
  if (filter === "completed") filteredTasks = tasks.filter(t => t.completed);
  if (filter === "pending") filteredTasks = tasks.filter(t => !t.completed);

  filteredTasks.forEach(task => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const taskInfo = document.createElement("div");
    taskInfo.className = "task-info";

    const span = document.createElement("span");
    span.innerText = task.text;

    const meta = document.createElement("div");
    meta.className = "task-meta";
    meta.innerHTML = `
      <span class="priority-${task.priority.toLowerCase()}">Priority: ${task.priority}</span> |
      <span>Due: ${task.dueDate}</span>
    `;

    taskInfo.appendChild(span);
    taskInfo.appendChild(meta);

    const buttons = document.createElement("div");
    buttons.className = "task-buttons";

    const doneBtn = document.createElement("button");
    doneBtn.innerText = "✔";
    doneBtn.className = "done";
    doneBtn.onclick = () => toggleComplete(task.id);

    const editBtn = document.createElement("button");
    editBtn.innerText = "✎";
    editBtn.className = "edit";
    editBtn.onclick = () => editTask(task.id);

    const delBtn = document.createElement("button");
    delBtn.innerText = "🗑";
    delBtn.className = "delete";
    delBtn.onclick = () => deleteTask(task.id);

    buttons.appendChild(doneBtn);
    buttons.appendChild(editBtn);
    buttons.appendChild(delBtn);

    li.appendChild(taskInfo);
    li.appendChild(buttons);

    list.appendChild(li);
  });
}

renderTasks();
