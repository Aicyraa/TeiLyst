import folder_def from "../project/projectIcons/folder_def.svg"
import codeIcn from "../project/projectIcons/code.svg"
import houseIcn from "../project/projectIcons/house.svg"
import mathIcn from "../project/projectIcons/math.svg"

export function SBE() {
   const sidebar = document.querySelector("#sidebar");
   const expandBtn = document.querySelector("#expand-btn");
   const iconExpand = document.querySelector("#icon-expand");
   const projectContainer = document.querySelector(".projects")
   const projectItems = document.querySelectorAll(".project-item");
   
   const iconMap = {
      "folder_def.svg": folder_def,
      "code.svg": codeIcn,
      "house.svg": houseIcn,
      "math.svg": mathIcn
   }

   return {sidebar, expandBtn, iconExpand, projectContainer, projectItems, iconMap}
}

export function folderModal() {

}

export function todoModal() {

}