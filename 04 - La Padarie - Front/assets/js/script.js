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
    }
})
cancelarBtn.addEventListener('click', () => {
    modal.classList.remove('show');
})
cancelarBtn.addEventListener('onkeydown', (ev) => {
    if (ev.keyCode == 13) {
        modal.classList.remove('show');
    }
})
window.addEventListener('keydown', (ev) => {
    if (ev.keyCode == 27) {
        modal.classList.remove('show');
    }
})

// get elements and adds to html document

const nome = document.getElementById('nome');
const paes = document.getElementById('paes');

let clients = []


function makeQueueBox() {
    const queueElements = document.querySelector('.queue__elements');

    let client = {
        id: document.querySelectorAll('.queue__box').length,
        name: nome.value,
        breads: parseInt(paes.value),
        amount: parseInt(paes.value) * 0.5
    }

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

    clients.push(client);

    modal.classList.remove('show');

    nome.value = '';
    paes.value = '';
}

enviarBtn.addEventListener('click', () => {
    if ((nome.value != '') && (paes.value != '')) {
        makeQueueBox();
    } else {
        alert("Digite um nome e a quantidade de pães.")
    }
});

enviarBtn.addEventListener('onkeydown', (ev) => {
    if (ev.keyCode == 13) {
        if ((nome.value != '') && (paes.value != '')) {
            makeQueueBox();
        } else {
            alert("Digite um nome e a quantidade de pães.")
        }
    }
});

// remove element when trash icon is clicked and also removes it from the clients array
function removeQueue(id) {
    const queue = document.getElementById(id);
    queue.remove();

    const index = clients.indexOf(id);
    clients.splice(index, 1);
};