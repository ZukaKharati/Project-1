const allDiv = document.getElementById("all");
const activeDiv = document.getElementById("active");
const completedDiv = document.getElementById("completed");

allDiv.addEventListener("click", function () {
  location.href = "./index.html";
});

activeDiv.addEventListener("click", function () {
  location.href = "./active.html";
});

completedDiv.addEventListener("click", function () {
  location.href = "./completed.html";
});

const form = document.getElementById("form");
const results = document.querySelector("#results");

const TASKS_KEY = "task";

function renderTask() {
  const tasks = JSON.parse(localStorage.getItem(TASKS_KEY));

  if (results.hasChildNodes()) {
    results.replaceChildren();
  }

  tasks &&
    tasks.forEach((task) => {
      const div = document.createElement("div");
      div.classList = "task";

      const label = document.createElement("label");
      label.setAttribute("for", task.id);
      label.innerText = task.task;

      const checkbox = document.createElement("input");
      checkbox.setAttribute("id", task.id);
      checkbox.setAttribute("type", "checkbox");

      if (task.isCompleted) {
        // If the task is completed, redirect to the completed page
        checkbox.checked = true;
        checkbox.addEventListener("change", () => {
          location.href = "./completed.html";
        });
      } else {
        checkbox.addEventListener("change", () => {
          // If the checkbox is checked, update the task's isCompleted status and re-render the tasks
          task.isCompleted = true;
          localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
          renderTask();
        });
      }

      div.append(checkbox, label);
      results.appendChild(div);
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const input = e.target.detail;

  const tasks = JSON.parse(localStorage.getItem(TASKS_KEY));

  let newTasks = tasks
    ? [{ id: (Math.random() * 1000000).toFixed(), task: input.value, isCompleted: true }, ...tasks]
    : [{ id: (Math.random() * 1000000).toFixed(), task: input.value, isCompleted: false }];

  localStorage.setItem(TASKS_KEY, JSON.stringify(newTasks));

  renderTask();

  input.value = "";
});

renderTask();

const clearStorageBtn = document.getElementById("clear-storage-btn");

clearStorageBtn.addEventListener("click", function () {
  localStorage.clear();
});
