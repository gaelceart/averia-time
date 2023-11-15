import express from 'express';
import { done_req } from './js/list';
import {readIndex, createRow, containsName} from './utils'
const PORT: number = +(process.env.PORT || 8081);

const app = express();
const dom = readIndex();
export const document = dom.window.document;
const tbody = document.querySelector("tbody");
app.use(express.static("./"));

app.get("/", async(req,res) => {
    const card_list = await done_req();
    tbody.insertAdjacentHTML('beforeend', await joinRows(card_list));
    res.send(dom.serialize())
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});

async function joinRows(card_list){
    let content = ``;
    card_list.forEach(card => {
        const exists = containsName(card.name);
        exists? console.log("EXISTE") : content += createRow(card.name, card.asignee, card.date, card.time)
    });
    return content;
}