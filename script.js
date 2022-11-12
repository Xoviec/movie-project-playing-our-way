"use strict";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");
const filterInput = document.getElementById('cars');
let filtered;
let nameFilter = undefined;
let movies;

// TMD_BASE_URL / movie/{movieid} / credits?api-key=xxx & language=en-US
//https://api.themoviedb.org/3/ movie/436270 /credits?api_key=542003918769df50083a13c415bbc602&language=en-US

// Don't touch this function please
const autorun = async () => {
  movies = await fetchMovies();
  renderNavbar(movies.results);
  renderMovies(movies.results);
  console.log(movies.results)
};

// Don't touch this function please
const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
};
//console.log(atob("NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="))
//console.log(btoa("542003918769df50083a13c415bbc602"))

// You may need to add to this function, definitely don't delete it.
const movieDetails = async (movie) => {
  const movieRes = await fetchMovie(movie.id);
  const actorRes = await fetchActors(movie.id);
  renderMovie(movieRes, actorRes);
};

// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchMovies = async () => {
  const url = constructUrl(`movie/now_playing`);
  const res = await fetch(url);
  return res.json();
};

const fetchActors = async (id) => {
  const url = constructUrl(`movie/${id}/credits`);
  const res = await fetch(url);
  //console.log(res.json())
  return res.json();
};

// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json();
};
// Navbar

filterInput.addEventListener('change', (event) => {
  filtered = event.target.value
  console.log(filtered)
  console.log(movies.results)
  nameFilter = movies.results.filter((movies)=> movies.original_title.includes(filtered))
  console.log(nameFilter)
  renderMovies(movies.results);

});

const renderNavbar = (movies, filtered) => {
  const navbarDiv = document.createElement("div");
  console.log(movies)
  // nameFilter = movies.filter((movies)=> movies.genre_id.includes('elo'))
    navbarDiv.innerHTML = `

        `;
        console.log(filterInput.value)
 
    CONTAINER.appendChild(navbarDiv);
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
  console.log(nameFilter)
  if (nameFilter){
    nameFilter.map((movie) => {
      const movieDiv = document.createElement("div");
      movieDiv.innerHTML = `
          <img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${
        movie.title
      } poster">
          <h3>${movie.title}</h3>`;
      movieDiv.addEventListener("click", () => {
        movieDetails(movie);
      });
      CONTAINER.appendChild(movieDiv);
   })
  }else{
    movies.map((movie) => {
      const movieDiv = document.createElement("div");
      movieDiv.innerHTML = `
          <img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${
        movie.title
      } poster">
          <h3>${movie.title}</h3>`;
      movieDiv.addEventListener("click", () => {
        movieDetails(movie);
      });
      CONTAINER.appendChild(movieDiv);
   })
  }
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovie = (movie, actors) => {
  CONTAINER.innerHTML = `
    <div class="row">
        <div class="col-md-4">
             <img id="movie-backdrop" src=${
               BACKDROP_BASE_URL + movie.backdrop_path
             }>
        </div>
        <div class="col-md-8">
            <h2 id="movie-title">${movie.title}</h2>
            <p id="movie-release-date"><b>Release Date:</b> ${
              movie.release_date
            }</p>
            <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
            <h3>Overview:</h3>
            <p id="movie-overview">${movie.overview}</p>
        </div>
        </div>
            <h3>Actors:</h3>
            <ul id="actors" class="list-unstyled">
            </ul>
        </div>`;
  const actorList = document.getElementById("actors")
  actorList.append(renderActors(actors))
};

const renderActors = (actors) =>  {
    actors.cast.slice(0, 5).map((actor) => {
    const actorDiv = document.createElement("ul");
    actorDiv.innerHTML = `
        <li>${actor.name}</li>
        <img src="${BACKDROP_BASE_URL + actor.profile_path}" alt="${actor.name} poster">`;
    actorDiv.addEventListener("click", () => {displaySingleActorPage();});

    CONTAINER.appendChild(actorDiv);
  });


  const displaySingleActorPage = () => {
    CONTAINER.innerHTML = `
      <div class="row">
          <div class="col-md-4">
               <h1>welcome, you are in actor page</h1>
          </div>`;
  };
}

document.addEventListener("DOMContentLoaded", autorun);
