const url = "http://127.0.0.1:5000/search";

let searchTerm = "covid";
let selectedFilters = [];
let filtersFromPreviousSearch = [];
const filtersFromPreviousSearchDiv = document.querySelector(
  ".selected-filters"
);
document.addEventListener("click", e => {
  if (e.target.classList.contains("filter-checkbox")) {
    const filter = e.target.parentElement.textContent.trim();
    if (selectedFilters.includes(filter)) {
      selectedFilters = selectedFilters.filter(item => {
        return item !== filter;
      });
    } else {
      selectedFilters.push(filter);
    }
  }
});

const applyFilterButton = document.querySelector(".apply-filters");
applyFilterButton.addEventListener("click", e => {
  loadData();
});

const searchField = document.querySelector("#search");
const searchButton = document.querySelector("#searchBtn");
searchButton.addEventListener("click", e => {
  loadData();
});

// divs inside which the respective HTML will be updated
const articlesWrapper = document.querySelector(".results");
const filtersWrapper = document.querySelector(".filter-content");

const clearFiltersAndSearch = () => {
  searchTerm = "";
  selectedFilters = [];
};

// display Filters
const populateFiltersData = filters => {
  const filtersHTML = filters.map(filter => {
    const filterItems = filter.filterItems.map(item => {
      const identifier = item
        .toLowerCase()
        .split(" ")
        .join("_");
      return `
        <label for="${identifier}" class="filter-label">
        <input
            type="checkbox"
            name="${identifier}"
            id="${identifier}"
            class="filter-checkbox"
        />
        ${item}</label
    >
        `;
    });

    return `
    <div class="filter-content-section">
        <h3 class="filter-heading">${filter.title}</h3>
        ${filterItems.join("")}
    </div>
    `;
  });
  filtersWrapper.innerHTML = filtersHTML.join("");
};

// display articles
const populateArticlesData = articles => {
  const articlesHTML = articles.map(article => {
    return `
            <div class = "result-item">
            <h3 class="article-title">${article.title}</h3>
                <h4 class="article-author">
                <span>Author: </span> <span>${article.author}</span>
                </h4>
                <p>${article.description}</p>
            </div>`;
  });
  articlesWrapper.innerHTML = articlesHTML.join("");
};

const populateDataOnScreen = data => {
  const filters = data.filters;
  const articles = data.articles;
  populateArticlesData(articles);
  populateFiltersData(filters);
};

//load the new articles and the filters according to the filters and search term selected.
const loadData = async () => {
  searchTerm = searchField.value;
  const params = new URLSearchParams({
    searchTerm,
    selectedFilters
  });
  const queryURL = `${url}?${params.toString()}`;
  const response = await fetch(queryURL, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  });
  const data = await response.json();
  populateDataOnScreen(data);
  filtersFromPreviousSearch = selectedFilters;
  if (filtersFromPreviousSearch.length > 0) {
    filtersFromPreviousSearchDiv.innerHTML = `
           <p>Filters Selected:  ${filtersFromPreviousSearch.join(", ")}</p>
        `;
    filtersFromPreviousSearchDiv.style.display = "block";
  }
  clearFiltersAndSearch();
};

const init = () => {
  loadData();
};

init();
