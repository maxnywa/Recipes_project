import {elements} from "./base";

export const clearLikes = () => elements.shoppingList.innerHTML = '';

export const createLikesRecipe = (recipe) => {
    const markup = `
        <li class="shopping__item" data-id = '${recipe.id}'>
            <a class="likes__link" href="${recipe.result.source_url}">
                <figure class="likes__fig">
                    <img src="${recipe.result.image_url}" alt="Test">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${recipe.result.title}</h4>
                    <p class="likes__author">${recipe.result.publisher}</p>
                </div>
            </a>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `

    elements.likesList.insertAdjacentHTML("afterbegin", markup)
};

export const deleteLikesItem = (id) =>{

    document.querySelector(`.shopping__item[data-id = "${id}"]`).remove();
};