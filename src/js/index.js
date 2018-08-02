// Global app controller

import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import LikesList from './models/Likes';
import Store from './models/Store';
import {elements,renderLoader, clearLoader} from "./view/base";
import * as searchView from "./view/searchView";
import * as recipeView from "./view/recipeView";
import * as listView from "./view/listView";
import * as likesView from "./view/likesView";


/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Favorite recipe object
 * */

const state = {};

//Search controller

const controlSearch = async() => {
    const query = searchView.getSearchInputValue();

    if(query){
        state.search = new Search(query);

        searchView.clearForm();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        await state.search.getResult();

        searchView.renderResult(state.search.result);
        clearLoader();
    }
};

// Recipe controller
const controlRecipe = async ()=> {
    const id = window.location.hash.replace('#','');

    if(id){
        if(state.search) searchView.highLightSelected(id);
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        state.recipe = new Recipe(id);

        await state.recipe.getRecipe();

        clearLoader();
        recipeView.renderRecipe(state.recipe.result);
    }

};

// Shopping List controller
const controlShoppingList = () =>{

    const createIngredients = () =>{
        state.recipe.result.ingredients.forEach( ingredient =>state.list.addItem(ingredient) )
    };

    if(state.list) createIngredients();

    state.list = new List();
    createIngredients();

    state.list.items.forEach(item => listView.createListItem(item) );

};

//Likes List controller
const controlLikesList = () =>
{
    const store = new Store;

    const addItemToLikes = () =>{
        state.likes.addItem(state.recipe);

        likesView.createLikesRecipe(state.recipe);

        store.addRecipes(state.recipe);

    };

    if(state.likes) {
        if (!state.likes.items.some(item => item.id === state.recipe.id)) {
            addItemToLikes();
        }
    }else {
        state.likes = new LikesList();
        addItemToLikes();
    }
};


//Set events
window.addEventListener("hashchange", controlRecipe);
window.addEventListener("load",controlRecipe);
window.addEventListener("load",e => {
    const store = new Store;
    const recipes = store.getRecipes();
    if(recipes.length){
        state.likes = new LikesList();

        recipes.forEach(recipe => {

            state.likes.addItem(recipe);

            likesView.createLikesRecipe(recipe);
        });
    };


});


elements.searchForm.addEventListener('submit',e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click',e => {
    const btn = e.target.closest('.btn-inline');

    if(btn){
        const goToPage = parseInt(btn.dataset.goto);
        searchView.clearResults();
        searchView.renderResult(state.search.result, goToPage);

    }
});

elements.recipe.addEventListener('click', e =>{
    if(e.target.closest('.recipe__btn')) controlShoppingList();
});

elements.shoppingList.addEventListener('click', e =>{
    if (e.target.closest('.shopping__delete')){
        const id = e.target.closest('.shopping__item').dataset.id;

        listView.deleteListItem(id);

        state.list.deleteItem(id);
    }
});

elements.recipe.addEventListener('click', e =>{
    if (e.target.closest('.recipe__love')){
        controlLikesList();
    }
});

elements.likesList.addEventListener('click', e=> {
    if (e.target.closest('.shopping__delete')){
        console.log(e.target);
        const store = new Store;

        const id = e.target.closest('.shopping__item').dataset.id;

        likesView.deleteLikesItem(id);

        state.likes.deleteItem(id);

        store.removeRecipe(id);
    }
});

