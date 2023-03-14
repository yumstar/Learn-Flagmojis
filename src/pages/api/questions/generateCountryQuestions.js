import { questionTypes } from "@/enums/questionTypes";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { countryAttributeQuery, countryCodesQuery } from "@/queries/countriesQuery";
import { createQuestionStatement } from "@/questions/createQuestionAPI";
const handler = async (req, res) => {
    if (req.method == 'POST') {
        const client = new ApolloClient({
            uri: 'https://countries.trevorblades.com/graphql',
            cache: new InMemoryCache(),
        });
        const id = req.body.id
        const queryEmojiRes = await client.query(countryAttributeQuery(id, "emoji"));
        const emoji = queryEmojiRes.data.country["emoji"]
        console.log(emoji)
        var questionsChosen = [];
        var queriesMade = 0;
        var optionQueriesMade = 0;
        var codes;
        await client.query(countryCodesQuery()).then((res) => codes = res.data.countries);
        while (questionsChosen.length < 5 && queriesMade < 20) {
            const typeNum = Math.floor(Math.random(0, 8) * 8);
            const type = questionTypes.get(typeNum);
            const typeString = type.key
            var options = [];
            if (!questionsChosen.find(questionType => { return questionType.type == typeString })) {
                options = [];
                // console.log(typeString)
                await client.query(countryAttributeQuery(id, typeString)).then((res) => {
                    var resData = res.data.country[typeString];
                    var resDataDataType = typeof resData
                    if (resDataDataType != 'undefined' && resData !== null) {
                        
                        switch (resDataDataType) {
                            case "string":
                                options.push(resData);
                                break;
                            case "object":
                                if (Array.isArray(resData)) {
                                    var hasNonNullItems = resData.length > 0;
                                    resData = resData.slice(0, 3)
                                    resData.forEach((item) => {
                                        hasNonNullItems = hasNonNullItems && !(typeof item == 'undefined' || item == null)
                                    })
                                    if (hasNonNullItems) {
                                        options = resData.map((answer) => answer["name"]);
                                    };
                                }
                                else {
                                    resData = resData["name"]
                                    resDataDataType = typeof resData
                                    if (resDataDataType != 'undefined' && resData !== null) {
                                        options.push(resData)
                                    }
                                }
                                break;
                            default:
                                break;
                        }
                    }
                })
                
                while (options.length < 4 && optionQueriesMade < 60) {
                    const randomIndex = Math.floor(Math.random(0, codes.length) * codes.length);
                    const randomCode = codes[randomIndex].code;
                    if (randomCode == id) {
                        break;
                    }
                    else {
                        await client.query(countryAttributeQuery(randomCode, typeString)).then((optionRes) => {
                            var optionResData = optionRes.data.country[typeString];
                            var optionResDataDataType = typeof optionResData

                            if (optionResDataDataType != 'undefined' && optionResData !== null) {
                                if (options)
                                switch (optionResDataDataType) {
                                    case "string":
                                        if(!options.includes(optionResData)) {
                                            options.push(optionResData)
                                        }
                                        
                                        break;
                                    case "object":
                                        if (Array.isArray(optionResData)) {
                                            var hasNonNullItems = optionResData.length > 0;
                                            var optionResDataItem = optionResData[0]
                                            var isNonNullItems = hasNonNullItems && !(typeof optionResDataItem == 'undefined' ||  optionResDataItem == null)
                                            if (isNonNullItems) {
                                                // var answerList = resData.map((answer) => answer["name"]);
                                                optionResDataItem = optionResDataItem["name"]
                                                if(!options.includes(optionResDataItem)){
                                                    options.push(optionResDataItem)
                                                }
                                                
                                            };
                                        }
                                        else {
                                           optionResData = optionResData["name"]
                                            optionResDataDataType = typeof optionResData
                                            if (optionResDataDataType != 'undefined' && optionResData !== null && !options.includes(optionResData)) {
                                                options.push(optionResData)
                                            }
                                        }
                                        break;                                   
                                    default:
                                        break;
                                }
                            }

                        })

                    }
                    optionQueriesMade++;
                }

                const statement = createQuestionStatement(typeString, emoji);
                questionsChosen.push({ type: typeString, question: statement, answers: options, isMultiAnswer: (typeString == "states" || typeString == "languages")})
            }
            queriesMade++;
        }
        res.status(200).send(questionsChosen)
    }
}

export default handler
