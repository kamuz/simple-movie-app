const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d9501508c79c08ce709121b411774d15&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280/';
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=d9501508c79c08ce709121b411774d15&query="';

const form = document.getElementById('form');
const search = document.getElementById('search');

// Get all movies
getMovies(API_URL);

async function getMovies(url){
    const res = await fetch(url);
    const data = await res.json();

    console.log(data.results);
}

// Search movie
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm && searchTerm !== ''){
        getMovies(SEARCH_URL + searchTerm);

        search.value = '';
    } else {
        window.location.reload();
    }
})