const moviesSection = document.querySelector(".movies");

let imgUrl = "https://image.tmdb.org/t/p/w500";

async function getMovies() {
    const response = await fetch("http://localhost:3000/api");
    const data = response.json();

    return data
}

async function makeHTML() {
    const movies = await getMovies();

    movies['results'].forEach((el) => {
        moviesSection.innerHTML += `
        <div class="movies__movie">
            <img src="${imgUrl}${el.poster_path}" alt="Poster do filme">
            <div class="movies__movie-description">
                <h2>${el.title}</h2>
                <p>${el.original_title}</p>
                <p>${el.release_date}</p>
                <p>${el.original_language}</p>
                <p>${el.vote_average}</p>
                <p>${el.overview}</p>
            </div>
        </div>
        `
    });
}

makeHTML();