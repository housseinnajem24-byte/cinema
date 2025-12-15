const API_KEY = "2f9bb2c5";
let page = 1;

async function chargerFilms() {
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=batman&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.Search) return;

    const container = document.getElementById("Films");

    data.Search.forEach(film => {
        const poster = film.Poster !== "N/A"
            ? film.Poster
            : "https://via.placeholder.com/200x300?text=Aucune+affiche";

        container.innerHTML += `
            <div class="affiche-taille">
                <img src="${poster}" alt="Affiche du film ${film.Title}">
                <p>${film.Title}</p>
                <a href="../page movie/movie.html?id=${film.imdbID}">Voir détails</a>
            </div>
        `;
    });
}

chargerFilms();

document.getElementById("load-more").addEventListener("click", () => {
    page++;
    chargerFilms();
});
