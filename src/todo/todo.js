import { format } from "date-fns";
import Helper from "./helper.js";

export default class Todo {

   constructor(background, name, category, description, due, status, checkList, tags, priority) {
      this._id = crypto.randomUUID();
      this._background = 'linear-gradient(120deg, lightgreen, lightblue)'
      this._name = name
      this._category = category
      this._description = Helper.setDesc(description)
      this._due = Helper.setDue(due)
      this._status = status
      this._checkList = Helper.setCheckList(checkList)
      this._tags = Helper.setTags(tags)
      this._priority = priority
   }

   get name() { return this._name }
   get category() { return this._category }
   get description() { return this._description}
   get due() { return this._due}
   get dueFormatted() { return format(this._due, "MMM dd, yyyy 'at' h:mm a") }
   get status() { return this._status}
   get checkList() { return this._checkList}
   get tags() { return this._tags}
   get priority() { return this._priority}
}