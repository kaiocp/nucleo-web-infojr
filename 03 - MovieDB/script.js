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
            <img src="${imgUrl}${el.poster_path}" alt="Poster do filme" class="movie-poster">
            <div class="movies__movie-description">
                <h2>${el.title}</h2>
                <p class="original-title">${el.original_title}</p>
                <p>Release: ${el.release_date}</p>
                <p>Original language: ${el.original_language}</p>
                <div class="movies__movie-description-avs">
                    <p>Vote average: ${el.vote_average}</p>
                    <img src="assets/img/star-svgrepo-com.svg" class="star-svg">
                </div>
                <div class=movies__movie-description-hr>
                    <hr>
                </div>
                <p class="movies__movie-description-sinopsys">Synopsis: ${el.overview}</p>
            </div>
        </div>
        `
    });
}

makeHTML();