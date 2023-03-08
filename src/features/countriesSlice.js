import { createSlice, current } from '@reduxjs/toolkit'
import { sendApi } from '@/utils/api'
import { countryMultiAttributeFetchQuery } from '@/queries/countriesQuery'
import { countryAttributeSplitter } from '@/queryParsers/countryQueryParsers'
import axios from 'axios'
export const countriesSlice = createSlice({
    name: 'countries',
    initialState: {
        countries: [],
        error: false,
        errorMessage: ""
    },
    reducers: {
        addCountry: (state, action) => {
            state.error = false;
            const id = action.payload
            if(!state.countries.find((country) => country.code == id)){
                state.countries = [...state.countries, {code: id}]
            
            }
            else {
                state.error = true
                state.errorMessage = "Error: country already exist in list"
            }
        },
        addAttributes: (state, action) => {
            state.error = false;
            var errorAttributes = [];
            try{
                // const countryList = [...state.countries]
                const countryIndex = state.countries.findIndex((country) => country.code == action.payload.id)
                if(countryIndex > -1){
                    const targetCountry = state.countries[countryIndex]
                    const countryCopy = {...targetCountry}
                  
                    const attributes = action.payload.attributes;
                    console.log(countryCopy)
                    attributes.forEach((attribute) => {
                        const attributeExists = countryCopy.hasOwnProperty(attribute.name)
                        if(!attributeExists){
                            countryCopy[attribute.name] = attribute.value
                            console.log(countryCopy)
                            var updatedCountries = state.countries.map((country, index) => index == countryIndex? {...countryCopy}: country)
                            state.countries = updatedCountries;
                        }
                        else {
                            errorAttributes.push(attribute.name);
                        }
                    })
                    if(errorAttributes.length > 0){
                        let attributeMessages = "";
                        attributeErrors.forEach((attribute) => {
                            attributeMessages = `Error: attribute ${attribute.name} already exists for country in local state
                            `
                        })
                        state.error = true;
                        state.errorMessage = attributeMessages
                    }

                }
                else {
                    state.error = true
                    state.errorMessage = "Error: country could not be found"
                }
            }
            catch(error) {
                state.error = true;
                state.errorMessage = error.message
            } 

        }
    }
    
})
export const { addCountry, addAttributes } = countriesSlice.actions

export const selectCountries = (state) => state.countries.countries
export const selectError = (state) => state.countries.error
export const selectErrorMessage = (state) => state.countries.errorMessage

export const getCountryAttributes = (country, attributes) => async (dispatch) => {
    const query = JSON.stringify(countryMultiAttributeFetchQuery(country, attributes));
    const resData = await axios.post("https://countries.trevorblades.com/graphql", query, {headers: {"Content-Type": "application/json"}});
    const countryData = resData.data.data.country
    const fields = countryAttributeSplitter(countryData)
    dispatch(addAttributes({id: country, attributes: fields}))
}

export default countriesSlice.reducer