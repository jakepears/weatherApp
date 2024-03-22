/** @format */

import { fetchCoords } from './fetch.js';
import { initSearchHistory } from './search.js';

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const todayContainer = document.querySelector('#today');
const forecastContainer = document.querySelector('#forecast');

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

initSearchHistory();
searchForm.addEventListener('submit', handleSearchFormSubmit);
searchHistoryContainer.addEventListener('click', handleSearchHistoryClick);
