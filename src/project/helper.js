export default class Helper {
   static setIcon (def) {
      const icons = ["math", "house", "code"]
      return def === null ? "folder_def.svg" : `${icons[def]}.svg`
   }
}