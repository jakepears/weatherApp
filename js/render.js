/** @format */

// Function to display the current weather data fetched from OpenWeather api.
function renderCurrentWeather(city, weather) {
	const date = dayjs().format('M/D/YYYY');
	// Store response data from our fetch request in constiables
	const tempF = weather.main.temp;
	const windMph = weather.wind.speed;
	const humidity = weather.main.humidity;
	const iconUrl = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
	const iconDescription = weather.weather[0].description || weather[0].main;

	const card = document.createElement('div');
	const cardBody = document.createElement('div');
	const heading = document.createElement('h2');
	const weatherIcon = document.createElement('img');
	const tempEl = document.createElement('p');
	const windEl = document.createElement('p');
	const humidityEl = document.createElement('p');

	card.setAttribute('class', 'card');
	cardBody.setAttribute('class', 'card-body');
	card.append(cardBody);

	heading.setAttribute('class', 'h3 card-title');
	tempEl.setAttribute('class', 'card-text');
	windEl.setAttribute('class', 'card-text');
	humidityEl.setAttribute('class', 'card-text');

	heading.textContent = `${city} (${date})`;
	weatherIcon.setAttribute('src', iconUrl);
	weatherIcon.setAttribute('alt', iconDescription);
	weatherIcon.setAttribute('class', 'weather-img');
	heading.append(weatherIcon);
	tempEl.textContent = `Temp: ${tempF}°F`;
	windEl.textContent = `Wind: ${windMph} MPH`;
	humidityEl.textContent = `Humidity: ${humidity} %`;
	cardBody.append(heading, tempEl, windEl, humidityEl);

	todayContainer.innerHTML = '';
	todayContainer.append(card);
}

// Function to display a forecast card given an object from open weather api
// daily forecast.
function renderForecastCard(forecast) {
	// constants for data from api
	const iconUrl = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
	const iconDescription = forecast.weather[0].description;
	const tempF = forecast.main.temp;
	const humidity = forecast.main.humidity;
	const windMph = forecast.wind.speed;

	// Create elements for a card
	const col = document.createElement('div');
	const card = document.createElement('div');
	const cardBody = document.createElement('div');
	const cardTitle = document.createElement('h5');
	const weatherIcon = document.createElement('img');
	const tempEl = document.createElement('p');
	const windEl = document.createElement('p');
	const humidityEl = document.createElement('p');

	col.append(card);
	card.append(cardBody);
	cardBody.append(cardTitle, weatherIcon, tempEl, windEl, humidityEl);

	col.setAttribute('class', 'col-md');
	col.classList.add('five-day-card');
	card.setAttribute('class', 'card bg-primary h-100 text-white');
	cardBody.setAttribute('class', 'card-body p-2');
	cardTitle.setAttribute('class', 'card-title');
	tempEl.setAttribute('class', 'card-text');
	windEl.setAttribute('class', 'card-text');
	humidityEl.setAttribute('class', 'card-text');

	// Add content to elements
	cardTitle.textContent = dayjs(forecast.dt_txt).format('M/D/YYYY');
	weatherIcon.setAttribute('src', iconUrl);
	weatherIcon.setAttribute('alt', iconDescription);
	tempEl.textContent = `Temp: ${tempF} °F`;
	windEl.textContent = `Wind: ${windMph} MPH`;
	humidityEl.textContent = `Humidity: ${humidity} %`;

	forecastContainer.append(col);
}

// Function to display 5 day forecast.
function renderForecast(dailyForecast) {
	// Create unix timestamps for start and end of 5 day forecast
	const startDt = dayjs().add(1, 'day').startOf('day').unix();
	const endDt = dayjs().add(6, 'day').startOf('day').unix();

	const headingCol = document.createElement('div');
	const heading = document.createElement('h4');

	headingCol.setAttribute('class', 'col-12');
	heading.textContent = '5-Day Forecast:';
	headingCol.append(heading);

	forecastContainer.innerHTML = '';
	forecastContainer.append(headingCol);

	for (let i = 0; i < dailyForecast.length; i++) {
		// First filters through all of the data and returns only data that falls between one day after the current data and up to 5 days later.
		if (dailyForecast[i].dt >= startDt && dailyForecast[i].dt < endDt) {
			// Then filters through the data and returns only data captured at noon for each day.
			if (dailyForecast[i].dt_txt.slice(11, 13) == '12') {
				renderForecastCard(dailyForecast[i]);
			}
		}
	}
}

export function renderItems(city, data) {
	renderCurrentWeather(city, data.list[0], data.city.timezone);
	renderForecast(data.list);
}
