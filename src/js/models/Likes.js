

export default class LikesList {
    constructor(){
        this.items = [];
    }

    addItem(recipe){
        const item = {
            id: recipe.id,
            source: recipe.result.source_url,
            image: recipe.result.image_url,
            title: recipe.result.title,
            publisher: recipe.result.publisher,
        };

        this.items.push(item);
    }

    deleteItem(id){
        this.items.forEach( (item,index) =>{
            if(item.id === id){
                this.items.splice(index,1);
            }
        });
    }

}