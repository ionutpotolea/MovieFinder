const userInput = document.getElementById('userInput');
const maxResults = document.getElementById('maxResults');
const resultsSection = document.getElementById('resultsSectionWrapper');
const noPosterImg = "img/noPoster.jpg"
var availablePages = 0;

window.onload = () => {
    myURL = new URL(window.location.href);
    if((myURL.href).includes("?")){
        userInput.value = decodeURIComponent(myURL.searchParams.getAll("search"));
        fetchData();
    }
}

document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (userInput.value === ""){
        document.getElementById("errorMsg").innerText = "Please type keyword(s) in the search box above."
        document.getElementById("errorMsg").style.display = "block";
    } else {
        window.location = `results.html?search=${userInput.value}`;
    }
})

maxResults.addEventListener("change", () => {
    fetchData();
})

function fetchData(){
    resultsSection.innerHTML = "";
    getResource(`https://www.omdbapi.com/?plot=full&apikey=aad72dfe&r=json&type=movie&s=${userInput.value}`)
    .then(function(responsePromise) {
        if (responsePromise.Response !== "False"){
            availablePages = 1+parseInt((responsePromise.totalResults-1)/10);
            for (var i = 1; i<=availablePages; i++){
                if (i === 1+(maxResults.value/10)){
                    break
                } else {
                    getResource(`https://www.omdbapi.com/?plot=full&apikey=aad72dfe&r=json&type=movie&page=${i}&s=${userInput.value}`)
                    .then(function(responsePromise) {
                    displayResults(responsePromise)
                })
                }
            }
        } else {
            document.getElementById("errorMsg").innerText = "Movie not found."
            document.getElementById("errorMsg").style.display = "block";
        }
    })
}

function displayResults(results) {
    for (var i = 0; i<results.Search.length; i++){
        if (results.Search[i].Poster === "N/A"){
            results.Search[i].Poster = noPosterImg
        }
        resultsSection.innerHTML += `
        <div class="searchResult">
            <a href="movie.html?id=${results.Search[i].imdbID}">
                <img src="${results.Search[i].Poster}" onerror="this.onerror=null;this.src='img/noPoster.jpg';">
            </a>
            <h3>
                <a href="movie.html?id=${results.Search[i].imdbID}">${results.Search[i].Title}</a>
            </h3>
            <p>${results.Search[i].Year}</p>
            <a href="movie.html?id=${results.Search[i].imdbID}" class="detailsButton">Details</a>
        </div>
        `
    }
}