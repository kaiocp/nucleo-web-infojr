// open and closes modal

const modal = document.getElementById('modal');
const addPersonBtn = document.getElementById('modal-btn');
const enviarBtn = document.getElementById('enviar');
const cancelarBtn = document.getElementById('cancelar');

// opens modal
addPersonBtn.addEventListener('click', () => {
    modal.classList.add('show');
})

// closes modal
modal.addEventListener('click', (ev) => {
    if (ev.target.id == 'modal') {
        modal.classList.remove('show');
        resetValues();
    }
})
cancelarBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    resetValues();
})
cancelarBtn.addEventListener('onkeydown', (ev) => {
    if (ev.keyCode == 13) {
        modal.classList.remove('show');
        resetValues();
    }
})
window.addEventListener('keydown', (ev) => {
    if (ev.keyCode == 27) {
        modal.classList.remove('show');
        resetValues();
    }
})

// comunicação com a api

async function getClients() {
    const res = await fetch("http://localhost:3000/user");
    let data = await res.json();

    return data;
}

async function postClient(name, breads) {
    let data = {
        name: name,
        breads: breads
    }

    await fetch(
        "http://localhost:3000/user", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }
    ).then(res => {
        console.log(res);
    });
}

async function deleteClient(id) {
    await fetch(`http://localhost:3000/user/${id}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' }
    }).then(res => { console.log(res) })
}

async function makeHTML() {
    const clients = await getClients();

    const queueElements = document.querySelector('.queue__elements');

    const totalClientsEl = document.getElementById('total-clients');
    const totalBreadsEl = document.getElementById('total-breads');
    const totalAmountEl = document.getElementById('total-amount');

    let totalClients = 0;
    let totalBreads = 0;
    let totalAmount = 0;

    clients.response.forEach(client => {
        queueElements.innerHTML += `
        <div class="queue__box" id="${client.id}">
            <div class="queue__box-text">
                <h2>${client.name}</h2>
                <div class="queue__box-text--order">
                    <p><span class="bold">Total de pães: </span>${client.breads}</p>
                    <p><span class="bold">Total a pagar: </span>R$ ${client.breads * 0.5}</p>
                </div>
            </div>
            <div class="trash-icon">
                <a onclick="removeQueue(${client.id})"><img src="assets/img/icons/trash.svg" alt="Remover da fila"></a>
            </div>
        </div>
        `
            // updating transaction board
        totalClients += 1;
        totalBreads += client.breads;
        totalAmount += (client.breads * 0.5);

        totalClientsEl.innerHTML = totalClients
        totalBreadsEl.innerHTML = totalBreads;
        totalAmountEl.innerHTML = `R$ ${totalAmount.toFixed(2)}`;
    });
}

// get elements and posts on api

const nome = document.getElementById('nome');
const paes = document.getElementById('paes');

enviarBtn.addEventListener('click', () => {
    if ((nome.value == '') || (paes.value == '') || (paes.value <= 0)) {
        alert("Por favor, digite as informações corretamente")
    } else {
        postClient(nome.value, parseInt(paes.value));
        location.reload();
    }
});

enviarBtn.addEventListener('onkeydown', (ev) => {
    if (ev.keyCode == 13) {
        if ((nome.value == '') || (paes.value == '') || (paes.value <= 0)) {
            alert("Por favor, digite as informações corretamente")
        } else {
            postClient(nome, paes);
            location.reload();
        }
    }
});

function resetValues() {
    nome.value = '';
    paes.value = '';
}

function removeQueue(id) {
    const queue = document.getElementById(id);
    queue.remove();

    deleteClient(id);
    location.reload();
};

makeHTML();