import { FEl, MEl, PROJECT_ICONS } from "./elements.js";
import Project from "../project/project.js";
import Todo from "../todo/todo.js";
import { setProjectData, setTodoData, getProjectData, getTodoData } from "../utilities/storage.js";
import { renderProject } from "./sidebar.js";
import { renderTodosDOM } from "./todo.js";

// Helper
const {
   iconMap,
   overlay,
   projectModal,
   todoModal,
   addProjectBtn,
   addTodoBtn,
   projectModalClose,
   projectModalSave,
   todoModalClose,
   todoModalSave,
   projectIconsGrid,
   statusPillsContainer,
   statusPills,
} = MEl();

const { pName, bgPreview, bgSwatches, firstBgRow, tName, tCategory, tDesc, tTags, tChecklist, tDue, tPriority } = FEl();

function openModal(modal) {
   overlay.classList.add("active");
   modal.classList.add("active");
}

function closeModal(modal) {
   modal.classList.remove("active");
   if (!projectModal.classList.contains("active") && !todoModal.classList.contains("active")) {
      overlay.classList.remove("active");
   }
}

function clearTodoModal() {
   [tName, tCategory, tDesc, tTags, tChecklist, tDue].forEach((el) => (el.value = ""));
   tPriority.value = "medium";
   document.querySelectorAll(".bg-row").forEach((r, i) => r.classList.toggle("selected", i === 0));
   if (firstBgRow) syncBgPreview(firstBgRow.dataset.gradient);
   document.querySelectorAll(".status-pill").forEach((p, i) => p.classList.toggle("selected", i === 0));
}

function clearProjectModal() {
   pName.value = "";
}

// Project Modal

function renderIcons() {
   projectIconsGrid.innerHTML = "";
   iconMap.forEach(({ key, src }, i) => {
      const btn = document.createElement("button");
      btn.className = "icon-option" + (i === 0 ? " selected" : "");
      btn.dataset.iconKey = key;
      btn.innerHTML = `<img src="${src}" alt="${key}" />`;
      btn.addEventListener("click", () => {
         projectIconsGrid
            .querySelectorAll(".icon-option")
            .forEach((b) => b.classList.remove("selected"));
         btn.classList.add("selected");
      });
      projectIconsGrid.appendChild(btn);
   });
}

export function openProjectModal() {
   renderIcons();
   openModal(projectModal);
}

export function closeProjectModal() {
   closeModal(projectModal);
   clearProjectModal();
}

// Todo Modal

function syncBgPreview(gradient) {
   bgPreview.style.background = gradient;
}

export function initTodoModalInteractions() {
   // Background rows — sync preview on click
   bgSwatches.addEventListener("click", (e) => {
      const row = e.target.closest(".bg-row");

      if (!row) return;
      document.querySelectorAll(".bg-row").forEach((r) => r.classList.remove("selected"));
      row.classList.add("selected");
      syncBgPreview(row.dataset.gradient);
   });

   // Sync preview to the initially selected row
   const firstRow = document.querySelector(".bg-row.selected");
   if (firstRow) syncBgPreview(firstRow.dataset.gradient);

   // Status pills
   statusPillsContainer.addEventListener("click", (e) => {
      const pill = e.target.closest(".status-pill");
      if (!pill) return;
      statusPills.forEach((p) => p.classList.remove("selected"));
      pill.classList.add("selected");
   });
}

export function openTodoModal() {
   openModal(todoModal);
}

export function closeTodoModal() {
   closeModal(todoModal);
   clearTodoModal();
}

// Attach Save Listeners
projectModalSave.addEventListener("click", () => {
   const iconBtn = projectIconsGrid.querySelector(".icon-option.selected");
   const iconKey = iconBtn ? iconBtn.dataset.iconKey : "folder_def.svg";
   const name = pName.value.trim();
   if (!name) return;

   const newProject = new Project(iconKey, name, "");
   setProjectData([newProject]);
   
   closeProjectModal();
   // Trigger full render
   const container = document.querySelector(".projects");
   if (container) container.innerHTML = "";
   renderProject(getProjectData());
});

todoModalSave.addEventListener("click", () => {
   const name = tName.value.trim();
   if (!name) return;
   
   const bgRow = document.querySelector(".bg-row.selected");
   const background = bgRow ? bgRow.dataset.gradient : "";
   const category = tCategory.value.trim();
   const desc = tDesc.value.trim();
   const due = tDue.value;
   const statusPill = statusPillsContainer.querySelector(".status-pill.selected");
   const status = statusPill ? statusPill.dataset.status : "not-started";
   const tags = tTags.value.trim();
   const checklist = tChecklist.value.trim();
   const priority = tPriority.value; 

   const newTodo = new Todo(background, name, category, desc, due, status, checklist, tags, priority);
   
   const activeProject = localStorage.getItem("teilyst-active-project") || "all";
   newTodo._project = activeProject === "all" ? null : activeProject;

   setTodoData([newTodo]);
   
   closeTodoModal();
   renderTodosDOM(); 
});
