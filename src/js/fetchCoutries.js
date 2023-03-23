const fetchCountries = (name) => {
	const url = "https://restcountries.com/v3.1/name";
	const properties = "fields=name,capital,population,flags,languages";

	return fetch(`${url}/${name}?${properties}`).then((response) => {
		if (!response.ok) {
			throw new Error(response.status);
		}
		return response.json();
	});
};

export { fetchCountries };
