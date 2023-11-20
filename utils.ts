import fs from 'fs';
import {document} from './app'
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

export function readIndex() {
    const html = fs.readFileSync("./html/index.html");
    const dom = new JSDOM(html);
    return dom;
}

export function createRow(name, asignee, date, time){
    return `
    <tr>
      <td>${name}</td>
      <td>${asignee}</td>
      <td>${date}</td>
      <td>${time}</td>
    </tr>
    `;
}

export function containsName(name) {
    const rows = document.querySelectorAll("tr");
    for (const row of rows){
       const cells = row.querySelectorAll('td');
       for (const cell of cells) {
        if (cell.textContent === name) {
            return true;
        }
       }
    };
    return false;
};

export async function joinRows(card_list){
    let content = ``;
    card_list.forEach(card => {
        const exists = containsName(card.name);
        exists? "" : content += createRow(card.name, card.asignee, card.date, card.time)
    });
    return content;
}

export function createOption(name, value){
    return `
    <option value='${value}'> ${name}</option>
    `;
}
