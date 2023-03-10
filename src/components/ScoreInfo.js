import { Container, Box, Text } from "theme-ui"
import { scoreInfoContainerStyles, accountInfoHeadingContainerStyles, accountInfoLabelStyles, accountInfoStyles, accountInfoValueStyles } from "@/styles/accountStyles"
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
        if(tokenLoaded && !loaded){
            getQuizScores();
        }
    }, [userToken])

    useEffect(() => {
        console.log(loaded)
        if(loaded){
            setQuizScores(scores)
        }
        
    }, [loaded])
    console.log(quizScores)
    return (
    <>
        <Box className="score-info" sx={scoreInfoContainerStyles}>
        <Container className="score-info-heading" sx={accountInfoHeadingContainerStyles}>
        <Text variant="cardHeading" sx>Quiz Scores</Text>
        </Container>
        <Container sx={accountInfoStyles}>
        <Box>
            {quizScores.length < 1 && <Text variant="body">No scores to display yet!</Text>}
            {quizScores.length > 0 && quizScores.map((score, index) => {return <CountryScore key={index} score={score} />})}
        </Box>
        {/* <Box>
            <Text sx={accountInfoLabelStyles}>Learner:</Text>
            <Text sx={accountInfoValueStyles}>{name}</Text>
        </Box>
        <Box>
            <Text sx={accountInfoLabelStyles}>Email:</Text>
            <Text sx={accountInfoValueStyles}>{email}</Text>
        </Box> */}
        </Container>
        </Box>
    </>
    )
    
}