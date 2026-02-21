import "./style.css"
import Todo from "./todo/todo.js";
import Project from "./project/project.js";
import { countTodo, getAllCategory, getAllTags } from "./todo/utilities.js";
import { FDue, FDueBefore, FDueAfter, FDueRange } from "./utilities/filter.js";
import { STodo, SCategory, SDue } from "./utilities/sort.js";
import { switchProject, renderTodo } from "./ui/utilities.js";
import { getTodoData, setTodoData, getProjectData, setProjectData } from "./utilities/storage.js";

const todos = [
   new Todo(null, "Buy groceries", "Personal", "Pick up fruits, vegetables, and milk from the store", "2026-02-25T14:30", "pending", "Fruits,Vegetables,Milk", "shopping,errands", "high"),
   new Todo(null, "Fix login bug", "Work", "Users are getting 401 errors after token refresh", "2026-02-21T09:00", "in-progress", "Reproduce issue,Check token logic,Write tests", "bug,auth", "high"),
   new Todo(null, "Read Clean Code", "Learning", "Finish chapaters 5 through 8", "2026-03-01T18:00", "pending", "Chapter 5,Chapter 6,Chapter 7,Chapter 8", "books,self-improvement", "low"),
   new Todo(null, "Plan team outing", "Work", "Organize a team lunch for next Friday", "2026-02-27T12:00", "pending", "Pick restaurant,Send invites,Confirm headcount", "team,social", "medium"),
   new Todo(null, "Update portfolio site", "Personal", "Add recent projects and update the about section", "2026-03-10T23:59", "completed", "Add projects,Update about,Deploy", "web,career", "medium"),
   new Todo(null, "Learn JS", "Career", "Yea", "2026-03-10T10:00", "In-progress", "Add projects,Update about,Deploy", "Programming", "medium"),
];

const projects = [
   new Project(null, "Math", "Yes 1"),
   new Project(1, "Code", "Yes 2"),
   new Project(0, "House", "Yes 3"),
   new Project(2, "Test", "Yes 4"),
]

// console.log(setTodoData(todos));
// console.log(setProjectData(projects));

console.log(getTodoData())
console.log(getProjectData());
