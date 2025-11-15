const taskInput = document.getElementById("taskInput");
const categorySelect = document.getElementById("categorySelect");
const filterSelect = document.getElementById("filterSelect");
const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");
const toggleMode = document.getElementById("toggleMode");

// โหลดข้อมูล
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let darkMode = localStorage.getItem("darkMode") === "true";

// เซฟข้อมูล
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// เรนเดอร์งาน
function renderTasks() {
  taskList.innerHTML = "";
  const filter = filterSelect.value;

  tasks.forEach((task, index) => {
    if (filter !== "ทั้งหมด" && task.category !== filter) return;

    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <span onclick="toggleTask(${index})">
        <span class="category-label">${task.category}</span>
        ${task.text}
      </span>
      <button class="delete-btn" onclick="deleteTask(${index})">ลบ</button>
    `;

    taskList.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  const category = categorySelect.value;

  if (!text) return;

  tasks.push({
    text,
    category,
    completed: false
  });

  saveTasks();
  renderTasks();
  taskInput.value = "";
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", e => {
  if (e.key === "Enter") addTask();
});

filterSelect.addEventListener("change", renderTasks);

// --------- DARK MODE ----------
function applyMode() {
  if (darkMode) {
    document.body.classList.add("dark");
    toggleMode.textContent = "Light Mode";
  } else {
    document.body.classList.remove("dark");
    toggleMode.textContent = "Dark Mode";
  }
}

toggleMode.addEventListener("click", () => {
  darkMode = !darkMode;
  localStorage.setItem("darkMode", darkMode);
  applyMode();
});

// เริ่มต้น
applyMode();
renderTasks();
