import "./css/styles.css";
import { fetchCountries } from "./js/fetchCoutries";
import debounce from "lodash.debounce";
import { Notify } from "notiflix";

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector("#search-box");
const countryInfo = document.querySelector(".country-info");
const countryList = document.querySelector(".country-list");

const clearMarkup = (event) => (event.innerHTML = "");

const showCountryInfo = (country) => {
	return country.map(
		({ name, capital, population, flags, languages }) =>
			`<img src="${flags.png}" alt="${name.official}" width="200" height="100">
      <h1>${name.official}</h1>
      <p>Capital: ${capital}</p>
      <p>Population: ${population}</p>
      <p>Languages: ${Object.values(languages)}</p>`,
	);
};

const showCountriesList = (country) => {
	return country
		.map(
			({ name, flags }) =>
				`<li><img src="${flags.png}" alt="${name.official}" width="60" height="40">${name.official}</li>`,
		)
		.join("");
};

const renderMarkup = (data) => {
	if (data.length === 1) {
		clearMarkup(countryList);
		const markupInfo = showCountryInfo(data);
		countryInfo.innerHTML = markupInfo;
	} else {
		clearMarkup(countryInfo);
		const markupList = showCountriesList(data);
		countryList.innerHTML = markupList;
	}
};

const trimInput = (event) => {
	const textInput = searchBox.value.trim();
	if (!textInput) {
		clearMarkup(countryInfo);
		clearMarkup(countryList);
		return;
	}
	fetchCountries(textInput)
		.then((data) => {
			console.log(data);
			if (data > 10) {
				Notify.info(
					"Too many matches found. Please enter a more specific name",
				);
				return;
			}
			renderMarkup(data);
		})
		.catch((error) => {
			clearMarkup(countryList);
			clearMarkup(countryInfo);
			Notify.failure("Oops, there is no country with that name");
		});
};
searchBox.addEventListener("input", debounce(trimInput, DEBOUNCE_DELAY));
