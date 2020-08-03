let totalElem = document.getElementById("total"),
	recoveredElem = document.getElementById("recovered"),
	activeElem = document.getElementById("active"),
	deathElem = document.getElementById("deaths"),
	countryElem = document.getElementById("country"),
	countriesElem = document.getElementById("countries"),
	tbl = document.getElementById("covid-table"),
	globalCount = document.getElementById("global-count"),
	numbersElem = document.getElementsByClassName("numbers");

// Automatically loads Ghana's Covid-19 when page loads
window.onload = () => {
	getCountryData("Ghana");
};

countriesElem.addEventListener("change", function () {
	getCountryData(this.value);
});

//fetch covid-19 data for a specific country
function getCountryData(country) {
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			let data = JSON.parse(xhr.response);
			let cty = data.Countries.filter((c) => c.Country === country);
			if (cty == undefined || cty == null) {
				return countryNotFound(cty);
			}
			populateCountriesList(data);
			displayCountryData(cty);
			populateTable(data);
		}
	};

	xhr.open("GET", "https://api.covid19api.com/summary", true);
	xhr.send();
}

function displayCountryData(data) {
	countryElem.innerText = `${data[0].Country}'s Stats`;
	totalElem.innerText = data[0].TotalConfirmed;
	recoveredElem.innerText = data[0].TotalRecovered;
	deathElem.innerText = data[0].TotalDeaths;
	activeElem.innerText = data[0].NewConfirmed;
}

function countryNotFound(cty) {
	countryElem.innerText = `Country (${cty[0].Country}) not found!`;
	countryElem.style.color = "red";
}

function populateTable(data) {
	let { Countries: c } = data,
		i = 1;
	tbl.innerHTML = c.map(
		(d) =>
			`
            <tr>
                <td>${i++}</td>
                <td>${d.Country}</td>
                <td>${d.TotalRecovered}</td>
                <td>${d.TotalConfirmed}</td>
                <td>${d.NewConfirmed}</td>
                <td>${d.TotalDeaths}</td>
            </tr>
            `
	);
	globalCount.innerText = `(${i})`;
}

function populateCountriesList(data) {
	let list = data.Countries.map((c) => c.Country);
	countriesElem.innerHTML = list.map(
		(c) => `<option value="${c}">${c}</option>`
	);
}
