import connectToDB from "@/server/utils/connectDB"
import jwt from "jsonwebtoken";
import { QuestionResult } from "@/server/models/QuestionResultModel";
import { Learner } from "@/server/models/LearnerModel";
import { getCookie } from "cookies-next";
import { CountryQuestionList } from "@/server/models/CountryQuestionListModel";
const handler = async (req, res) => {
    if(req.method == 'GET'){
        try{
            const userToken = getCookie("userToken", {req, res});
            let userEmail;
            jwt.verify(userToken, process.env.PRIVATE_KEY, async (err, decoded) => {
                if(err){
                    return res.status(400).send({message: "Invalid token"})
                }
                const userId = decoded.id;
                
                await Learner.findOne({_id: userId}).then((learner) => {
                    userEmail = learner.email
                })
                .catch((error) => {return res.status(400).json({message: "Error authenticating user"}) })
                var questionResults = await QuestionResult.find({user: userEmail})
                if(questionResults){
                    var scores = [];
                    questionResults.forEach((result) => {
                        const code = result.question.code;
                        const country = scores.find((country) =>  country.countryCode == code && typeof country.score == 'number');
                        if(country){
                            const index = scores.indexOf(country);
                            scores[index] = {...country, score: (country.score + result.result)}
                        }
                        else {
                            scores.push({countryCode: code, score: result.result})
                        }
                    })
                    for(var i = 0; i < scores.length; i++){
                        const code = scores[i].countryCode;
                        var questionListLength = ((await CountryQuestionList.findOne({'country.code': code})).list).length
                        scores[i] = {...scores[i], totalQuestions: questionListLength}
                    }
                    const sortedScores = scores.sort((score1, score2) => {
                        if(score1.countryCode < score2.countryCode) {
                            return -1;
                        }
                        else if(score1.countryCode > score2.countryCode){
                            return 1;
                        }
                        else {
                            return 0;
                        }
                    })
                   res.status(200).send(sortedScores)

                }
                else {
                    res.status(500).send({message: 'Error retrieving results for user'})
                }

                
            })
        }
        catch(error) {
            res.status(400).send(error.message)
        }
   
        
    }
    else {
        res.status(400).send("Invalid request type")
    }
}

export default connectToDB(handler)