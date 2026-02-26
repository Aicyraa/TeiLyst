import "./style.css";
import Todo from "./todo/todo.js";
import Project from "./project/project.js";
import { getProjectData, setTodoData, setProjectData } from "./utilities/storage.js";
import { MEl, SBEl } from "./ui/elements.js";
import { renderTodosDOM } from "./ui/todo.js";
import { toggleSidebar, projectListener, initProjectContainer, renderProject } from "./ui/sidebar.js";
import { openProjectModal, closeProjectModal, initTodoModalInteractions, openTodoModal, closeTodoModal } from "./ui/modal.js";
import { initNavbar } from "./ui/navbar.js";

function seedDummyData() {
  if (localStorage.getItem("teilyst-todo") || localStorage.getItem("teilyst-project")) return;

  const projects = [
    new Project(0, "Work", "Tasks related to work and career"),
    new Project(1, "Home", "Household chores and personal errands"),
    new Project(2, "Learning", "Books, courses, and skill development"),
    new Project(null, "Health", "Fitness, diet, and wellness goals"),
    new Project(null, "Finance", "Budgeting, savings, and investments"),
  ];

  const todos = [
    new Todo("#e74c3c", "Fix login bug", "Bug", "Users get 401 errors after token refresh", "2026-02-28T09:00", "in-progress", "Reproduce,Check token logic,Write tests", "bug,auth", "high"),
    new Todo("#3498db", "Design new dashboard", "Feature", "Wireframe and implement the new analytics dashboard", "2026-03-05T17:00", "pending", "Wireframe,Review,Implement,Test", "ui,design", "high"),
    new Todo("#2ecc71", "Write unit tests", "Work", "Add test coverage for the auth module", "2026-03-08T12:00", "pending", "Auth tests,Storage tests,Filter tests", "testing,quality", "medium"),
    new Todo("#9b59b6", "Code review PR #42", "Work", "Review and approve the refactor pull request", "2026-02-27T16:00", "completed", "Read diff,Leave comments,Approve", "review,team", "low"),
    new Todo("#f39c12", "Buy groceries", "Errand", "Pick up fruits, vegetables, milk, and bread", "2026-02-26T18:00", "pending", "Fruits,Vegetables,Milk,Bread", "shopping,errands", "medium"),
    new Todo("#1abc9c", "Clean the garage", "Home", "Sort and dispose of unused items in the garage", "2026-03-15T10:00", "pending", "Sort boxes,Donate items,Sweep floor", "cleaning,home", "low"),
    new Todo("#e67e22", "Read Clean Code", "Learning", "Finish chapters 5 through 8 of Clean Code by Robert Martin", "2026-03-01T20:00", "in-progress", "Chapter 5,Chapter 6,Chapter 7,Chapter 8", "books,programming", "medium"),
    new Todo("#e74c3c", "Morning jog", "Health", "Run 5km in the morning before work", "2026-02-27T07:00", "completed", "Stretch,Run 5km,Cool down", "fitness,routine", "high"),
    new Todo("#3498db", "Meal prep Sunday", "Health", "Prepare lunches and dinners for the upcoming week", "2026-03-02T11:00", "pending", "Plan menu,Shop ingredients,Cook,Store", "nutrition,routine", "medium"),
    new Todo("#2ecc71", "Update portfolio site", "Career", "Add recent projects and refresh the about section", "2026-03-10T23:59", "in-progress", "Add projects,Update bio,Deploy", "web,career", "medium"),
    new Todo("#9b59b6", "Review monthly budget", "Finance", "Go over expenses and adjust the savings plan", "2026-03-01T19:00", "pending", "Check expenses,Adjust savings,Update spreadsheet", "money,planning", "high"),
    new Todo("#f39c12", "Set up emergency fund", "Finance", "Transfer funds to a dedicated emergency savings account", "2026-03-20T12:00", "pending", "Calculate target,Open account,Transfer", "savings,money", "high"),
    new Todo("#1abc9c", "Learn TypeScript basics", "Learning", "Go through the official TypeScript handbook chapters 1–4", "2026-03-12T21:00", "pending", "Chapter 1,Chapter 2,Chapter 3,Chapter 4", "typescript,programming", "medium"),
    new Todo("#e67e22", "Plan team outing", "Work", "Organize a team lunch for next Friday", "2026-03-07T12:00", "pending", "Pick venue,Send invites,Confirm headcount", "team,social", "low"),
    new Todo("#e74c3c", "Fix CSS overflow bug", "Bug", "Sidebar overflows on mobile viewports below 375px", "2026-02-28T15:00", "pending", "Reproduce,Debug,Fix,Test on devices", "css,mobile,bug", "high"),
  ];

  setProjectData(projects);
  setTodoData(todos);
}

(() => {

  // Seed dummy data if storage is empty
  seedDummyData();

  // Initialize
  renderProject(getProjectData());
  renderTodosDOM();

  const s = SBEl();
  const m = MEl();

  // Sidebar
  s.expandBtn.addEventListener("click", toggleSidebar);
  s.projectItems.forEach(p => p.addEventListener("click", projectListener));
  initProjectContainer(renderTodosDOM);

  // Modals
  initTodoModalInteractions();
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
     if (btn) btn.addEventListener("click", () => {
        localStorage.setItem("teilyst-view", view);
        renderTodosDOM();
     });
  });

  // Navbar
  initNavbar(renderTodosDOM);

})()

