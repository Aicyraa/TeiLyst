import Todo from "../todo/todo.js"
import Project from "../project/project.js"

export function getTodoData() {
   const raw = JSON.parse(localStorage.getItem("teilyst-todo")) || []
   return raw.map(Todo.fromJSON)
}

export function setTodoData(todo) {
   try { 
      const newData = [...getTodoData(), ...todo]
      localStorage.setItem("teilyst-todo", JSON.stringify(newData))
      return "sucess"
   } catch (err) {
      return `error: ${err}`  
   }
}

export function replaceTodoData(todos) {
   try { 
      localStorage.setItem("teilyst-todo", JSON.stringify(todos))
      return "sucess"
   } catch (err) {
      return `error: ${err}`  
   }
}

// Project

export function getProjectData() {
   const raw = JSON.parse(localStorage.getItem("teilyst-project")) || []
   return raw.map(Project.fromJSON)
}

export function setProjectData(project) {
   try { 
      const newData = [...getProjectData(), ...project]
      localStorage.setItem("teilyst-project", JSON.stringify(newData))
      return "sucess"
   } catch (err) {
      return `error: ${err}`  
   }
}

export function replaceProjectData(projects) {
   try { 
      localStorage.setItem("teilyst-project", JSON.stringify(projects))
      return "sucess"
   } catch (err) {
      return `error: ${err}`  
   }
}