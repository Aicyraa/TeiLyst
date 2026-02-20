import { parseISO } from "date-fns"

export default class Helper {

   static setDesc(string) {
      if (string.length <= 0 ) { return "N/A" }
      else if (string.length > 25) { return string.slice(0, 22) + "..." }
   }

   static setDue(date) {
      if (!date) { return new Date() }
      if (date instanceof Date) { return date }
      return parseISO(date)
   }

   static setCheckList(string) {
      return string.split(",")
   }

   static setTags(string) {
      return string.split(",").map(t => t.trim().replace(/\s/g, "-"))
   }

   static setProject() {
      const active = localStorage.getItem("teilist-active-project")
      return active
   }

}

