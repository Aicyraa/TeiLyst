import { SBE } from "./elements.js";



export function toggleSidebar() {
   SBE().sidebar.classList.toggle("open");
   SBE().iconExpand.classList.toggle("open");
}

export function projectListener() {
   if (!SBE().sidebar.classList.contains("open")) {
      toggleSidebar();
   }
}

export function renderProject(project) {

   for (const p of project) {
      const container = document.createElement("div")
      container.className = "project-item"
      container.innerHTML = 
         `
           <img src="${SBE().iconMap[p.icon]}" alt="TALK TO US" />
           <span class="project-name">${p.name}</span>
         `
      SBE().projectContainer.append(container)
   }

}


