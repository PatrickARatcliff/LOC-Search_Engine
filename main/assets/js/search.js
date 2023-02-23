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
    resultCard.classList.add('card', 'my-2');

    let cardImageTop = document.createElement('div')
    if(resultData.image_url[0]) {
        cardImageTop.innerHTML = `<img src="${resultData.image_url[0]}" class="card-img-top" alt="..." style=""></img>`
        resultCard.appendChild(cardImageTop);
    };
    
    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    resultCard.appendChild(cardBody);

    let cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title', 'text-dark');
    cardBody.appendChild(cardTitle);

    if (resultData.title) {
        cardTitle.innerText = resultData.title;
    } else {
        cardTitle.innerText = "no title"
    };

    if (resultData.date || resultData.subject) {
        let listGroup = document.createElement('ul');
        listGroup.classList.add('list-group', 'list-group-flush');
        resultCard.appendChild(listGroup);
        if (resultData.date) {
            let listDate = document.createElement('li');
            listDate.classList.add('list-group-item');
            listDate.innerText = resultData.date
            listGroup.appendChild(listDate);
        };
        if (resultData.subject) {
            let listSubject = document.createElement('li');
            listSubject.classList.add('list-group-item');
            listSubject.innerText = resultData.subject
            listGroup.appendChild(listSubject);
        };
    };

    if (resultData.url) {
        let cardBodyLinkEl = document.createElement('div');
        cardBodyLinkEl.classList.add('card-body');
        cardBodyLinkEl.innerHTML = `<a href="${resultData.url}" class="card-link"  target="_blank">${resultData.url}</a>`;
        resultCard.appendChild(cardBodyLinkEl);
    }

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
            resultText.textContent = `${searchTerm}, ${searchFormat} (${data.results.length})`;
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

function searchFormSubmitHandler(event) {
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
searchForm.addEventListener("submit", searchFormSubmitHandler);

//logic if needed
apiPromise(apiRequestUrl);