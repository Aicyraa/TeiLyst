import { getTodoData } from "../utilities/storage.js";
import { getAllCategory, getAllTags } from "../todo/utilities.js";
import { NBEl } from "./elements.js";

function buildChips(container, items, selectedItems) {
   container.innerHTML = "";
   items.forEach(item => {
      const btn = document.createElement("button");
      btn.className = "nbfp-chip" + (selectedItems.includes(item) ? " selected" : "");
      btn.textContent = item;
      btn.addEventListener("click", () => btn.classList.toggle("selected"));
      container.appendChild(btn);
   });
}

function syncDueModeUI(nb, mode) {
   if (mode === "none") {
      nb.dueInputsEl.style.display = "none";
   } else {
      nb.dueInputsEl.style.display = "flex";
      nb.dateBEl.style.display     = mode === "range" ? "block"  : "none";
      nb.rangeSepEl.style.display  = mode === "range" ? "inline" : "none";
   }
}

function countActiveFilters(state) {
   let count = 0;
   if (state.categories && state.categories.length) count += state.categories.length;
   if (state.tags && state.tags.length) count += state.tags.length;
   if (state.dueMode && state.dueMode !== "none" && state.dateA) count++;
   return count;
}

function updateBadge(nb) {
   const state = JSON.parse(localStorage.getItem("teilyst-filter") || "{}");
   const n = countActiveFilters(state);
   nb.filterBadge.textContent = n;
   nb.filterBadge.style.display = n > 0 ? "inline" : "none";
   nb.filterBtn.classList.toggle("active", n > 0);
}

function openFilterPanel(nb) {
   const todos = getTodoData();
   const { categoryList } = getAllCategory(todos);
   const { tagList }      = getAllTags(todos);
   const state = JSON.parse(localStorage.getItem("teilyst-filter") || "{}");

   buildChips(nb.catChips, categoryList, state.categories || []);
   buildChips(nb.tagChips, tagList,      state.tags       || []);

   nb.dueModeEl.value = state.dueMode || "none";
   nb.dateAEl.value   = state.dateA   || "";
   nb.dateBEl.value   = state.dateB   || "";
   syncDueModeUI(nb, nb.dueModeEl.value);

   nb.filterPanel.classList.add("open");
   nb.filterBtn.classList.add("active");
}

function closeFilterPanel(nb) {
   nb.filterPanel.classList.remove("open");
   nb.filterBtn.classList.remove("active");
   updateBadge(nb);
}

export function initNavbar(onUpdate) {
   const nb = NBEl();

   // Restore saved sort value
   nb.sortSelect.value = localStorage.getItem("teilyst-sort") || "none";

   nb.sortSelect.addEventListener("change", (e) => {
      localStorage.setItem("teilyst-sort", e.target.value);
      onUpdate();
   });

   nb.filterBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      nb.filterPanel.classList.contains("open")
         ? closeFilterPanel(nb)
         : openFilterPanel(nb);
   });

   document.addEventListener("click", (e) => {
      if (!nb.filterPanel.contains(e.target) && !nb.filterBtn.contains(e.target)) {
         closeFilterPanel(nb);
      }
   });

   nb.dueModeEl.addEventListener("change", () => syncDueModeUI(nb, nb.dueModeEl.value));

   nb.applyBtn.addEventListener("click", () => {
      const selectedCats = [...nb.catChips.querySelectorAll(".nbfp-chip.selected")].map(c => c.textContent);
      const selectedTags = [...nb.tagChips.querySelectorAll(".nbfp-chip.selected")].map(c => c.textContent);
      const state = {
         categories: selectedCats,
         tags:       selectedTags,
         dueMode:    nb.dueModeEl.value,
         dateA:      nb.dateAEl.value,
         dateB:      nb.dateBEl.value,
      };
      localStorage.setItem("teilyst-filter", JSON.stringify(state));
      closeFilterPanel(nb);
      onUpdate();
   });

   nb.clearBtn.addEventListener("click", () => {
      localStorage.removeItem("teilyst-filter");
      nb.catChips.querySelectorAll(".nbfp-chip").forEach(c => c.classList.remove("selected"));
      nb.tagChips.querySelectorAll(".nbfp-chip").forEach(c => c.classList.remove("selected"));
      nb.dueModeEl.value = "none";
      nb.dateAEl.value   = "";
      nb.dateBEl.value   = "";
      syncDueModeUI(nb, "none");
      updateBadge(nb);
      onUpdate();
   });

   updateBadge(nb);
}
