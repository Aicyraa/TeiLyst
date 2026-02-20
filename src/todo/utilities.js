export function countTodo(todo){
   return todo.length
}

export function getAllCategory(todo) {
   const categoryList = [...new Set(todo.reduce((categories, t) => categories.concat(t.category), []))]

   return {
      count: categoryList.length,
      categoryList
   }
}

export function getAllTags(todo) {
   const tagList = [...new Set(todo.reduce((tags, t) => tags.concat(t.tags), []))]
   return {
      count: tagList.length,
      tagList
   }
}


