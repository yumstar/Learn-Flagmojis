import { countryCodesQuery } from '@/queries/countriesQuery';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

export const createQuestionStatement = (type, flag) => {
    switch(type) {
        case "name": case 0: 
            return `What is the name in English for ${flag}?`
            break;
        case "native": case 1:
            return `What is the native name of ${flag}?`
             break;
        case "continent": case 0:
            return `Which continent does ${flag} lie on?`
             break;
        case "states": case 3:
        return `Which of the following are states or provinces of ${flag}? Select all that apply.`
        break;
        case "capital": case 4:
        return `What's the name of the capital of ${flag}?`
            break;
        case "languages": case 5:
            return `Which of the following are languages primarly spoken in ${flag}? Select all that apply.`
            break;
        case "currency": case 6:
            return `What currency is used in ${flag}?`
            break;
        case "phone": case 7:
            return `What phone code(s) do phone numbers from ${flag} use?`
            break;
        default:
            return ""
    }
}
