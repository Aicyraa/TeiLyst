export default class Helper {
   static setIcon (def) {
      if (typeof def === 'string') return def;
      const icons = ["math", "house", "code"]
      return def === null || def === undefined ? "folder_def.svg" : `${icons[def]}.svg`
   }
}