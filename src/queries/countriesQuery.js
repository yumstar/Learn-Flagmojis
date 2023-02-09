export const countriesQuery = () => {
    return {
        query: `
        query queryCountries{
            countries  {
              name
              emoji
            }
          }
        `}
}