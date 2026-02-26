import { compareAsc, compareDesc } from "date-fns"

export function STodo(todo, isAsc = true) {
   if (isAsc) { return [...todo].sort((a, b) => a.name.localeCompare(b.name))}
   else { return [...todo].sort((a, b) => b.name.localeCompare(a.name))}
}

export function SCategory(todo, isAsc = true) {
   if (isAsc) { return [...todo].sort((a, b) => a.category.localeCompare(b.category))}
   else { return [...todo].sort((a, b) => b.category.localeCompare(a.category))}
}

export function SDue (todo, isAsc = true) {
   if (isAsc) { return [...todo].sort((a, b) => compareAsc(a.due, b.due)) }
   else { return [...todo].sort((a, b) => compareDesc(a.due, b.due)) }   
}

