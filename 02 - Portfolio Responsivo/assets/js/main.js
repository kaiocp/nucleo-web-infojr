const checkbox = document.getElementById('checkbox');
const navbar = document.querySelector('.navbar');
const navTitle = document.querySelector('.navbar__title');
const navBarSwitcher = document.querySelector('.label');
const mainBox = document.querySelector('.main__box');
const hr = document.querySelectorAll('.separator');
const headers = document.querySelectorAll('.headers');
const anchors = document.querySelectorAll('.anchor');
const buttons = document.querySelectorAll('.button');
const svgs = document.querySelectorAll('.svgs');



checkbox.addEventListener('change', () => {
    document.body.classList.toggle('dark-bg');
    document.body.classList.toggle('dark-font');
    navbar.classList.toggle('dark-bg-box');
    navTitle.classList.toggle('dark-font');
    navBarSwitcher.classList.toggle('dark-bg-switcher');
    mainBox.classList.toggle('dark-bg-box');
    hr.forEach(el => {
        el.classList.toggle('dark-bg-switcher');
    });
    headers.forEach(el => {
        el.classList.toggle('dark-font');
    });
    anchors.forEach(el => {
        el.classList.toggle('dark-anchors');
    });
    buttons.forEach(el => {
        el.classList.toggle('dark-buttons');
    });
    svgs.forEach(el => {
        el.classList.toggle('dark-svgs');
    });
});