const done = "6508850fb5379f18e1c057b8";
let list_done = [];

async function done_req() {
  const response = await fetch(`https://api.trello.com/1/lists/${done}/cards?key=${api_key}&token=${token}`);
  const data = await response.json();
  console.log(data);

  data.forEach(async card => {
    list_done.push(card.name);
    const asignee = card_members(card);
    const card_stamp = await card_action(card.shortLink);
    table(card.name, asignee, card_stamp.date, card_stamp.time);
  });
}

function card_members(card) {
    let asignee = [];
    card.idMembers.forEach(id_member => {
        asignee.push(members[id_member]);
    });
    return asignee;
}

done_req();