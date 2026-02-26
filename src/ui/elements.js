import folder_def from "../project/projectIcons/folder_def.svg"
import codeIcn from "../project/projectIcons/code.svg"
import houseIcn from "../project/projectIcons/house.svg"
import mathIcn from "../project/projectIcons/math.svg"
import beachIcn from "../project/projectIcons/beach-stroke-rounded.svg"
import apartmentIcn from "../project/projectIcons/apartment-stroke-rounded.svg"
import churchIcn from "../project/projectIcons/church-stroke-rounded.svg"
import firePitIcn from "../project/projectIcons/fire-pit-stroke-rounded.svg"
import ferrisWheelIcn from "../project/projectIcons/ferris-wheel-stroke-rounded.svg"
import torriGateIcn from "../project/projectIcons/torri-gate-stroke-rounded.svg"
import handBagIcn from "../project/projectIcons/hand-bag-01-stroke-rounded.svg"
import dress03Icn from "../project/projectIcons/dress-03-stroke-rounded.svg"
import dress06Icn from "../project/projectIcons/dress-06-stroke-rounded.svg"
import botIcn from "../project/projectIcons/bot-stroke-rounded.svg"
import checkmarkBadgeIcn from "../project/projectIcons/checkmark-badge-01-stroke-rounded.svg"
import bitcoinSquareIcn from "../project/projectIcons/bitcoin-square-stroke-rounded.svg"
import barChartIcn from "../project/projectIcons/bar-chart-horizontal-stroke-rounded.svg"
import deleteIcn from "../icons/delete.svg"
import editIcn from "../icons/edit.svg"

export const sharedIcons = {
   delete: deleteIcn,
   edit: editIcn
}

const PROJECT_ICONS = [
   { key: "folder_def.svg",                      src: folder_def       },
   { key: "code.svg",                             src: codeIcn          },
   { key: "house.svg",                            src: houseIcn         },
   { key: "math.svg",                             src: mathIcn          },
   { key: "beach-stroke-rounded.svg",             src: beachIcn         },
   { key: "apartment-stroke-rounded.svg",         src: apartmentIcn     },
   { key: "church-stroke-rounded.svg",            src: churchIcn        },
   { key: "fire-pit-stroke-rounded.svg",          src: firePitIcn       },
   { key: "ferris-wheel-stroke-rounded.svg",      src: ferrisWheelIcn   },
   { key: "torri-gate-stroke-rounded.svg",        src: torriGateIcn     },
   { key: "hand-bag-01-stroke-rounded.svg",       src: handBagIcn       },
   { key: "dress-03-stroke-rounded.svg",          src: dress03Icn       },
   { key: "dress-06-stroke-rounded.svg",          src: dress06Icn       },
   { key: "bot-stroke-rounded.svg",               src: botIcn           },
   { key: "checkmark-badge-01-stroke-rounded.svg",src: checkmarkBadgeIcn},
   { key: "bitcoin-square-stroke-rounded.svg",    src: bitcoinSquareIcn },
   { key: "bar-chart-horizontal-stroke-rounded.svg", src: barChartIcn   },
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

export function NBEl() {
   return {
      sortSelect:   document.getElementById("sort-filter-select"),
      filterBtn:    document.getElementById("nb-filter-btn"),
      filterPanel:  document.getElementById("nb-filter-panel"),
      filterBadge:  document.getElementById("nb-filter-badge"),
      clearBtn:     document.getElementById("nbfp-clear-btn"),
      applyBtn:     document.getElementById("nbfp-apply-btn"),
      catChips:     document.getElementById("nbfp-categories"),
      tagChips:     document.getElementById("nbfp-tags"),
      dueModeEl:    document.getElementById("nbfp-due-mode"),
      dueInputsEl:  document.getElementById("nbfp-due-inputs"),
      dateAEl:      document.getElementById("nbfp-date-a"),
      dateBEl:      document.getElementById("nbfp-date-b"),
      rangeSepEl:   document.getElementById("nbfp-range-sep"),
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