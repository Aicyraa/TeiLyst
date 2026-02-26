import { format } from "date-fns";
import Helper from "./helper.js";

export default class Todo {

   static fromJSON(obj) {
      obj._due = Helper.setDue(obj._due)
      return Object.assign(Object.create(Todo.prototype), obj)
   }

   constructor(background, name, category, description, due, status, checkList, tags, priority) {
      this._id = crypto.randomUUID();
      this._background = background
      this._name = name
      this._category = category
      this._description = description
      this._due = Helper.setDue(due)
      this._status = status
      this._checkList = Helper.setCheckList(checkList)
      this._tags = Helper.setTags(tags)
      this._priority = priority
      this._project = Helper.setProject()
   }

   get id() { return this._id }
   get background() { return this._background }
   get name() { return this._name }
   get category() { return this._category }
   get description() { return this._description}
   get due() { return this._due}
   get dueFormatted() { return format(this._due, "h:mm a | MMM dd, yyyy  ") }
   get status() { return this._status}
   get checkList() { return this._checkList}
   get tags() { return this._tags}
   get priority() { return this._priority}
   get project() { return this._project }

  
}