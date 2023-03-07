import { Text } from "theme-ui"
import { accountInfoValueStyles } from "@/styles/accountStyles"
export default function CountryScore({score}) {
    return (<>
    <Text sx={{margin: 1}}>{score.countryCode}:</Text>
    <Text sx={accountInfoValueStyles}>{score.score} / {score.totalQuestions}</Text>
    </>
    )
}