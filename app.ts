import express from 'express';
import * as list from './js/list';
import * as utils from './utils'
import * as render from './render';
const PORT: number = +(process.env.PORT || 8081);

const app = express();
const dom = utils.readIndex();
export const document = dom.window.document;

app.use(express.static("./"));

app.get("/", async(req,res) => {
    const lists_id = await list.getLists(process.env.BOARD);
    const keys = Object.keys(lists_id);
    render.listsName(keys);
    res.send(dom.serialize());
});

app.get("/list/:id", async (req,res) => {
    console.log(req.params.id);
    const card_list = await list.getCards(req.params.id);
    render.cards(card_list);
    res.send(dom.serialize());
;})

app.get("*", async (req,res) => {
    res.status(404).send(`Página ${req.url} no encontrada`);
;})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
