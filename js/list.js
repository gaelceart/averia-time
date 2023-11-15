const done = "6508850fb5379f18e1c057b8";
let list_done = [];
import {members} from './member';
import {card_action} from './card';

export async function done_req() {
  const response = await fetch(`https://api.trello.com/1/lists/${done}/cards?key=${process.env.API_KEY}&token=${process.env.API_TOKEN}`);
  const data = await response.json();

  data.forEach(async card => {
    const asignee = card_members(card);
    const card_stamp = await card_action(card.shortLink);
    const row = {
      "name": card.name, 
      "asignee": asignee, 
      "date": card_stamp.date, 
      "time": card_stamp.time
    };
    list_done.push(row);
    //table(card.name, asignee, card_stamp.date, card_stamp.time);
  });
  return list_done;
}

function card_members(card) {
    let asignee = [];
    card.idMembers.forEach(id_member => {
        asignee.push(members[id_member]);
    });
    return asignee;
}
