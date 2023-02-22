//variables
//target dom elements
const searchForm = document.getElementById("search-form");
const resultsContainer = document.getElementById("results-container");
const searchContainer = document.getElementById("previous-search-container");
//declare variables
const apiBase = `https://www.loc.gov/`;
const jsonParameter = `fo=json`;
const searchFormatQuery = window.location.search.split('=', 3);
const searchTermQuery = searchFormatQuery[1].split('&', 1);
const searchFormat = searchFormatQuery[2];
const searchTerm = searchTermQuery[0];
const apiRequestUrl = `${apiBase}${searchFormat}/?${jsonParameter}&q=${searchTerm}`;
//functions
// console.log(searchFormat);
// console.log(searchTerm);
console.log(apiRequestUrl);

function apiPromise(url) {
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then((data) => {
            console.log(data.search.query);
        })
        .catch((error) => window.alert(error))
};

function searchFromSubmitHandler(event) {
    event.preventDefault();

    const searchTerm = document.getElementById("search-term").value;
    const searchFormat = document.getElementById("format-term").value;

    if (!searchTerm) {
        window.alert('Please enter a "Search Term"');
        return;
    }

    console.log(searchTerm.value);
    console.log(searchFormat.value);

    const queryString = `./results.html?q=${searchTerm}&format=${searchFormat}`;

    location.assign(queryString);
};

//event listeners
searchForm.addEventListener("submit", searchFromSubmitHandler);

//logic if needed
apiPromise(apiRequestUrl);