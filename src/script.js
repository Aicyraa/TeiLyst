import "./style.css";
import Todo from "./todo/todo.js";
import Project from "./project/project.js";
import { countTodo, getAllCategory, getAllTags } from "./todo/utilities.js";
import { FDue, FDueBefore, FDueAfter, FDueRange } from "./utilities/filter.js";
import { STodo, SCategory, SDue } from "./utilities/sort.js";
import { getTodoData, setTodoData, getProjectData, setProjectData } from "./utilities/storage.js";
import { MEl, SBEl } from "./ui/elements.js";
import { renderTodosDOM } from "./ui/todo.js";
import { toggleSidebar, projectListener, switchProject, renderProject } from "./ui/sidebar.js";
import { openProjectModal, closeProjectModal, initTodoModalInteractions, openTodoModal, closeTodoModal } from "./ui/modal.js";

const todos = [
  new Todo(null, "Buy groceries", "Personal", "Pick up fruits, vegetables, and milk from the store", "2026-02-25T14:30", "pending", "Fruits,Vegetables,Milk", "shopping,errands", "high",), 
  new Todo(null, "Fix login bug", "Work", "Users are getting 401 errors after token refresh", "2026-02-21T09:00", "in-progress", "Reproduce issue,Check token logic,Write tests", "bug,auth", "high",), 
  new Todo(null, "Read Clean Code", "Learning", "Finish chapaters 5 through 8", "2026-03-01T18:00", "pending", "Chapter 5,Chapter 6,Chapter 7,Chapter 8", "books,self-improvement", "low",), 
  new Todo(null, "Plan team outing", "Work", "Organize a team lunch for next Friday", "2026-02-27T12:00", "pending", "Pick restaurant,Send invites,Confirm headcount", "team,social", "medium",),
  new Todo(null, "Update portfolio site", "Personal", "Add recent projects and update the about section", "2026-03-10T23:59", "completed", "Add projects,Update about,Deploy", "web,career", "medium",),
  new Todo(null, "Learn JS", "Career", "Yea", "2026-03-10T10:00", "In-progress", "Add projects,Update about,Deploy", "Programming", "medium",),];

const projects = [
   new Project(null, "Math", "Yes 1"),
   new Project(1, "Code", "Yes 2"),
   new Project(0, "House", "Yes 3"),
   new Project(2, "Test", "Yes 4"),
];

(() => {  

  // Initialize
  renderProject(getProjectData())
  renderTodosDOM();
  
  const s = SBEl()
  const m = MEl();
  
  initTodoModalInteractions();
  s.expandBtn.addEventListener("click", toggleSidebar);
  s.projectContainer.addEventListener("click", (e) => {
     const delBtn = e.target.closest('.del-project-btn');
     if (delBtn) {
         const name = delBtn.dataset.name;
         if (confirm(`Are you sure you want to delete project "${name}"?`)) {
             const allProjects = getProjectData();
             setProjectData(allProjects.filter(p => p.name !== name));
             
             const allTodos = getTodoData();
             setTodoData(allTodos.filter(t => (t.project || '').toLowerCase() !== name.toLowerCase()));

             const active = localStorage.getItem("teilyst-active-project");
             if(active === name.toLowerCase()) {
                 localStorage.setItem("teilyst-active-project", "all");
             }
             renderProject(getProjectData());
             renderTodosDOM();
         }
         return;
     }

     switchProject(e);
     renderTodosDOM();
  });
  s.projectItems.forEach(p => p.addEventListener("click", projectListener))

  m.addProjectBtn.addEventListener("click", openProjectModal);
  m.addTodoBtn.addEventListener("click", openTodoModal);
  m.projectModalClose.addEventListener("click", closeProjectModal);
  m.todoModalClose.addEventListener("click", closeTodoModal);
  m.overlay.addEventListener("click", () => {
     if (m.projectModal.classList.contains("active")) closeProjectModal();
     if (m.todoModal.classList.contains("active")) closeTodoModal();
  });

  // View switchers
  ["list", "group", "grid"].forEach(view => {
      const btn = document.getElementById("view-" + view);
      if (btn) {
          btn.addEventListener("click", () => {
             localStorage.setItem("teilyst-view", view);
             renderTodosDOM();
          });
      }
  });

  // Sort logic
  const sfSelect = document.getElementById("sort-filter-select");
  if (sfSelect) {
     sfSelect.addEventListener("change", (e) => {
        localStorage.setItem("teilyst-sort", e.target.value);
        renderTodosDOM();
     });
     sfSelect.value = localStorage.getItem("teilyst-sort") || "none";
  }

})()

