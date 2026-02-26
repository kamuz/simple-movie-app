const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d9501508c79c08ce709121b411774d15&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280/';
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=d9501508c79c08ce709121b411774d15&query="';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// Get all movies
getMovies(API_URL);

// Async function to fetch movies from a given URL
async function getMovies(url) {
    // Send request to API
    const res = await fetch(url);

    // Convert response to JSON
    const data = await res.json();

    // Display fetched movies
    showMovies(data.results);
    // console.log(data.results);
}

// Function to render movies into the DOM
function showMovies(movies) {
    // Clear previous movies
    main.innerHTML = '';

    // Loop through each movie object
    movies.forEach((movie) => {
        // Destructure needed properties from movie object
        const { title, poster_path, vote_average, overview } = movie;

        // Create a new div element for each movie
        const movieEl = document.createElement('div');
        // Add CSS class 'movie' to the div
        movieEl.classList.add('movie');

        // Set inner HTML structure for movie card
        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                <p>${overview}</p>
            </div>
        `;

        // Append movie card to main container
        main.appendChild(movieEl);
    });
}

// Function to return CSS class based on movie rating
function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

// Search movie
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    // If search term is not empty
    if (searchTerm && searchTerm !== '') {
        // Fetch movies based on search query
        getMovies(SEARCH_URL + searchTerm);
        // Clear input field after search
        search.value = '';
    } else {
        // If empty input, reload page to show popular movies again
        window.location.reload();
    }
});