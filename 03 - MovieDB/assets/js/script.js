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
                <p><span class="bold">Release</span>: ${el.release_date}</p>
                <p><span class="bold">Original language</span>: ${el.original_language}</p>
                <div class="movies__movie-description-avs">
                    <p><span class="bold">Vote average</span>: ${el.vote_average}</p>
                    <img src="assets/img/star-svgrepo-com.svg" class="star-svg">
                </div>
                <div class=movies__movie-description-hr>
                    <hr>
                </div>
                <p class="movies__movie-description-sinopsys"><span class="bold">Synopsis</span>: ${el.overview}</p>
            </div>
        </div>
        `
    });
}

makeHTML();