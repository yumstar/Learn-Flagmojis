import AppBody from '@/components/AppBody'
import { useRouter } from 'next/router'
import { sendApi } from '@/utils/api'
import { useState, useEffect } from 'react'
import { Container, Spinner } from 'theme-ui'
import Quiz from '@/components/Quiz'
export default function CountryQuiz({}) {
    const [questions, setQuestions] = useState([])
    const router = useRouter()
    const { code } = router.query

    const generateQuestions = async() => {
      return sendApi({"id": code}, "/api/questions/generateCountryQuestions")
    // return []
    }

    useEffect(() => {
        generateQuestions()
        .then((questionsRes) => {
            setQuestions(questionsRes.data)
        })
    }, []);
    console.log(questions)
    return (<AppBody>
        <Container>
            {questions.length == 0 && <Spinner></Spinner>}
            {questions.length > 0  && <Quiz code={code} questions={questions} markURI="/api/questions/markCountryQuestions"></Quiz>}
        </Container>
    </AppBody>)
}