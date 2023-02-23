//variables
//target dom elements
const searchForm = document.getElementById("search-form");

//declare variables


//functions
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
}

//event listeners
searchForm.addEventListener("submit", searchFormSubmitHandler)

//logic if needed