export function msHoraMinuto(milisegundos) {
    const ms_hora = 3600000;// 1 hora = 3,600,000 milisegundos
    const ms_minuto = 60000; // 1 minuto = 60,000 milisegundos
    const horas = Math.floor(milisegundos / ms_hora);
    const minutos = Math.floor((milisegundos % ms_hora) / ms_minuto);
    return `${horas}:${minutos}`;
}

function table(name, member, date, time) {
    const area = document.getElementById("table");
    const fila =
        `<tr>
            <th>${name}</th>
            <th>${member}</th>
            <th>${date}</th>
            <th>${time}</th>
        </tr>`
    area.insertAdjacentHTML('beforeend', fila);
}