// import { allCountriesNamedInfoQuery } from '@/queries/countriesQuery';
// const {allCountriesNamedInfoQuery} = require("../queries/countriesQuery")
const { fetch } = require('cross-fetch')
const mongoose = require('mongoose');
const dotenv = require('dotenv')
// const { Question } = require("../server/models/QuestionModel")
const {ApolloClient, HttpLink,  InMemoryCache, ApolloProvider, gql } = require("@apollo/client")
// import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
dotenv.config()
const allCountriesNamedInfoQuery = () => {
    return {
        query: gql`
        query queryAllCountriesNamedInfo{
            countries {
               name
               code
               native
               phone
               continent {
                 name
               }
               capital
               currency
               languages {
                 name
               }
               states {
                 name
               }
             }
           }
        `
    }
  }

  

  const questionSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true
    },
    answerType: {
        type: String,
        required: true,
    }
})

const countrySchema = new mongoose.Schema({
  code: {
      type: String,
      required: true,
  }
})


const countryQuestionListSchema = new mongoose.Schema({
  country: {
      type: countrySchema,
      required: true,
  },
  list: [questionSchema]
})

const Question = mongoose.model('Question', questionSchema)
const Country = mongoose.model('Country', countrySchema)
const CountryQuestionList = mongoose.model('CountryQuestionList', countryQuestionListSchema)

mongoose.connect(process.env.LEARN_DB_URI).then(async (res) => {
  if (res.connections[0].readyState) {
    const client = new ApolloClient({
      link: new HttpLink({ uri: 'https://countries.trevorblades.com/graphql', fetch }),
      cache: new InMemoryCache(),
    });
    var countriesInfo = []
    await client.query(allCountriesNamedInfoQuery()).then(async (res) => {
      countriesInfo = res.data.countries;
      // console.log(countriesInfo)
      for (var i = 0; i < countriesInfo.length; i++) {
        var currentCountry = countriesInfo[i]
        var countryModel = await queryCountry(currentCountry)
        if (!countryModel) {
          countryModel = await CountryQuestionList.create({ country: { code: currentCountry.code } })
        }
        var questionList = countryModel.list
        // console.log(questionList)
        var fields = Object.getOwnPropertyNames(currentCountry).filter(field => field != '__typename' && field != 'code')
        const countryCode = currentCountry["code"];
        for (var j = 0; j < fields.length; j++) {

          const field = fields[j]
          var answer = currentCountry[field];
          var answerDataType = typeof answer;
          if (answerDataType != 'undefined' && answer != null) {

            switch (answerDataType) {
              case "string":
                if (questionList.find((question) => question.code == countryCode && question.type == field)) {
                  const questionIndex = questionList.findIndex((question) => { question.code == countryCode && question.type == field })
                  questionList[questionIndex] = { ...questionList[questionIndex], type: answerDataType }
                }
                else {
                  questionList.push({ code: countryCode, type: field, answerType: answerDataType })
                }
                // countryModel.findOneAndUpdate({'country.code': countryCode}, {list: [...countryModel.list, {code: countryCode, type: field, answerType: answerDataType}]});
                break;
              case "object":
                if (Array.isArray(answer)) {
                  var hasNonNullItems = answer.length > 0
                  answer.forEach((item) => {
                    hasNonNullItems = hasNonNullItems && !(typeof item == 'undefined' || item == null) && !(typeof item['name'] == 'undefined' || item['name'] == null)
                  })
                  if (hasNonNullItems) {
                    if (questionList.find((question) => question.code == countryCode && question.type == field)) {
                      const questionIndex = questionList.findIndex((question) => { question.code == countryCode && question.type == field })
                      questionList[questionIndex] = { ...questionList[questionIndex], type: "array" }
                    }
                    else {
                      questionList.push({ code: countryCode, type: field, answerType: "array" })
                    }
                  }
                }
                else {
                  answer = answer["name"]
                  const objAnswerDataType = typeof answer
                  if (objAnswerDataType != 'undefined' && answer != null) {
                    if (questionList.find((question) => question.code == countryCode && question.type == field)) {
                      const questionIndex = questionList.findIndex((question) => { question.code == countryCode && question.type == field })
                      questionList[questionIndex] = { ...questionList[questionIndex], type: answerDataType }
                    }
                    else {
                      questionList.push({ code: countryCode, type: field, answerType: answerDataType })
                    }
                  }
                }
                break;

            }
          }

          // console.log(answer)
        }
        await CountryQuestionList.findOneAndUpdate({'country.code': countryCode}, {list: questionList})
      }
      process.exit()
    })


    // Question.find({})
  }
}
)

const queryCountry = async (country) => {
  try{
    const countryCode = country.code
    const countryInfo = await CountryQuestionList.findOne({'country.code': countryCode}).exec()
    return countryInfo
  }
  catch(error) {
    console.log(error)
  }

}