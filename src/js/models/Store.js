
export default class Store{
    getRecipes(){
        let recipes;
        if(!localStorage.getItem('recipes')){
            recipes = [];
        }else {
            recipes = JSON.parse(localStorage.getItem('recipes'))
        }

        return recipes;
    }
    addRecipes(recipe){
        //Get from LS
        const recipes = this.getRecipes();
        //Add new book
        recipes.unshift(recipe);
        // Save to LS
        localStorage.setItem('recipes', JSON.stringify(recipes));
    }
    removeRecipe(RecipeId){
        //Get from LS
        const recipes = this.getRecipes();
        //Search and remove book
        recipes.forEach(({id},index) => {
            console.log(id);
            if (id === RecipeId) recipes.splice(index,1);
        });
        // Save to LS
        localStorage.setItem('recipes', JSON.stringify(recipes));
    }

}