import folder_def from "../project/projectIcons/folder_def.svg"
import codeIcn from "../project/projectIcons/code.svg"
import houseIcn from "../project/projectIcons/house.svg"
import mathIcn from "../project/projectIcons/math.svg"
import deleteIcn from "../icons/delete.svg"
import editIcn from "../icons/edit.svg"

export const sharedIcons = {
   delete: deleteIcn,
   edit: editIcn
}

const PROJECT_ICONS = [
   { key: "folder_def.svg", src: folder_def },
   { key: "code.svg",       src: codeIcn   },
   { key: "house.svg",      src: houseIcn  },
   { key: "math.svg",       src: mathIcn   },
]

export function SBEl() {
   return {
      iconMap: Object.fromEntries(PROJECT_ICONS.map(i => [i.key, i.src])),
      sidebar: document.querySelector("#sidebar"),
      expandBtn: document.querySelector("#expand-btn"),
      iconExpand: document.querySelector("#icon-expand"),
      projectContainer: document.querySelector(".projects"),
      projectItems: document.querySelectorAll(".project-item"),   
   }
}

export function MEl() {
   return {
      iconMap: PROJECT_ICONS,
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
      statusPillsContainer: document.querySelector(".status-pills"),
      statusPills: document.querySelectorAll(".status-pill"),

      
   }
}

export function FEl(){
   return {
      pName: document.querySelector("#p-name"),
      bgPreview: document.querySelector("#bg-preview"),
      bgSwatches: document.querySelector("#bg-swatches"),
      firstBgRow: document.querySelector(".bg-row"),
      tName: document.querySelector("#t-name"),
      tCategory: document.querySelector("#t-category"),
      tDesc: document.querySelector("#t-desc"),
      tTags: document.querySelector("#t-tags"),
      tChecklist: document.querySelector("#t-checklist"),
      tDue: document.querySelector("#t-due"),
      tPriority: document.querySelector("#t-priority"),
   }
}