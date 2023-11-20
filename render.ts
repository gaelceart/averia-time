import { document } from "./app";
import * as utils from "./utils";

export function listsName(names) {
    const menu = document.getElementById('lists-menu');
    names.forEach(elem => {
        menu.insertAdjacentHTML('beforeend', `<option value='${elem.toLowerCase()}'> ${elem}</option>`);
    });
}

export async function cards(card_list) {
    const tbody = document.querySelector("tbody");
    tbody.insertAdjacentHTML('beforeend', await utils.joinRows(card_list));
}