//variables
//target dom elements
const searchForm = document.getElementById("search-form");
//declare variables
let termArray = [];
let formatArray = [];
//functions
function saveHistData() {

  let term = JSON.parse(localStorage.getItem('searchTerm'));
  let format = JSON.parse(localStorage.getItem('searchFormat'));

  // console.log(term);
  // console.log(format);

  termArray = JSON.parse(localStorage.getItem('termArray', termArray) || `[]`);
  console.log(termArray)
  formatArray = JSON.parse(localStorage.getItem('formatArray', formatArray) || `[]`);

  termArray.push(term);
  formatArray.push(format);

  // console.log(termArray);
  // console.log(formatArray);

  localStorage.setItem('termArray', JSON.stringify(termArray));
  localStorage.setItem('formatArray', JSON.stringify(formatArray));
};

function searchFormSubmitHandler(event) {
    event.preventDefault();

    const searchTerm = document.getElementById("search-term").value.trim().toUpperCase();
    const searchFormat = document.getElementById("format-term").value.trim().toUpperCase();

    if (!searchTerm) {
        window.alert('Please enter a "Search Term"');
        return;
      }

    console.log(searchTerm.value);
    console.log(searchFormat.value);

    const queryString = `./results.html?q=${searchTerm}&format=${searchFormat}`;

    localStorage.setItem('searchTerm', JSON.stringify(searchTerm));
    localStorage.setItem('searchFormat', JSON.stringify(searchFormat));

    saveHistData();

    location.assign(queryString);
}

//event listeners
searchForm.addEventListener("submit", searchFormSubmitHandler)

//logic if needed