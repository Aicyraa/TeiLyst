import Todo from "./todo/todo.js";
import { countTodo, getAllCategory, getAllTags } from "./todo/utilities.js";

const todos = [
   new Todo("Buy groceries", "Personal", "Pick up fruits, vegetables, and milk from the store", "2026-02-25", "pending", "Fruits,Vegetables,Milk", "shopping,errands", "high"),
   new Todo("Fix login bug", "Work", "Users are getting 401 errors after token refresh", "2026-02-21", "in-progress", "Reproduce issue,Check token logic,Write tests", "bug,auth", "high"),
   new Todo("Read Clean Code", "Learning", "Finish chapaters 5 through 8", "2026-03-01", "pending", "Chapter 5,Chapter 6,Chapter 7,Chapter 8", "books,self-improvement", "low"),
   new Todo("Plan team outing", "Work", "Organize a team lunch for next Friday", "2026-02-27", "pending", "Pick restaurant,Send invites,Confirm headcount", "team,social", "medium"),
   new Todo("Update portfolio site", "Personal", "Add recent projects and update the about section", "2026-03-10", "completed", "Add projects,Update about,Deploy", "web,career", "medium"),
];

console.log(countTodo(todos));
console.log(getAllCategory(todos));
console.log(getAllTags(todos));


