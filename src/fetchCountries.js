export function fetchCountries(countryName) {
  const BASE_URL = 'https://restcountries.com/v2/';
  return fetch(
    `${BASE_URL}/name/${countryName}?fields=name,capital,population,flags,languages`
    // 'https://restcountries.com/v2/name/ukraine?fields=name.official,capital,population,flags.svg,languages'
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  });
}
// export default { fetchCountries };
