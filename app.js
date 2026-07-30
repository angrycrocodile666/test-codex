export const DEFAULT_TASKS = [
  { id: 1, title: "让 Codex 解释项目结构", tag: "入门", done: true },
  { id: 2, title: "修改页面的主题颜色", tag: "样式", done: false },
  { id: 3, title: "为任务列表添加筛选功能", tag: "功能", done: false },
];

export function calculateProgress(tasks) {
  const completed = tasks.filter((task) => task.done).length;
  return { completed, total: tasks.length, percent: tasks.length ? (completed / tasks.length) * 100 : 0 };
}

const storageKey = "codex-web-lab-tasks";
let tasks = loadTasks();

function loadTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    return Array.isArray(saved) ? saved : DEFAULT_TASKS;
  } catch {
    return DEFAULT_TASKS;
  }
}

function saveTasks() {
  localStorage.setItem(storageKey, JSON.stringify(tasks));
}

function render() {
  const list = document.querySelector("#task-list");
  if (!list) return;
  list.replaceChildren(...tasks.map(createTaskElement));

  const { completed, total, percent } = calculateProgress(tasks);
  document.querySelector("#progress-label").textContent = `${completed} / ${total} 完成`;
  document.querySelector("#progress-bar").style.width = `${percent}%`;
}

function createTaskElement(task) {
  const article = document.createElement("article");
  article.className = `task${task.done ? " completed" : ""}`;

  const checkbox = document.createElement("button");
  checkbox.type = "button";
  checkbox.className = "checkbox";
  checkbox.setAttribute("aria-label", `${task.done ? "取消完成" : "完成"}：${task.title}`);
  checkbox.textContent = task.done ? "✓" : "";
  checkbox.addEventListener("click", () => {
    task.done = !task.done;
    saveTasks();
    render();
  });

  const content = document.createElement("div");
  const title = document.createElement("h3");
  title.textContent = task.title;
  const tag = document.createElement("span");
  tag.className = "tag";
  tag.textContent = task.tag;
  content.append(title, tag);

  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "remove";
  remove.setAttribute("aria-label", `删除：${task.title}`);
  remove.textContent = "×";
  remove.addEventListener("click", () => {
    tasks = tasks.filter(({ id }) => id !== task.id);
    saveTasks();
    render();
  });

  article.append(checkbox, content, remove);
  return article;
}

if (typeof document !== "undefined") {
  document.querySelector("#task-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.querySelector("#task-input");
    const title = input.value.trim();
    if (!title) return;
    tasks.push({ id: Date.now(), title, tag: "自定义", done: false });
    input.value = "";
    saveTasks();
    render();
  });

  document.querySelector("#theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });

  document.querySelector("#copy-prompt").addEventListener("click", async (event) => {
    const prompt = "为任务卡片添加截止日期，并将过期任务标记为红色。";
    await navigator.clipboard.writeText(prompt);
    event.currentTarget.textContent = "已复制";
    setTimeout(() => { event.currentTarget.textContent = "复制"; }, 1600);
  });

  document.querySelector("#year").textContent = new Date().getFullYear();
  render();
}
