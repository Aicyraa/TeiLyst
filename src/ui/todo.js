import { getTodoData, replaceTodoData } from "../utilities/storage.js";
import { STodo, SDue } from "../utilities/sort.js";
import { sharedIcons } from "./elements.js";

export function renderTodo(todos) {
   const active = localStorage.getItem("teilyst-active-project") || "all";
   let filtered = active === "all" ? todos : todos.filter(t => t.project == active);
   
   const activeSort = localStorage.getItem("teilyst-sort") || "none";
   switch (activeSort) {
      case "name-asc": return STodo(filtered, true);
      case "name-desc": return STodo(filtered, false);
      case "due-asc":  return SDue(filtered, true);
      case "due-desc": return SDue(filtered, false);
      default: return filtered;
   }
}

function createTodoDOM(todo) {
   const div = document.createElement("div");
   div.className = "todo-card";
   const bg = todo.background || "linear-gradient(120deg, #1a1a2e, #16213e)";
   
   let checklistHTML = '';
   if (todo.checkList && todo.checkList.length > 0 && todo.checkList[0] !== "") {
       checklistHTML = `
       <div class="todo-checklist-container">
           <h4 class="todo-checklist-title">Checklist</h4>
           <ul class="todo-checklist">
               ${todo.checkList.map(item => `<li><span class="checklist-bullet"></span>${item}</li>`).join('')}
           </ul>
       </div>`;
   }
   
   div.innerHTML = `
      <div class="todo-banner" style="background: ${bg};">
         <div class="todo-banner-top">
            <span class="todo-category">${todo.category || 'General'}</span>
            <div class="todo-actions">
               <button class="todo-btn edit-btn" data-id="${todo.id}"><img src="${sharedIcons.edit}" alt="edit"/></button>
               <button class="todo-btn del-btn" data-id="${todo.id}"><img src="${sharedIcons.delete}" alt="delete"/></button>
            </div>
         </div>
      </div>
      <div class="todo-body">
         <h3 class="todo-name">${todo.name}</h3>
         <div class="todo-meta">
            <span class="todo-due">${todo.dueFormatted}</span>
            <span class="todo-priority priority-${todo.priority}">${todo.priority}</span>
         </div>
         <div class="todo-tags">${todo.tags ? todo.tags.map(t => '<span>#'+t+'</span>').join('') : ''}</div>
         <p class="todo-desc">${todo.description || ''}</p>
         ${checklistHTML}
      </div>
   `;
   return div;
}

export function renderTodosDOM() {
   const container = document.querySelector(".todo-container");
   if (!container) return;

   const activeView = localStorage.getItem("teilyst-view") || "list";
   container.className = "todo-container " + activeView + "-mode";
   container.innerHTML = "";

   const filteredTodos = renderTodo(getTodoData());

   if (activeView === "group") {
      const statuses = ["not-started", "in-progress", "complete"];
      statuses.forEach(status => {
         const col = document.createElement("div");
         col.className = "todo-group-col";
         col.innerHTML = `<h4>${status.replace("-", " ").toUpperCase()}</h4><div class="group-items"></div>`;
         
         const itemsContainer = col.querySelector(".group-items");
         const items = filteredTodos.filter(t => t.status === status);
         items.forEach(t => itemsContainer.appendChild(createTodoDOM(t)));
         
         container.appendChild(col);
      });
   } else {
      filteredTodos.forEach(t => {
         container.appendChild(createTodoDOM(t));
      });
   }

   // Attach events
   container.querySelectorAll(".del-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
         const id = e.currentTarget.dataset.id;
         const allTodos = getTodoData();
         replaceTodoData(allTodos.filter(t => t.id !== id));
         renderTodosDOM();
      });
   });
}