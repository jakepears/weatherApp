/** @format */

let searchHistory = [];
const searchHistoryContainer = document.querySelector('#history');

function renderSearchHistory() {
	searchHistoryContainer.innerHTML = '';

	for (let i = searchHistory.length - 1; i >= 0; i--) {
		const button = document.createElement('button');
		button.setAttribute('type', 'button');
		button.setAttribute('aria-controls', 'today forecast');
		button.classList.add('history-button', 'button-history');

		button.setAttribute('data-search', searchHistory[i]);
		button.textContent = searchHistory[i];
		searchHistoryContainer.append(button);
	}
}

function appendToHistory(search) {
	if (searchHistory.indexOf(search) !== -1) {
		return;
	}

	searchHistory.push(search);

	localStorage.setItem('search-history', JSON.stringify(searchHistory));
	renderSearchHistory();
}

export function initSearchHistory() {
	const storedHistory = localStorage.getItem('search-history');
	if (storedHistory) {
		searchHistory = JSON.parse(storedHistory);
	}
	renderSearchHistory();
}
