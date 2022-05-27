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

// get elements and adds to html document

const nome = document.getElementById('nome');
const paes = document.getElementById('paes');

const totalClientsEl = document.getElementById('total-clients');
const totalBreadsEl = document.getElementById('total-breads');
const totalAmountEl = document.getElementById('total-amount');

let clients = JSON.parse(localStorage.getItem("clients")) || [];

function resetValues() {
    nome.value = '';
    paes.value = '';
}

function updateTransactionBoard() {
    let totalBreads = 0;
    let totalAmount = 0;

    for (let i = 0; i < clients.length; i++) {
        totalBreads += clients[i].breads;
        totalAmount += clients[i].amount;
    }

    totalClientsEl.innerHTML = clients.length;
    totalBreadsEl.innerHTML = totalBreads;
    totalAmountEl.innerHTML = `R$ ${totalAmount.toFixed(2)}`;
}

// remove element when trash icon is clicked, also removes it from the clients array and localstorage
function removeQueue(id) {
    const queue = document.getElementById(id);
    queue.remove();

    const index = clients.indexOf(id);
    clients.splice(index, 1);

    localStorage.clients = JSON.stringify(clients);

    updateTransactionBoard();
};

function makeQueueBoxInnerHTML(client) {
    const queueElements = document.querySelector('.queue__elements');

    queueElements.innerHTML += `
    <div class="queue__box" id="${client.id}">
        <div class="queue__box-text">
            <h2>${client.name}</h2>
            <div class="queue__box-text--order">
                <p><span class="bold">Total de pães: </span>${client.breads}</p>
                <p><span class="bold">Total a pagar: </span>R$ ${client.amount}</p>
            </div>
        </div>
        <div class="trash-icon">
            <a onclick="removeQueue(${client.id})"><img src="assets/img/icons/trash.svg" alt=""></a>
        </div>
    </div>
    `
}

function makeQueueBox() {
    let client = {
        id: document.querySelectorAll('.queue__box').length,
        name: nome.value,
        breads: parseInt(paes.value),
        amount: parseInt(paes.value) * 0.5
    }

    clients.push(client);
    localStorage.setItem("clients", JSON.stringify(clients));

    makeQueueBoxInnerHTML(client);

    resetValues();
    updateTransactionBoard();
    modal.classList.remove('show');
}

if (clients.length > 0) {
    clients.forEach((client) => {
        makeQueueBoxInnerHTML(client);

        updateTransactionBoard();
    })
}

enviarBtn.addEventListener('click', () => {
    if ((nome.value == '') || (paes.value == '') || (paes.value <= 0)) {
        alert("Por favor, digite as informações corretamente")
    } else {
        makeQueueBox();
    }
});

enviarBtn.addEventListener('onkeydown', (ev) => {
    if (ev.keyCode == 13) {
        if ((nome.value == '') || (paes.value == '') || (paes.value <= 0)) {
            alert("Por favor, digite as informações corretamente")
        } else {
            makeQueueBox();
        }
    }
});