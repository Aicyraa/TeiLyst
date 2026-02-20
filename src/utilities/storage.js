export function getData() {
   return JSON.parse(localStorage.getItem("teilyst-todo"))
}

export function setData(todo) {
   try { 
      const newData = [...getData(), todo]
      localStorage.setItem("teilyst-todo", JSON.stringify(newData))
      return "sucess"
   } catch (err) {
      return `error: ${err}`  
   }
}