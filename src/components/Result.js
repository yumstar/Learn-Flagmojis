import { Box, Text } from "theme-ui";
import { quizResultStyles } from "@/styles/quizStyles";
import { addCountry, getCountryAttributes, selectCountries } from "@/features/countriesSlice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState, useCallback } from "react"
export default function Result({quizCode, quizTotal, quizScore}) {
    const [country, setCountry] = useState({});
    const [emoji, setEmoji] = useState("")
    const dispatch = useDispatch()
    const countries = useSelector(selectCountries)
    useEffect(() => {
        if(!countries.find(country => country.code == quizCode)){
            dispatch(addCountry(quizCode))
        }
        const index = countries.findIndex(country => country.code == quizCode)
        setCountry(countries[index])
        const getEmoji = async() => {
            await dispatch(getCountryAttributes(quizCode, ["emoji"])).then(() => {
                console.log(country)
                if(country){
                    setEmoji(country.emoji)
                }
            })
    }
    getEmoji()
}, [country, emoji]);
    return (
    <Box className="quiz-result" sx={quizResultStyles}>
    <Text sx={{mt: 1, mb: 3, fontSize: 4}}>{emoji? emoji: quizCode}</Text>
    {quizTotal&& quizScore && <Text sx={{fontFamily: 'body'}}>{quizScore} / {quizTotal}</Text>}
    </Box>
    )
}