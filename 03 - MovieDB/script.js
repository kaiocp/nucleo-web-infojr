const body = document.querySelector("body");

async function getMovie() {
    const response = await fetch("http://localhost:3000/api");
    const data = response.json();

    return data
}

let imgUrl = "https://image.tmdb.org/t/p/w500";

async function makeHTML() {
    const movies = await getMovie();

    movies['results'].forEach((el) => {
        body.innerHTML += `
        <div>
            <p>${el.title}</p>
            <img src="${imgUrl}${el.poster_path}"></img>
        </div>
        `
    });
}

makeHTML();