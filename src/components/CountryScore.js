import { Text } from "theme-ui"
import { accountInfoValueStyles } from "@/styles/accountStyles"
import { addCountry, getCountryAttributes } from "@/features/countriesSlice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { selectCountries, selectError, selectErrorMessage } from "@/features/countriesSlice"

export default function CountryScore({score}) {
    const [country, setCountry] = useState({});
    const [emoji, setEmoji] = useState("")
    const dispatch = useDispatch()
    const countries = useSelector(selectCountries)
    // const error = useSelector(selectError)
    // const errorMessage = useSelector(selectErrorMessage)
    useEffect(() => {
        console.log(countries)
        if(!countries.find(country => country.code == score.countryCode)){
            dispatch(addCountry(score.countryCode))
        }
        const getEmoji = async() => {
            dispatch(getCountryAttributes(score.countryCode, ["emoji"]))
        }
        getEmoji();
        const index = countries.findIndex(country => country.code == score.countryCode)
        setCountry(countries[index])
        setEmoji(country.emoji)
    }, []);
    console.log(emoji)
    return (<>
    <Text variant="emoji" sx={{margin: 1, fontSize: 3}}>{emoji.length > 0? emoji:score.countryCode}:</Text>
    <Text sx={{...accountInfoValueStyles, fontSize: 3}}>{score.score} / {score.totalQuestions}</Text>
    </>
    )
}