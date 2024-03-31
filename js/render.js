/** @format */

const forecastContainer = document.querySelector('#forecast');

function renderCurrentWeather(city, weather) {
	const date = dayjs().format('M/D/YYYY');
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

function renderForecastCard(forecast) {
	const iconUrl = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
	const iconDescription = forecast.weather[0].description;
	const tempF = forecast.main.temp;
	const humidity = forecast.main.humidity;
	const windMph = forecast.wind.speed;

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

	cardTitle.textContent = dayjs(forecast.dt_txt).format('M/D/YYYY');
	weatherIcon.setAttribute('src', iconUrl);
	weatherIcon.setAttribute('alt', iconDescription);
	tempEl.textContent = `Temp: ${tempF} °F`;
	windEl.textContent = `Wind: ${windMph} MPH`;
	humidityEl.textContent = `Humidity: ${humidity} %`;

	forecastContainer.append(col);
}

function renderForecast(dailyForecast) {
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
		if (dailyForecast[i].dt >= startDt && dailyForecast[i].dt < endDt) {
			if (dailyForecast[i].dt_txt.slice(11, 13) == '12') {
				renderForecastCard(dailyForecast[i]);
			}
		}
	}
}

export default function renderItems(city, data) {
	if (data && data.list && data.list.length > 0) {
		renderCurrentWeather(city, data.list[0], data.city.timezone);
		renderForecast(data.list);
	} else if (data && data.cod === '400') {
		const error = document.createElement('div');
		error.setAttribute('class', 'alert alert-danger');
		error.setAttribute('role', 'alert');
		error.textContent = data.message;
		forecastContainer.innerHTML = '';
		forecastContainer.append(error);
		error.addEventListener('click', () => {
			forecastContainer.innerHTML = '';
		});
	} else {
		console.error('Invalid weather data:', data);
		// Handle the case when the weather data is invalid or missing
		const error = document.createElement('div');
		error.setAttribute('class', 'alert alert-danger');
		error.setAttribute('role', 'alert');
		error.textContent = 'Invalid weather data';
		forecastContainer.innerHTML = '';
		forecastContainer.append(error);
		error.addEventListener('click', () => {
			forecastContainer.innerHTML = '';
		});
	}
}
