import { Container, Box, Text } from "theme-ui"
import { scoreInfoContainerStyles, scoreListStyles, scoreCountryStyle, accountInfoHeadingContainerStyles, accountInfoLabelStyles, accountInfoStyles, accountInfoValueStyles } from "@/styles/accountStyles"
import { useSelector, useDispatch } from "react-redux";
import { selectToken, selectLoaded, selectScores, loadToken, selectTokenLoaded, getScores } from "@/features/quizScoresSlice";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import CountryScore from "./CountryScore";
export default function ScoreInfo({name, email}) {
    const [quizScores, setQuizScores] = useState([])
    const dispatch = useDispatch()
    const userToken = useSelector(selectToken)
    const tokenLoaded = useSelector(selectTokenLoaded)
    const loaded = useSelector(selectLoaded)
    const scores = useSelector(selectScores)
    useEffect(() => {
        if(!tokenLoaded){
            dispatch(loadToken())
        }
    }, []);
    useEffect(() => {
        const getQuizScores = async() =>{
            dispatch(getScores())
        }
        if(tokenLoaded){
            getQuizScores();
        }
    }, [])

    useEffect(() => {
        if(loaded){
            setQuizScores(scores)
        }
        
    }, [scores])
    return (
    <>
        <Box className="score-info" sx={scoreInfoContainerStyles}>
        <Container className="score-info-heading" sx={accountInfoHeadingContainerStyles}>
        <Text variant="cardHeading" sx>Quiz Scores</Text>
        </Container>
        <Container sx={accountInfoStyles}>
        <Box sx={scoreListStyles}>
            {quizScores.length < 1 && <Text variant="body">No scores to display yet!</Text>}
            {quizScores.length > 0 && quizScores.map((score, index) => {return <CountryScore key={index} score={score} sx={scoreCountryStyle} />})}
        </Box>
        </Container>
        </Box>
    </>
    )
    
}