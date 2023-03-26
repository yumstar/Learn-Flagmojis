import { Text, Box } from "theme-ui"
import { accountInfoValueStyles, scoreCountryStyles } from "@/styles/accountStyles"
import { addCountry, getCountryAttributes } from "@/features/countriesSlice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState, useCallback } from "react"
import { selectCountries, selectError, selectErrorMessage } from "@/features/countriesSlice"

export default function CountryScore({score}) {
    const [country, setCountry] = useState({});
    const [emoji, setEmoji] = useState("")
    const dispatch = useDispatch()
    const countries = useSelector(selectCountries)
    // const error = useSelector(selectError)
    // const errorMessage = useSelector(selectErrorMessage)
    useEffect(() => {
        if(!countries.find(country => country.code == score.countryCode)){
            dispatch(addCountry(score.countryCode))
        }
        const index = countries.findIndex(country => country.code == score.countryCode)
        setCountry(countries[index])
        const getEmoji = async() => {
            await dispatch(getCountryAttributes(score.countryCode, ["emoji"])).then(() => {
                if(country){
                    setEmoji(country.emoji)
                }
            })
    }
    getEmoji()


}, [country, emoji]);
    return (<>
    <Box sx={scoreCountryStyles}>
    <Text variant="emoji" sx={{margin: 1, fontSize: 3}}>{emoji? emoji:score.countryCode}:</Text>
    <Text sx={{...accountInfoValueStyles, fontSize: 3}}>{score.score} / {score.totalQuestions}</Text>
    </Box>
    </>
    )
}