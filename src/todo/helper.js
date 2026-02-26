import { parseISO } from "date-fns"

export default class Helper {

   static setDesc(string) {
      if (string.length <= 0 ) { return "N/A" }
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
      return localStorage.getItem("teilyst-active-project")
   }

}

