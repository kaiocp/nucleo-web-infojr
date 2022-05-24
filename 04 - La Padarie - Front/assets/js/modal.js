// open and closes modal

const modal = document.getElementById('modal');
const addPersonBtn = document.getElementById('modal-btn');

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

// get elements and adds to html document