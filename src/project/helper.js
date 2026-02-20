export default class Helper {
   static setIcon (def) {
      const icons = ["math", "house", "code"]
      return icons[def || "folder_def"] + ".svg"
   }
}