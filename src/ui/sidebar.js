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

export function switchProject(e) {
   const projectName = e.target.id == "" ? e.target.parentElement.id : e.target.id
   localStorage.setItem("teilyst-active-project", projectName.toLowerCase())
}

export function renderProject(project) {

   for (const p of project) {
      const container = document.createElement("div")
      container.className = "project-item"
      container.id = p.name
      container.innerHTML = 
         `
           <img src="${SBE().iconMap[p.icon]}" alt="TALK TO US" />
           <span class="project-name">${p.name}</span>
         `
      SBE().projectContainer.append(container)
   }

}


