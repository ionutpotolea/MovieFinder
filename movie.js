var imdbID = window.location.search.split("=")[1]
var myURL = `https://www.omdbapi.com/?plot=full&apikey=aad72dfe&r=json&i=${imdbID}`
const movieDetails = document.getElementById('movieDetailsWrapper');
window.onload = () => {
    fetchData();
}

function fetchData(){
    getResource(myURL)
    .then(function(responsePromise) {
        if (responsePromise.Response !== "False"){
            displayResults(responsePromise);
        } else {
            displayError()
        }
    })
}

function displayResults(results) {
    if (results.Poster === "N/A"){
        results.Poster = "img/noPoster.jpg"
    }
    movieDetailsWrapper.innerHTML = `
    <button onclick="history.back()" class="back">Back</button>
    <div class="movieTitleAndRating">
        <h3>${results.Title}<span>(${results.Year})</span></h3>
        <div><span class="imdbLogo">IMDb</span><i class="fas fa-star"></i><span>${results.imdbRating}</span></div>
    </div>
    <div class="movieInfo">
        <small>${results.Rated}</small>
        <small>${convertMovieRuntime(results.Runtime)}</small>
        <small>${results.Genre}</small>
        <small>${results.Released}</small>
    </div>
    <div class="movieDescription">
        <div class="posterContainer"><img src="${results.Poster}" alt="MoviePoster" onerror="this.onerror=null;this.src='img/noPoster.jpg';"></div>
        <div>
            <p>${results.Plot}</p>
            <ul>
                <li><span>Director:</span>${results.Director}</li>
                <li><span>Writer:</span>${results.Writer}</li>
                <li><span>Actors:</span>${results.Actors}</li>
            </ul>
        </div>
    </div>
    `
}

function displayError() {
    movieDetailsWrapper.innerHTML = "<div class='errorWrapper'>Movie not found.</div>"
}

function convertMovieRuntime(minutesDuration){
    if (minutesDuration !== "N/A"){
        let hours = parseInt(minutesDuration.split(" ")[0]/60);
        let minutes = minutesDuration.split(" ")[0]%60;
        if (hours === 0){
            return `${minutes}min`
        } else {
            return `${hours}h ${minutes}min`
        }
    } else return "N/A"
}