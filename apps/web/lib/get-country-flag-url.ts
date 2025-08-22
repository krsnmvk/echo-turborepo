export function getCountryFlagUrl(countryCode?: string) {
  return `https://flagcdn.com/w40/${countryCode?.toLowerCase()}.png`;
}
