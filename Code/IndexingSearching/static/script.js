const url = "http://127.0.0.1:5000/search"	;

let searchTerm = "covid";
let selectedFilters = [];
let filtersFromPreviousSearch = [];
const filtersFromPreviousSearchDiv = document.querySelector(
	".selected-filters"
);
document.addEventListener("click", (e) => {
	if (e.target.classList.contains("filter-checkbox")) {
		const filter = e.target.parentElement.textContent.trim();
		if (selectedFilters.includes(encodeURIComponent(filter))) {
			selectedFilters = selectedFilters.filter((item) => {
				return item !== filter;
			});
		} else {
			selectedFilters.push(encodeURIComponent(filter));
		}
	}
});

const applyFilterButton = document.querySelector(".apply-filters");
applyFilterButton.addEventListener("click", (e) => {
	loadData();
});

const searchField = document.querySelector("#search");
const searchButton = document.querySelector("#searchBtn");
searchButton.addEventListener("click", (e) => {
	loadData();
});

// divs inside which the respective HTML will be updated
const articlesWrapper1 = document.querySelector(".unweighted .results");
const articlesWrapper2 = document.querySelector(".weighted .results");
const filtersWrapper = document.querySelector(".filter-content");

const clearFiltersAndSearch = () => {
	searchTerm = "";
	selectedFilters = [];
};

// display Filters
const populateFiltersData = (filters) => {
	const filtersHTML = filters.map((filter) => {
		if (filter.data.length){
		
			let filterItems = filter.data.map((item) => {
				const identifier = item.toLowerCase().split(" ").join("_");
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
		}
		});
		filtersWrapper.innerHTML = filtersHTML.join("");
};

// display articles
const populateArticlesData = (articles, wrapper) => {
	articles = articles.reduce((a, b)=>[...a,...b])
	console.log(articles);

	const articlesHTML = articles.map((article) => {

		let replies = article.replies.length > 0 ? article.replies.map((reply)=>{
			return `<div class="reply-item">${reply.content}</div>`
		}): [`<div class="no-reply">No replies for this post</div>`]

		return `
            <div class = "result-item">
				<p>${article.content}</p>
				<p><strong>Article URL: </strong><a href=${article.url} target="_blank">Go to the Post</a></p>
				<a class="view-replies">View Replies <span class="fa fa-angle-down"></span></a>
				<div class="replies">
					${replies.join("")}
				</div>
            </div>`;
	});
	wrapper.innerHTML = articlesHTML.join("");
};

document.addEventListener("click", (e)=>{
	if(e.target.classList.contains("view-replies")){
		let elem = e.target;
		if(elem.nextElementSibling.style.display === "block") elem.nextElementSibling.style.display = "none"
		else elem.nextElementSibling.style.display = "block"
	}
})

const populateDataOnScreen = (data) => {
	const filters = data.filters;
	const articlesUnweighted = data.articles;
	const articlesWeighted = data.sorted_results;
	populateArticlesData(articlesUnweighted, articlesWrapper1);
	populateArticlesData(articlesWeighted, articlesWrapper2);
	populateFiltersData(filters);
};

//load the new articles and the filters according to the filters and search term selected.
const loadData = async () => {
	searchTerm = searchField.value?encodeURIComponent(searchField.value):"covid";
	const params = new URLSearchParams({
		searchTerm,
		selectedFilters,
	});
	const queryURL = `${url}?${params.toString()}`;
	console.log(queryURL)
	const response = await fetch(queryURL, {
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	});
	const data = await response.json();
	populateDataOnScreen(data);
	let html = "";
	selectedFilters.forEach((filter)=>{
		html += `<p class='selected-filter'>${decodeURIComponent(filter)}</p>`
	});
	if (html.length > 0) {
		// filtersFromPreviousSearch = filtersFromPreviousSearch.join("")
		let newhtml = "<strong>Filters Selected:</strong>" + html
		filtersFromPreviousSearchDiv.innerHTML = newhtml;
		filtersFromPreviousSearchDiv.style.display = "block";
	}
	clearFiltersAndSearch();
};

const init = () => {
	loadData();
};

init();
