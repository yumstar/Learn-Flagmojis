import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
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
        query queryCountryInfo{
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

export const countryAttributeQuery = (id, attribute) => {
  let attributeFragment;
  switch(attribute) {
    case 'emoji':
    case 'name':
    case 'native':
    case 'capital':
    case 'currency':
    case 'phone':
      attributeFragment = `${attribute}`
      break;
    case "continent": case "states": case "languages":
      attributeFragment = `${attribute} {
        name
      }`
      break;
    default:
      attributeFragment = "code"
  }
  const fullQuery = `
  query queryCountryAttribute {
    country(code: "${id}") {
      ${attributeFragment}
    }
  }
  `
  return {query: gql`${fullQuery}` }
}