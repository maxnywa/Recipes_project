

export default class LikesList {
    constructor(){
        this.items = [];
    }

    addItem(item){
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