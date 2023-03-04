import { questionTypes } from "@/enums/questionTypes";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { countryAttributeQuery, countryNamedInfoQuery, countryMultiAttributeQuery } from "@/queries/countriesQuery";
const handler = async(req, res) => {
    if(req.method == 'POST') {
    try{
        var userToken;
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
                                results.push({code: id, type: question.type, points: question.answer == answer? 1: 0})
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
                                    results.push({code: id, type: question.type, points: (correctAnswers / numAwardableAnswers) })
                                };
                            }
                            else {
                                answer = answer["name"]
                                answerDataType = typeof answer
                                if (answerDataType != 'undefined' && answer !== null && !results.find((result) => result.type == question.type)) {
                                    // options.push(resData)
                                    results.push({code: id, type: question.type, points: question.answer == answer? 1: 0})
                                    
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
        res.status(200).send(results)
       
    }
    catch(error) {
        res.status(400).send({message: "Error"})
    }


    
    // const queryEmojiRes = await client.query(countryAttributeQuery(id, "emoji"));
    // const emoji = queryEmojiRes.data.country["emoji"]

//    while(questionsChosen.length < 5 && queriesMade < 20) {
//         const typeNum = Math.floor(Math.random(0, 8) * 8);
//         const type = questionTypes.get(typeNum);
//         const typeString = type.key
//         if(!questionsChosen.find(questionType => {return questionType.type == typeString})) {
//             // console.log(typeString)
//             await client.query(countryAttributeQuery(id, typeString)).then((res) => {
//                 var resData = res.data.country[typeString];
//                 var resDataDataType = typeof resData
//                 if(resDataDataType != 'undefined' && resData !== null) {
//                     switch(resDataDataType){
//                         case "string":
//                             questionsChosen.push({type: typeString, question: createQuestionStatement(typeString, emoji), answer: resData})
//                         case "object":
//                             if(Array.isArray(resData)){
//                                 var hasNonNullItems = resData.length > 0;
//                                 resData.forEach((item) => {
//                                     hasNonNullItems = hasNonNullItems && !(typeof item  == 'undefined' || item == null) 
//                                 })
//                                 if(hasNonNullItems) questionsChosen.push({type: typeString, question: createQuestionStatement(typeString, emoji),answer: resData.map((answer) => answer["name"])}); 
//                             }
//                             else {
//                                 resData = resData["name"]
//                                 resDataDataType = typeof resData
//                                 if(resDataDataType != 'undefined' && resData !== null) questionsChosen.push({type: typeString, question: createQuestionStatement(typeString, emoji), answer: resData})
//                             }
//                         default:
//                     }
//                 }
//             })
//         }
//         queriesMade++;
//     }
//     questions = 
    // res.status(200).send(questionsChosen)
}
}

export default handler