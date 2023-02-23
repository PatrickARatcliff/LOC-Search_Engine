//variables
//target dom elements
const searchForm = document.getElementById("search-form");
const resultsContainer = document.getElementById("results-container");
const searchContainer = document.getElementById("previous-search-container");
const resultText = document.getElementById("result-text");
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

function populateResults(resultData) {

    let resultCard = document.createElement('div');
    resultCard.innerHTML = `<div class="card my-2">
    <div >
        <img src="${resultData.image_url[0]}" class="card-img-top" alt="..." style="">
    </div>
    <div class="card-body">
      <h5 class="card-title text-dark">${resultData.title}</h5>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">${resultData.date}</li>
      <li class="list-group-item">${resultData.subject}</li>
    </ul>
    <div class="card-body">
      <a href="${resultData.url}" class="card-link"  target="_blank">${resultData.url}</a>
    </div>
  </div>`
  resultsContainer.append(resultCard)
};

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
            console.log(data.results)
            resultText.textContent = '';
            resultText.textContent = `${searchTerm}, ${searchFormat}`;
            if (!data.results.length) {
                console.log('No results found!');
                resultsContainer.innerHTML = `<h5>No results for ${searchTerm}, ${searchFormat}</h5>`;
            } else {
                resultsContainer.innerHTML = '';
                for (let i = 0; i < data.results.length; i++) {
                    populateResults(data.results[i])
                }
            }
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

    localStorage.setItem('searchTerm', searchTerm);
    localStorage.setItem('serarchFormat', searchFormat);

    location.assign(queryString);
};

//event listeners
searchForm.addEventListener("submit", searchFromSubmitHandler);

//logic if needed
apiPromise(apiRequestUrl);