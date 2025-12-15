const API_KEY = "2f9bb2c5";

const urlParams = new URLSearchParams(window.location.search);
const movieID = urlParams.get("id");

async function chargerFilm() {
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieID}&plot=full`;

    const response = await fetch(url);
    const film = await response.json();

    document.getElementById("title").textContent = film.Title;
    document.getElementById("poster").src = film.Poster;
    document.getElementById("resume").textContent = "Résumé : " + film.Plot;
    document.getElementById("genre").textContent = "Genre : " + film.Genre;
    document.getElementById("actors").textContent = "Acteurs : " + film.Actors;
    document.getElementById("rating").textContent = "Note IMDB : " + film.imdbRating;
}

chargerFilm();
