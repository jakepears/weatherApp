/** @format */

import { fetchCoords } from './fetch.js';

let searchHistory = [];
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const todayContainer = document.querySelector('#today');
const searchHistoryContainer = document.querySelector('#history');

dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

function handleSearchFormSubmit(e) {
	if (!searchInput.value) {
		return;
	}

	e.preventDefault();
	const search = searchInput.value.trim();
	fetchCoords(search);
	searchInput.value = '';
}

function handleSearchHistoryClick(e) {
	if (!e.target.matches('.btn-history')) {
		return;
	}

	const btn = e.target;
	const search = btn.getAttribute('data-search');
	fetchCoords(search);
}

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

export function appendToHistory(search) {
	if (searchHistory.indexOf(search) !== -1) {
		return;
	}

	searchHistory.push(search);

	localStorage.setItem('search-history', JSON.stringify(searchHistory));
	renderSearchHistory();
}

function initSearchHistory() {
	const storedHistory = localStorage.getItem('search-history');
	if (storedHistory) {
		searchHistory = JSON.parse(storedHistory);
	}
	renderSearchHistory();
}

initSearchHistory();
searchForm.addEventListener('submit', handleSearchFormSubmit);
searchHistoryContainer.addEventListener('click', handleSearchHistoryClick);
