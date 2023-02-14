export const countriesQuery = () => {
    return {
        query: `
        query queryCountries{
            countries  {
              code
              name
              emoji
            }
          }
        `}
}

export const countryInfoQuery = (id) => {
    return {
        query: `
        query queryCountriesInfo{
            country(code: "${id}")  {
               code
               native
               phone
               continent {
                 name
               }
               capital
               currency
               languages {
                 name
               }
               states {
                 name
               }
             }
           }
        `
    }
}