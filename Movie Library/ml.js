document.addEventListener('DOMContentLoaded', function () {
    fetchmovies();
});

let movies = [];

function fetchmovies() {
    const apiKey = '49082d28';
    const MoviesGrid = document.getElementById('MoviesGrid');
    MoviesGrid.innerHTML = '<p>Loading movies...</p>';

    const randomSearchTerms = ['action', 'comedy', 'drama', 'adventure'];
    const randomTerm = randomSearchTerms[Math.floor(Math.random() * randomSearchTerms.length)];

    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${randomTerm}`)
        .then(response => response.json())
        .then(data => {
            if (data.Search && data.Search.length > 0) {
                movies = data.Search;
                moviestoshow(movies);
            } else {
                MoviesGrid.innerHTML = '<p>No random movies found!</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching random movies:', error);
            MoviesGrid.innerHTML = '<p>Error fetching movies. Please try again later.</p>';
        });
}

function searchMovies() {
    const apiKey = '49082d28';
    const searchInput = document.getElementById('searchInput').value;
    const MoviesGrid = document.getElementById('MoviesGrid');

    if (searchInput.trim() !== '') {
        MoviesGrid.innerHTML = '<p>Loading movies...</p>';
        fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput}`)
            .then(response => response.json())
            .then(data => {
                if (data.Search && data.Search.length > 0) {
                    movies = data.Search;
                    moviestoshow(movies);
                } else {
                    MoviesGrid.innerHTML = '<p>No movies found with the given name!</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                MoviesGrid.innerHTML = '<p>Error fetching movies. Please try again later.</p>';
            });
    } else {
        alert('Enter a movie title then search!');
    }
}

function moviestoshow(movies) {
    const MoviesGrid = document.getElementById('MoviesGrid');
    MoviesGrid.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        movieCard.innerHTML = ` 
            <img src="${movie.Poster}" alt="${movie.Title}"> 
            <h2>${movie.Title}</h2> 
            <p>${movie.Year}</p>
            <input type="checkbox" onchange="toggleSelect('${movie.imdbID}', this.checked)"> Select
        `;

        MoviesGrid.appendChild(movieCard);
    });
}

let selectedMovies = [];

function toggleSelect(imdbID, isChecked) {
    if (isChecked) {
        selectedMovies.push(imdbID);
    } else {
        const index = selectedMovies.indexOf(imdbID);
        if (index !== -1) {
            selectedMovies.splice(index, 1);
        }
    }
}

function addSelectedMoviesToList() {
    const addedMoviesList = document.getElementById('addedMoviesList');

    selectedMovies.forEach(imdbID => {
        const selectedMovie = movies.find(movie => movie.imdbID === imdbID);
        const listItem = document.createElement('li');
        listItem.textContent = selectedMovie.Title;
        addedMoviesList.appendChild(listItem);
    });

    selectedMovies = [];
}
