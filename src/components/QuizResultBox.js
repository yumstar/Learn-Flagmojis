import Result from "./Result";
import { Box, Text } from "theme-ui";
import { quizResultBoxStyles } from "@/styles/quizStyles";
export default function QuizResultBox(props) {
    return (<>
    <Box className="quiz-result-box" sx={quizResultBoxStyles}>
        <Result {...props}></Result>
    </Box>
    </>)
}