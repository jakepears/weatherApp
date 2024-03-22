/** @format */

let searchHistory = [];
const searchHistoryContainer = document.querySelector('#history');

function renderSearchHistory() {
	searchHistoryContainer.innerHTML = '';

	for (let i = searchHistory.length - 1; i >= 0; i--) {
		const btn = document.createElement('button');
		btn.setAttribute('type', 'button');
		btn.setAttribute('aria-controls', 'today forecast');
		btn.classList.add('history-btn', 'btn-history');

		btn.setAttribute('data-search', searchHistory[i]);
		btn.textContent = searchHistory[i];
		searchHistoryContainer.append(btn);
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
