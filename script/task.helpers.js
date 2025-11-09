import modalManager, { openModal as open } from "./modal.manager.js";

export function setID() {
   let current_id = JSON.parse(localStorage.getItem("id")) || 1;
   let [old_value, new_value] = [current_id, ++current_id];
   localStorage.setItem("id", JSON.stringify(new_value));
   return old_value;
}

export function clearInputs(...inputs) {
   for (let input of inputs) {
      input.value = "";
   }
}

export function processDate(date) {
   return date.value.split("T");
}

export function editData(...newValue) {
   debugger
   let [parent, newTask, newDate] = newValue;
   const data = parent.querySelector(".todo__info");
   const dataId = parseInt(data.dataset.id)

   let storage = JSON.parse(localStorage.getItem("storage")).map(
      (currentTask) => {
         
         if (currentTask.id === dataId) {

            return {
               id: currentTask.id,
               task: newTask,
               deadline: newDate,
               isComplete: currentTask.isComplete,
            };
         }
         return currentTask;
      }
   );

   localStorage.setItem("storage", JSON.stringify(storage));
   renderTask();
}

export function renderTask() {
   modalManager.todoContainer.innerHTML = "";
   let storage = JSON.parse(localStorage.getItem("storage"));
   if (!storage || storage.length === 0) return;

   storage.forEach((task) => {
      // create main todo container
      let el = document.createElement("div");
      el.classList.add("todo", `todo__id-${task.id}`);
      if (task.isComplete) el.classList.add("done");
      el.innerHTML = `
         <div class="todo__info" data-id="${task.id}">
            <div class="todo__info__left">
               <input type="checkbox" id="todo__checkbox__${task.id}" value="${task.id}" ${task.isComplete ? "checked" : ""}/>
               <span id="todo__task">${task.task}</span>
            </div>
            <div class="todo__info__right">
               <div class="todo__info__btns">
                  <img src="img/edit_calendar_17dp_434343_FILL0_wght400_GRAD0_opsz20.svg" data-id="${
                     task.id
                  }" class="edit__btn"/>
                  <img src="img/delete_17dp_434343_FILL0_wght400_GRAD0_opsz20.svg" data-id="${
                     task.id
                  }" class="dlt__btn"/>
               </div>
               <span id="todo__date">${task.deadline}</span>
            </div>
         </div> 
      `;

      modalManager.todoContainer.append(el);
      attachListeners(task);
   });
}

// modularize

function attachListeners(task) {
   let parent = document.querySelector(`.todo__id-${task.id}`);
   parent.querySelector("input").addEventListener("click", (e) => {
      // we can check and uncheck
      checkTask(e.target, task, filterCompletedTask);
   });

   let btns = parent.querySelector(".todo__info__btns");
   for (let btn of btns.children) {
      if (btn.classList.contains("edit__btn")) {
         btn.addEventListener("click", (e) => {
            open(modalManager.editModal, modalManager.overlay__screen)();
            modalManager.editModal.dataset.task = task.id;
         });
         continue;
      }

      btn.addEventListener("click", (e) => {
         let storage = JSON.parse(localStorage.getItem("storage"));
         const index = storage.findIndex(
            (currentTask) => currentTask.id === task.id
         );

         if (index != -1) {
            storage.splice(index, 1);
         }

         localStorage.setItem("storage", JSON.stringify(storage));
         parent.remove();
      });
   }
}

function checkTask(checkbox, task, filter) {
   let storage = JSON.parse(localStorage.getItem("storage"));

   storage.forEach((currentTask) => {
      if (currentTask.id === task.id) {
         currentTask.isComplete = checkbox.checked; // true or false
      }
   });

   localStorage.setItem("storage", JSON.stringify(storage));

   // visually toggle 'done' class
   let parent = document.querySelector(`.todo__id-${task.id}`);
   if (checkbox.checked) {
      parent.classList.add("done");
   } else {
      parent.classList.remove("done");
   }

   filter();
}

function filterCompletedTask() {
   let storage = JSON.parse(localStorage.getItem("storage"));
   let [completedTask, notCompleted] = [
      storage.filter((currentTask) => currentTask.isComplete == true),
      storage.filter((currentTask) => currentTask.isComplete == false),
   ];

   localStorage.setItem("storage", JSON.stringify(notCompleted.concat(completedTask)));
   renderTask();
}
