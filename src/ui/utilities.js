export function switchProject(project) {
   localStorage.setItem("teilist-active-project", project.toLowerCase())
}

export function renderTodo(todo) {
   const active = localStorage.getItem("teilist-active-project")
   return active === "all" ? todo : todo.filter(t => t.project == active) 
}