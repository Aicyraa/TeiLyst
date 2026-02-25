import { getTodoData, replaceTodoData } from "../utilities/storage.js";
import { STodo, SDue } from "../utilities/sort.js";
import { FCategory, FTags, FDue, FDueBefore, FDueAfter, FDueRange } from "../utilities/filter.js";
import { parseISO } from "date-fns";
import { sharedIcons } from "./elements.js";

export function renderTodo(todos) {
   const active = localStorage.getItem("teilyst-active-project") || "all";
   let filtered = active === "all" ? todos : todos.filter(t => t.project == active);

   // Apply active filters from localStorage
   const filterState = JSON.parse(localStorage.getItem("teilyst-filter") || "{}");

   if (filterState.categories && filterState.categories.length > 0) {
      filtered = filtered.filter(t => filterState.categories.includes(t.category));
   }
   if (filterState.tags && filterState.tags.length > 0) {
      filtered = filtered.filter(t => t.tags && t.tags.some(tag => filterState.tags.includes(tag)));
   }
   if (filterState.dueMode && filterState.dueMode !== "none" && filterState.dateA) {
      const dateA = parseISO(filterState.dateA);
      switch (filterState.dueMode) {
         case "on":     filtered = FDue(dateA, filtered); break;
         case "before": filtered = FDueBefore(dateA, filtered); break;
         case "after":  filtered = FDueAfter(dateA, filtered); break;
         case "range":
            if (filterState.dateB) {
               filtered = FDueRange(dateA, parseISO(filterState.dateB), filtered);
            }
            break;
      }
   }

   const activeSort = localStorage.getItem("teilyst-sort") || "none";
   switch (activeSort) {
      case "name-asc": return STodo(filtered, true);
      case "name-desc": return STodo(filtered, false);
      case "due-asc":  return SDue(filtered, true);
      case "due-desc": return SDue(filtered, false);
      default: return filtered;
   }
}

function statusClass(status) {
   if (!status) return "status-unknown";
   return "status-" + status.toLowerCase().replace(/\s+/g, "-");
}

function createTodoDOM(todo, variant = "default") {
   const div = document.createElement("div");
   div.className = "todo-card";
   const bg = todo.background || "linear-gradient(120deg, #1a1a2e, #16213e)";
   const tagsHTML = todo.tags ? todo.tags.map(t => '<span>#'+t+'</span>').join('') : '';

   if (variant === "group") {
      div.innerHTML = `
         <div class="todo-banner todo-banner--compact" style="background: ${bg};">
            <div class="todo-banner-top">
               <div class="todo-banner-labels">
                  <span class="todo-category">${todo.category || 'General'}</span>
               </div>
               <div class="todo-actions">
                  <button class="todo-btn edit-btn" data-id="${todo.id}"><img src="${sharedIcons.edit}" alt="edit"/></button>
                  <button class="todo-btn del-btn" data-id="${todo.id}"><img src="${sharedIcons.delete}" alt="delete"/></button>
               </div>
            </div>
         </div>
         <div class="todo-body todo-body--group">
            <div class="todo-name-row">
               <h3 class="todo-name">${todo.name}</h3>
               <div class="todo-badges">
                  <span class="todo-status ${statusClass(todo.status)}">${todo.status || 'unknown'}</span>
                  <span class="todo-priority priority-${todo.priority}">${todo.priority}</span>
               </div>
            </div>
            ${tagsHTML ? `<div class="todo-tags">${tagsHTML}</div>` : ''}
            <span class="todo-due todo-due--group">${todo.dueFormatted}</span>
         </div>
      `;
      return div;
   }

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
            <div class="todo-banner-labels">
               <span class="todo-category">${todo.category || 'General'}</span>
            </div>
            <div class="todo-actions">
               <button class="todo-btn edit-btn" data-id="${todo.id}"><img src="${sharedIcons.edit}" alt="edit"/></button>
               <button class="todo-btn del-btn" data-id="${todo.id}"><img src="${sharedIcons.delete}" alt="delete"/></button>
            </div>
         </div>
      </div>
      <div class="todo-body">
         <div class="todo-name-row">
            <h3 class="todo-name">${todo.name}</h3>
            <div class="todo-badges">
               <span class="todo-status ${statusClass(todo.status)}">${todo.status || 'unknown'}</span>
               <span class="todo-priority priority-${todo.priority}">${todo.priority}</span>
            </div>
         </div>
         <div class="todo-meta">
            <span class="todo-status ${statusClass(todo.status)} todo-meta-status">${todo.status || 'unknown'}</span>
            <span class="todo-priority priority-${todo.priority} todo-meta-priority">${todo.priority}</span>
            <span class="todo-due">${todo.dueFormatted}</span>
         </div>
         <div class="todo-tags">${tagsHTML}</div>
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
         items.forEach(t => itemsContainer.appendChild(createTodoDOM(t, "group")));
         
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