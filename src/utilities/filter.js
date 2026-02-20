import { isSameDay, isBefore, isAfter, isWithinInterval } from "date-fns"

export function FCategory (category, todo) {
   return todo.filter(t => t.category === category) 
}

export function FTags (tags, todo) {
   return todo.filter(t => {
      for (const tag of t.tags) {
         if (tags.includes(tag)) { return }
      }
   })
}

export function FDue (due, todo) {
   return todo.filter(t => isSameDay(t.due, due))
}

export function FDueBefore (date, todo) {
   return todo.filter(t => isBefore(t.due, date))
}

export function FDueAfter (date, todo) {
   return todo.filter(t => isAfter(t.due, date))
}

export function FDueRange (start, end, todo) {
   return todo.filter(t => isWithinInterval(t.due, { start, end }))
}
