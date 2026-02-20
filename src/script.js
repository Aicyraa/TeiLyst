import Todo from "./todo/todo.js";
import { countTodo, getAllCategory, getAllTags } from "./todo/utilities.js";
import { FDue, FDueBefore, FDueAfter, FDueRange } from "./utilities/filter.js";
import { STodo, SCategory, SDue } from "./utilities/sort.js";

const todos = [
   new Todo(null, "Buy groceries", "Personal", "Pick up fruits, vegetables, and milk from the store", "2026-02-25T14:30", "pending", "Fruits,Vegetables,Milk", "shopping,errands", "high"),
   new Todo(null, "Fix login bug", "Work", "Users are getting 401 errors after token refresh", "2026-02-21T09:00", "in-progress", "Reproduce issue,Check token logic,Write tests", "bug,auth", "high"),
   new Todo(null, "Read Clean Code", "Learning", "Finish chapaters 5 through 8", "2026-03-01T18:00", "pending", "Chapter 5,Chapter 6,Chapter 7,Chapter 8", "books,self-improvement", "low"),
   new Todo(null, "Plan team outing", "Work", "Organize a team lunch for next Friday", "2026-02-27T12:00", "pending", "Pick restaurant,Send invites,Confirm headcount", "team,social", "medium"),
   new Todo(null, "Update portfolio site", "Personal", "Add recent projects and update the about section", "2026-03-10T23:59", "completed", "Add projects,Update about,Deploy", "web,career", "medium"),
   new Todo(null, "Learn JS", "Career", "Yea", "2026-03-10T10:00", "In-progress", "Add projects,Update about,Deploy", "Programming", "medium"),
];

console.log("--- Todo with due Date object ---");
console.log(todos[0].name, todos[0].due);
console.log(todos[0].name, todos[0].dueFormatted);

console.log("\n--- Utilities ---");
console.log("Count:", countTodo(todos));
console.log("Categories:", getAllCategory(todos));
console.log("Tags:", getAllTags(todos));

console.log("\n--- Sort by due date ---");
console.log("Name Asc:", STodo(todos).map(v => v.name) );
console.log("Name Desc:", STodo(todos, false).map(v => v.name));
console.log("Category Asc", SCategory(todos).map(v => v.category));
console.log("Cateogory Desc:", SCategory(todos, false).map(v => v.category));
console.log("Ascending:", SDue(todos));
console.log("Descending:", SDue(todos, false));

console.log("\n--- Filter by due date ---");
console.log("Due on Mar 10:", FDue(new Date(2026, 2, 10), todos));
console.log("Due before Mar 1:", FDueBefore(new Date(2026, 2, 1), todos));
console.log("Due after Mar 1:", FDueAfter(new Date(2026, 2, 1), todos));
console.log("Due Feb 21 - Feb 28:", FDueRange(new Date(2026, 1, 21), new Date(2026, 1, 28), todos));


