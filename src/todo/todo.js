import { format } from "date-fns";
import Helper from "./helper.js";

export default class Todo {

   constructor(background, name, category, description, due, status, checkList, tags, priority) {
      this._id = crypto.randomUUID();
      this._background = background
      this._name = name
      this._category = category
      this._description = Helper.setDesc(description)
      this._due = Helper.setDue(due)
      this._status = status
      this._checkList = Helper.setCheckList(checkList)
      this._tags = Helper.setTags(tags)
      this._priority = priority
      this._project = Helper.setProject()
   }

   get id() { return this._id }
   get name() { return this._name }
   get category() { return this._category }
   get description() { return this._description}
   get due() { return this._due}
   get dueFormatted() { return format(this._due, "MMM dd, yyyy 'at' h:mm a") }
   get status() { return this._status}
   get checkList() { return this._checkList}
   get tags() { return this._tags}
   get priority() { return this._priority}
   get project() { return this._project }

   static fromJSON(obj) {
      const todo = Object.create(Todo.prototype)
      todo._id = obj._id
      todo._background = obj._background
      todo._name = obj._name
      todo._category = obj._category
      todo._description = obj._description
      todo._due = Helper.setDue(obj._due)
      todo._status = obj._status
      todo._checkList = obj._checkList
      todo._tags = obj._tags
      todo._priority = obj._priority
      todo._project = obj._project
      return todo
   }
}