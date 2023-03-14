import AppBody from "@/components/AppBody";
import { useRouter } from "next/router";
import QuizResultBox from "@/components/QuizResultBox";
import { Container, Text, Button } from "theme-ui";
import { quizResultPageStyles, quizResultSubmissionContainerStyles } from "@/styles/quizStyles";
import Link from "next/link";
export default function ResultPage() {
const router = useRouter();
const {quizCode, quizScore, quizTotal} = router.query; 
   return (<AppBody>
    <Container sx={quizResultPageStyles}>
    <Container sx={quizResultSubmissionContainerStyles}>
    <Text variant="heading" sx={{m: 3}}>Submission Results</Text>
    
    {quizCode && quizScore && quizTotal?<QuizResultBox quizCode={quizCode} quizScore={quizScore} quizTotal={quizTotal}/>:<Text variant="body">Oops! There was an error retrieving scores</Text>}
    <Link href={"/"}><Button>Back To Flags</Button></Link>
    </Container>
    </Container>
    </AppBody>)
}