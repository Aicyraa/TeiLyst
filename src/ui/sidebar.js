import { getTodoData, getProjectData, setProjectData, setTodoData } from "../utilities/storage.js";
import { SBEl, sharedIcons } from "./elements.js";

const {iconMap, sidebar, iconExpand, projectContainer} = SBEl()

export function toggleSidebar() {
   sidebar.classList.toggle("open");
   iconExpand.classList.toggle("open");
}

export function projectListener() {
   if (!sidebar.classList.contains("open")) {
      toggleSidebar();
   }
}

export function switchProject(e) {
   const item = e.target.closest('.project-item');
   if(!item) return;

   // Ignore if delete button was clicked
   if(e.target.closest('.del-project-btn')) return;

   const projectName = item.id;
   localStorage.setItem("teilyst-active-project", projectName.toLowerCase());
   updateActiveProjectClass();
}

export function updateActiveProjectClass() {
   const activeProject = localStorage.getItem("teilyst-active-project") || "all";
   document.querySelectorAll('.project-item').forEach(item => {
      if (item.id.toLowerCase() === activeProject) {
         item.classList.add('active');
      } else {
         item.classList.remove('active');
      }
   });
}

export function initProjectContainer(onUpdate) {
   projectContainer.addEventListener("click", (e) => {
      const delBtn = e.target.closest('.del-project-btn');
      if (delBtn) {
         const name = delBtn.dataset.name;
         if (confirm(`Are you sure you want to delete project "${name}"?`)) {
            setProjectData(getProjectData().filter(p => p.name !== name));
            setTodoData(getTodoData().filter(t => (t.project || '').toLowerCase() !== name.toLowerCase()));

            const active = localStorage.getItem("teilyst-active-project");
            if (active === name.toLowerCase()) {
               localStorage.setItem("teilyst-active-project", "all");
            }
            renderProject(getProjectData());
            onUpdate();
         }
         return;
      }

      switchProject(e);
      onUpdate();
   });
}

export function renderProject(project) {
   projectContainer.innerHTML = "";
   
   // "All" folder
   const allContainer = document.createElement("div");
   allContainer.className = "project-item";
   allContainer.id = "all";
   allContainer.innerHTML = `
     <img src="${iconMap['folder_def.svg']}" alt="All" />
     <span class="project-name">All</span>
   `;
   projectContainer.append(allContainer);

   for (const p of project) {
      const container = document.createElement("div")
      container.className = "project-item"
      container.id = p.name
      container.innerHTML = 
         `
           <img src="${iconMap[p.icon] || iconMap['folder_def.svg']}" alt="icon" />
           <span class="project-name">${p.name}</span>
           <button class="del-project-btn" data-name="${p.name}">
              <img src="${sharedIcons.delete}" alt="delete" />
           </button>
         `
      projectContainer.append(container)
   }
   
   updateActiveProjectClass();
}


