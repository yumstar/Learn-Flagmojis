import { questionTypes } from "@/enums/questionTypes";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { countryAttributeQuery } from "@/queries/countriesQuery";
import { createQuestionStatement } from "@/questions/createQuestionStatement";
const handler = async(req, res) => {
    if(req.method == 'POST') {
        const client = new ApolloClient({
            uri: 'https://countries.trevorblades.com/graphql',
            cache: new InMemoryCache(),
          });
    const id = req.body.id
    const queryEmojiRes = await client.query(countryAttributeQuery(id, "emoji"));
    const emoji = queryEmojiRes.data.country["emoji"]
    console.log(emoji)
    var questionsChosen = [];
    let questions;
    var queriesMade = 0;
   while(questionsChosen.length < 5 && queriesMade < 20) {
        const typeNum = Math.floor(Math.random(0, 8) * 8);
        const type = questionTypes.get(typeNum);
        const typeString = type.key
        if(!questionsChosen.find(questionType => {return questionType.type == typeString})) {
            // console.log(typeString)
            await client.query(countryAttributeQuery(id, typeString)).then((res) => {
                var resData = res.data.country[typeString];
                var resDataDataType = typeof resData
                if(resDataDataType != 'undefined' && resData !== null) {
                    switch(resDataDataType){
                        case "string":
                            questionsChosen.push({type: typeString, question: createQuestionStatement(typeString, emoji), answer: resData})
                        case "object":
                            if(Array.isArray(resData)){
                                var hasNonNullItems = resData.length > 0;
                                resData.forEach((item) => {
                                    hasNonNullItems = hasNonNullItems && !(typeof item  == 'undefined' || item == null) 
                                })
                                if(hasNonNullItems) questionsChosen.push({type: typeString, question: createQuestionStatement(typeString, emoji),answer: resData}) 
                            }
                            else {
                                resData = resData["name"]
                                resDataDataType = typeof resData
                                if(resDataDataType != 'undefined' && resData !== null) questionsChosen.push({type: typeString, question: createQuestionStatement(typeString, emoji), answer: resData})
                            }
                        default:
                    }
                }
            })
        }
        queriesMade++;
    }
    questions = 
    res.status(200).send(questionsChosen)
}
}

export default handler