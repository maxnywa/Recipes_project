import  uniqid from 'uniqid';

export default class List {
    constructor(){
        this.items = [];
    }

    addItem(ingredient){
        const item = {
            ingredient,
            id:uniqid(),
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