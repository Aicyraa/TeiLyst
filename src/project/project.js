import Helper from "./helper.js"

export default class Project {

   static fromJSON(obj) {
      return Object.assign(Object.create(Project.prototype), obj)
   }

   constructor(icon, name, description) {
      this._id = crypto.randomUUID()
      this._icon = Helper.setIcon(icon)
      this._name = name.toLowerCase()
      this._description = description  
   }

   get id() { return this._id }
   get icon() { return this._icon }
   get name() { return this._name[0].toUpperCase() + this._name.slice(1, this._name.length) }
   get description() { return this._description }
}