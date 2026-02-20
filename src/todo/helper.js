import { format } from "date-fns"

export default class Helper {
   static setDesc(string) {
      if (string.length <= 0 ) { return "N/A" } 
      else if (string.length > 25) { return string.slice(0, 22) + "..." }     
   }

   static setDue(date) {
      // we be updated to match custom date and time 
      if (!date) { return format(now, "yyyy-MM-dd")} 
      else { return date }
   }

   static setCheckList(string) {
      return string.split(",")
   }

   static setTags(string) {
      return string.split(",").map(t => t.trim().replace(/\s/g, "-"))
   }

}

