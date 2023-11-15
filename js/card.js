
async function card_action(id) {
    let card_actions;
    const response = await fetch(`https://api.trello.com/1/cards/${id}/actions?key=${api_key}&token=${token}`);
    card_actions = await response.json();
    let updates = []

    card_actions.forEach(action => {
        if (action.type === "updateCard") {
            updates.push(action);
        }
    });

    const time = calcDoingTime(updates);

    const fecha = new Date(updates[0].date);
    const options = { timeZone: "America/Argentina/Buenos_Aires" };
    const formatter = new Intl.DateTimeFormat('es-AR', options);
    const fechaFormateada = formatter.format(fecha);

    return { "date": fechaFormateada.slice(0, 10), "time": time };
}

function calcDoingTime(updates) {
    let time = 0;
    let doing = "";
    let waiting = "";

    let isDoing = false;
    let isWaiting = false;

    for (let i = updates.length - 1; i >= 0; i--) {
        let card = updates[i];

        if (card.data.listAfter.name === "Doing") {
            doing = new Date(card.date);
            isDoing = true;
        } else {
            if (isDoing) {
                waiting = new Date(card.date);
                isWaiting = true;
            }

        }

        if (isDoing && isWaiting) {
            time += waiting - doing;
            isDoing = false;
            isWaiting = false;
            doing = "";
            waiting = "";
        }
    }
    return msHoraMinuto(time);

}