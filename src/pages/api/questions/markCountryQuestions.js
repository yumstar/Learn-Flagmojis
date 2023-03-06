import { questionTypes } from "@/enums/questionTypes";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { countryAttributeQuery, countryNamedInfoQuery, countryMultiAttributeQuery } from "@/queries/countriesQuery";
import { CountryQuestionList } from "@/server/models/CountryQuestionListModel.js";
import { QuestionResult } from "@/server/models/QuestionResultModel";
import { Learner } from "@/server/models/LearnerModel";
import axios from "axios";
import connectToDB from "@/server/utils/connectDB";
import  jwt  from "jsonwebtoken";
import { getCookie, hasCookie } from "cookies-next"
const handler = async(req, res) => {
    if(req.method == 'POST') {
    try{
        // var userToken = req.body.token
        const userToken = getCookie("userToken", {req, res});
        var userEmail;
        jwt.verify(userToken, process.env.PRIVATE_KEY, async (err, decoded) => {
            if(err){
                return res.status(500).send({message: "Invalid token"})
            }
            const userId = decoded.id;
            
            await Learner.findOne({_id: userId}).then((learner) => {
                userEmail = learner.email
            })
            .catch((error) => {return res.status(400).json({message: "Error authenticating user"}) })
            // var userId = decoded.email
        })
        const id = req.body.id
        const questions = req.body.questions
        var givenQuestions = []
        var givenQuestionTypes = [];
        var results = []
        if(Array.isArray(questions)) {
            questions.forEach((question) => {
                if(!givenQuestionTypes.includes(question.type) && questionTypes.get(question.type)) {
                    givenQuestions.push(question)
                    givenQuestionTypes.push(question.type)
                }
            })
        }
        else {
            res.status(400).send({message: "Invalid question types"})
        }
        const client = new ApolloClient({
            uri: 'https://countries.trevorblades.com/graphql',
            cache: new InMemoryCache(),
          });
        var countryInfo;

        await client.query(countryMultiAttributeQuery(id, givenQuestionTypes))
        .then((res) => {
            countryInfo = res.data.country
        })
        

        // mark questions
        givenQuestions.forEach((question) => {
            try {
                let answer = countryInfo[question.type]
                let answerDataType = typeof answer
                if(answerDataType != 'undefined' && answer !== null) {
                    switch(answerDataType){
                        case "string":
                            if(!results.find((result) => result.type == question.type)){
                                results.push({learner: userEmail, code: id, type: question.type, points: question.answer == answer? 1: 0, givenAnswerType: answerDataType})
                            }
                            break;
                        case "object":
                            if (Array.isArray(answer)) {
                                var hasNonNullItems = answer.length > 0;
                                // resData = resData.slice(0, 3)
                                answer.forEach((item) => {
                                    hasNonNullItems = hasNonNullItems && !(typeof item == 'undefined' || item == null)
                                })
                                if (hasNonNullItems) {
                                    const answerList = answer.map((answer) => answer["name"]);
                                    const numAwardableAnswers = Math.min(3, answerList.length);
                                    if(!Array.isArray(question.answer)){
                                        res.status(400).send({message: "Given answers not in array format for multiple answer question"})
                                    }
                                    let correctAnswers = 0;
                                    question.answer.forEach((answer) => {
                                        if(answerList.find(correctAnswer => correctAnswer == answer)) correctAnswers++;
                                    })
                                    results.push({learner: userEmail, code: id, type: question.type, points: (correctAnswers / numAwardableAnswers), givenAnswerType: "array" })
                                };
                            }
                            else {
                                answer = answer["name"]
                                answerDataType = typeof answer
                                if (answerDataType != 'undefined' && answer !== null && !results.find((result) => result.type == question.type)) {
                                    // options.push(resData)
                                    results.push({learner: userEmail, code: id, type: question.type, points: question.answer == answer? 1: 0, givenAnswerType: "object"})
                                    
                                }
                            }
                        default:
                            break;
                    } 
                }

            }
            catch(error) {
               return res.status(500).send({message: "Error comparing given answers and correct answer"})
            }
        })
        var questionList = (await CountryQuestionList.findOne({'country.code': id})).list
        var resultsList = []
        for(var i = 0; i < results.length; i++){
            var currentResult = results[i];
            if(questionList.find(question => question.code == currentResult.code && question.type == currentResult.type  && question.answerType == currentResult.givenAnswerType)){
                var questionResult = await QuestionResult.findOne({user: userEmail, 'question.code': currentResult.code, 'question.type': currentResult.type, 'question.answerType': currentResult.givenAnswerType})
                if(questionResult){
                    const bestResult = questionResult.result;
                    if(currentResult.points > bestResult){
                        questionResult = await QuestionResult.findOneAndUpdate({user: userEmail, 'question.code': currentResult.code, 'question.type': currentResult.type, 'question.answerType': currentResult.givenAnswerType}, {result: currentResult.points})
                    }
                                   
                }
                else {
                    questionResult = await QuestionResult.create({user: userEmail, question: {code: currentResult.code, type: currentResult.type, answerType: currentResult.givenAnswerType}, result: currentResult.points})
                } 
                resultsList.push({user: userEmail, code: questionResult.question.code, type: questionResult.question.type})
            }
            else {
                res.status(400).send({message: "Invalid question type or answer type for country"})
            }
        }
        res.status(200).send({message: "Results have been marked and uploaded to the database.", resultsMarked: resultsList})
       
    }
    catch(error) {
        res.status(400).send(error.message)
    }
}
}

export default connectToDB(handler)