import Helper from "./helper.js"

export default class Project {
   constructor(icon, name, description) {
      this._id = crypto.randomUUID()
      this._icon = Helper.setIcon(icon)
      this._name = name.toLowerCase()
      this._description = description
   }

   get id() { return this._id }
   get icon() { return this._icon }
   get name() { return this._name }
   get description() { return this._description }
}