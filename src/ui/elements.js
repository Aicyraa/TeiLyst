import folder_def from "../project/projectIcons/folder_def.svg"
import codeIcn from "../project/projectIcons/code.svg"
import houseIcn from "../project/projectIcons/house.svg"
import mathIcn from "../project/projectIcons/math.svg"

export const PROJECT_ICONS = [
   { key: "folder_def.svg", src: folder_def },
   { key: "code.svg",       src: codeIcn   },
   { key: "house.svg",      src: houseIcn  },
   { key: "math.svg",       src: mathIcn   },
]

export function SBE() {
   const iconMap = Object.fromEntries(PROJECT_ICONS.map(i => [i.key, i.src]))
   const sidebar = document.querySelector("#sidebar");
   const expandBtn = document.querySelector("#expand-btn");
   const iconExpand = document.querySelector("#icon-expand");
   const projectContainer = document.querySelector(".projects")
   const projectItems = document.querySelectorAll(".project-item");

   return { sidebar, expandBtn, iconExpand, projectContainer, projectItems, iconMap }
}

export function ME() {
   return {
      overlay: document.querySelector("#overlay"),
      projectModal: document.querySelector("#project-modal"),
      todoModal: document.querySelector("#todo-modal"),
      addProjectBtn: document.querySelector("#add-project-btn"),
      addTodoBtn: document.querySelector("#add-todo-btn"),
      projectModalClose: document.querySelector("#project-modal-close"),
      projectModalSave: document.querySelector("#project-modal-save"),
      todoModalClose: document.querySelector("#todo-modal-close"),
      todoModalSave: document.querySelector("#todo-modal-save"),
      projectIconsGrid: document.querySelector("#project-icons-grid"),
      bgSwatches: document.querySelectorAll(".bg-swatch"),
      statusPills: document.querySelectorAll(".status-pill"),
   }
}
