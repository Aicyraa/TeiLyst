import { ME, PROJECT_ICONS } from "./elements.js";

// ── Helpers ──────────────────────────────────────────────────────────────────

function openModal(modal) {
   const { overlay } = ME();
   overlay.classList.add("active");
   modal.classList.add("active");
}

function closeModal(modal) {
   const { overlay, projectModal, todoModal } = ME();
   modal.classList.remove("active");
   // Only hide overlay when both modals are closed
   if (!projectModal.classList.contains("active") && !todoModal.classList.contains("active")) {
      overlay.classList.remove("active");
   }
}

// ── Project Modal ─────────────────────────────────────────────────────────────

function buildProjectIcons() {
   const { projectIconsGrid } = ME();
   projectIconsGrid.innerHTML = "";

   PROJECT_ICONS.forEach(({ key, src }, i) => {
      const btn = document.createElement("button");
      btn.className = "icon-option" + (i === 0 ? " selected" : "");
      btn.dataset.iconKey = key;
      btn.innerHTML = `<img src="${src}" alt="${key}" />`;
      btn.addEventListener("click", () => {
         projectIconsGrid.querySelectorAll(".icon-option").forEach(b => b.classList.remove("selected"));
         btn.classList.add("selected");
      });
      projectIconsGrid.appendChild(btn);
   });
}

export function openProjectModal() {
   buildProjectIcons();
   openModal(ME().projectModal);
}

export function closeProjectModal() {
   closeModal(ME().projectModal);
   document.querySelector("#p-name").value = "";
}

// ── Todo Modal ────────────────────────────────────────────────────────────────

function initTodoModalInteractions() {
   // Background swatches
   document.querySelector("#bg-swatches").addEventListener("click", (e) => {
      const swatch = e.target.closest(".bg-swatch");
      if (!swatch) return;
      document.querySelectorAll(".bg-swatch").forEach(s => s.classList.remove("selected"));
      swatch.classList.add("selected");
   });

   // Status pills
   document.querySelector(".status-pills").addEventListener("click", (e) => {
      const pill = e.target.closest(".status-pill");
      if (!pill) return;
      document.querySelectorAll(".status-pill").forEach(p => p.classList.remove("selected"));
      pill.classList.add("selected");
   });
}

export function openTodoModal() {
   openModal(ME().todoModal);
}

export function closeTodoModal() {
   closeModal(ME().todoModal);
   // Reset form fields
   ["#t-name", "#t-category", "#t-desc", "#t-tags", "#t-checklist"].forEach(sel => {
      document.querySelector(sel).value = "";
   });
   document.querySelector("#t-due").value = "";
   document.querySelector("#t-priority").value = "medium";
   document.querySelectorAll(".bg-swatch").forEach((s, i) => s.classList.toggle("selected", i === 0));
   document.querySelectorAll(".status-pill").forEach((p, i) => p.classList.toggle("selected", i === 0));
}

// ── Init ──────────────────────────────────────────────────────────────────────

export function initModals() {
   const m = ME();

   initTodoModalInteractions();

   m.addProjectBtn.addEventListener("click", openProjectModal);
   m.addTodoBtn.addEventListener("click", openTodoModal);

   m.projectModalClose.addEventListener("click", closeProjectModal);
   m.todoModalClose.addEventListener("click", closeTodoModal);

   // Overlay click closes whichever modal is open
   m.overlay.addEventListener("click", () => {
      if (m.projectModal.classList.contains("active")) closeProjectModal();
      if (m.todoModal.classList.contains("active")) closeTodoModal();
   });
}
