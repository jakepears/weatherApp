/** @format */
import { appendToHistory } from './index.js';
import renderItems from './render.js';

const weatherApiUrl = 'https://api.openweathermap.org';
const apiKey = '5e2a14f24b3c957bf999f79c03a70840';

function fetchWeather(location) {
	const lat = location;
	const lon = location;
	const city = location.name;

	const apiUrl = `${weatherApiUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

	fetch(apiUrl)
		.then(function (res) {
			return res.json();
		})
		.then(function (data) {
			renderItems(city, data);
		})
		.catch(function (err) {
			console.error(err);
		});
}

export function fetchCoords(search) {
	const apiUrl = `${weatherApiUrl}/geo/1.0/direct?q=${search}&limit=5&appid=${apiKey}`;

	fetch(apiUrl)
		.then(function (res) {
			return res.json();
		})
		.then(function (data) {
			if (!data[0]) {
				alert('Location not found');
			} else {
				appendToHistory(search);
				fetchWeather(data[0]);
			}
		})
		.catch(function (err) {
			console.error(err);
		});
}
