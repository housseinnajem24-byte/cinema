const API_KEY = "2f9bb2c5";
let pageSearch = 1;
let currentSearch = "";

document.getElementById("charger-plus").style.display = "none";

document.getElementById("bouton-recherche").addEventListener("click", () => {

    currentSearch = document.getElementById("input-recherche").value.trim();

    if (currentSearch === "") return;

    document.getElementById("resultat").innerHTML = "";
    pageSearch = 1;

    rechercherFilm();
});

document.getElementById("input-recherche").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        document.getElementById("bouton-recherche").click();
    }
});


async function rechercherFilm() {

    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${currentSearch}&page=${pageSearch}`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data.Search) {
        document.getElementById("titre-recherche").innerText = "Aucun film trouvé.";
        document.getElementById("titre-recherche").style.display = "block";
        
        document.getElementById("charger-plus").style.display = "none";
        return;
    }

    document.getElementById("titre-recherche").style.display = "block";
    document.getElementById("charger-plus").style.display = "block";

    const container = document.getElementById("resultat");

    data.Search.forEach(film => {

        let poster = film.Poster;

        container.innerHTML += `
            <div class="affiche-taille">
                <img src="${film.Poster !== "N/A" ? film.Poster : "https://via.placeholder.com/200x300?text=Aucune+affiche"}
                alt="Affiche du film ${film.Title}">                
                <p>${film.Title}</p>
                <a href="../page movie/movie.html?id=${film.imdbID}">Voir détails</a>
            </div>
        `;
    });
}

document.getElementById("input-recherche").addEventListener("input", () => {
    currentSearch = document.getElementById("input-recherche").value.trim();

    if (currentSearch.length < 2) {
        document.getElementById("resultat").innerHTML = "";
        document.getElementById("charger-plus").style.display = "none";
        return;
    }

    pageSearch = 1;
    document.getElementById("resultat").innerHTML = "";
    rechercherFilm();
});



document.getElementById("charger-plus").addEventListener("click", () => {
    if (!currentSearch) return;
    pageSearch++;
    rechercherFilm();
});
