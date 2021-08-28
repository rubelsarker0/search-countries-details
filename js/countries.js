const getCountries = async () => {
	try {
		const url = `https://restcountries.eu/rest/v2/all`;
		const response = await fetch(url);
		const data = await response.json();
		displayCountries(data);
	} catch (error) {
		console.log(error);
	}
};

getCountries();

const displayCountries = (countries) => {
	const displayAllCountries = document.getElementById('display-all-countries');

	for (const country of countries) {
		const div = document.createElement('div');
		div.className = 'card mb-2 cursor-pointer';
		div.setAttribute('onclick', `getSpecificCountry('${country.name}')`);
		div.innerHTML = generateHTML(country);
		displayAllCountries.appendChild(div);
	}
};

const getUserCountry = () => {
	const inputField = document.getElementById('user-country');
	getSpecificCountry(inputField.value.toLowerCase());
	inputField.value = '';
};

const getSpecificCountry = async (name) => {
	try {
		const url = `https://restcountries.eu/rest/v2/name/${name}`;
		const response = await fetch(url);
		const data = await response.json();
		displaySpecificCountry(data[0]);
	} catch (error) {
		console.log(error);
	}
};

const displaySpecificCountry = (country) => {
	const displayCountry = document.getElementById('display-country');
	displayCountry.textContent = '';
	const div = document.createElement('div');
	div.className = 'card mb-2';
	div.innerHTML = generateHTML(country);
	displayCountry.appendChild(div);
};

const generateHTML = (country) => {
	return `
	<div class="row g-0">
		<div class="col-md-5">
			<img src="${country.flag}" class="img-fluid rounded-start" alt="country-flag" style="
			padding: 50px">
		</div>
		 <div class="col-md-7">
			<div class="card-body">
				<h5 class="card-title">${country.name}</h5>
				<ul>
				<li>Capital: ${country.capital}</li>
					<li>Area:${country.area}</li>
					<li>Population: ${country.population}</li>
					<li>Region: ${country.region}</li>
					<li>Time-Zone: ${country.timezones[0]}</li>
				</ul>
			</div>
		</div>
	</div>`;
};
