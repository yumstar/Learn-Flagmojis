/** @jsxImportSource theme-ui */
import { useRouter } from "next/router"
import {quizInitValues, signUpInitValues, signUpValidationSchema} from "../utils/validation"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { Box, Text, Label, Button, Message,} from "theme-ui"
import "@/styles/Quiz.module.css"
import * as quizStyles from "@/styles/quizStyles"
import { sendApi } from "@/utils/api"
import { useState, useEffect } from "react"
import _ from "lodash"
export default function Quiz({code, questions, markURI}) {
    const [displayQuestion, setDisplayQuestion] = useState({});
    const [displayIndex, setDisplayIndex] = useState(0)
    const [messageType, setMessageType] = useState("");
    const [valueSelected, setValueSelected] = useState("")
    const router  = useRouter()
    useEffect(() => {
        moveQuestion(0)
    }, []);
    const moveQuestion = (index) => {
        setDisplayIndex(index);
        setDisplayQuestion(questions[index])
        setValueSelected(displayQuestion.isMultiAnswer? []: "")
    }
    const moveNextQuestion = () => {
        if(displayIndex < (questions.length - 1)) {
            moveQuestion(displayIndex + 1)
        }
    }
    const movePreviousQuestion = () => {
        if(displayIndex > 0) {
            moveQuestion(displayIndex - 1)
        }
    }
    const createAnswerFields = (question) => {
        const answers = question.answers;
        const type = question.type;
        if(answers && type){
            return answers.map((answer, index) => {return (<Box key={index} sx={valueSelected == answer?quizStyles.questionOptionBoxCheckedStyles : quizStyles.questionOptionBoxStyles}><Label sx={quizStyles.questionOptionStyles}>
                <Field type={question.isMultiAnswer? "checkbox": "radio"} name={displayQuestion.type} value={answer} onClick={(e) => setValueSelected(answer)} sx={quizStyles.questionOptionFieldStyles}/>
                {answer}
            </Label></Box>)})
        }
        else {
            throw console.error("question does not have answers or a type");
        } 
    }
    const handleSubmit = async (values) =>{
      try{
        const submission = {}
        if(code){
            submission["id"] = code
        }
        let valueEntries = Object.entries(values)
        submission["questions"] = []
        for (var [key, value] of valueEntries) {
            if(questions.find((question) => question.type == key)){
                submission["questions"].push({"type": key, "answer": value})
            }
            
        }
        const results = await sendApi(submission, markURI)
        const resultsList = results.data.resultsMarked
        var total = resultsList.length;
        var score = 0;
        for(var i = 0; i < resultsList.length; i++){
            const result = resultsList[i];
            score += result.currentAttemptScore;
        }
        router.push({
            pathname: "/quizzes/quiz/Result/",
            query: {quizCode: code, quizScore: score, quizTotal: total}
        }, "/quizzes/quiz/Result/")
        }
        

      catch(error) {
        console.log("error submitting answers")
      }
      
      
    }
    return ( <Box className="quiz-container" sx={quizStyles.QuizFormContainerStyles}>
         
      <div className="quiz" sx={quizStyles.QuizFormOuterStyles}>
        <Formik
          initialValues={quizInitValues(questions)}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form sx={quizStyles.QuizFormStyles}>
             {displayQuestion && displayQuestion.question && <Message sx={quizStyles.questionBoxStyles}><Text className="question-emoji" sx={quizStyles.questionEmojiStyles}>📖</Text><Text className="question-text" sx={quizStyles.questionTextStyles}>{displayQuestion.question}</Text></Message>}
             <Box className="question-options" sx={quizStyles.questionOptionsBoxStyles}>
             {displayQuestion.answers && createAnswerFields(displayQuestion)}
             </Box>
            <Box className="question-nav-container" sx={quizStyles.questionNavContainer}>
                <Button variant="secondary" type="button" onClick={movePreviousQuestion} sx={quizStyles.questionNavButtons}>Prev</Button>
                <Text sx={quizStyles.questionNavIndex}>{(displayIndex + 1) + "/" + questions.length}</Text>
                {displayIndex < (questions.length - 1) && <Button variant="secondary" type="button" onClick={moveNextQuestion} sx={quizStyles.questionNavButtons}>Next</Button>}
                {displayIndex === (questions.length - 1) && _.isEqual(displayQuestion, questions[(questions.length - 1)]) && <Button variant="submit" type="submit" onClick={handleSubmit}sx={quizStyles.questionNavButtons}>Submit</Button>}
            </Box>
            
          </Form>
    )
          }
        </Formik>
      </div>
      </Box>
    )
}