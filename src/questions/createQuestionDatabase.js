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
      for(var i = 0; i < countriesInfo.length; i++){
        var currentCountry = countriesInfo[i]
       var countryInfo = await queryCountry(currentCountry)
       if(!countryInfo){
       await CountryQuestionList.create({country: {code: currentCountry.code}})
       }
      //  console.log(country)
      }
      // countriesInfo.forEach(queryCountry)
      process.exit()
    })


    // Question.find({})
  }
}
)

const queryCountry = async (country) => {
  try{
    const codename = country.code
    const countryInfo = await CountryQuestionList.findOne({'country.code': codename}).exec()
    return countryInfo
    // .then((doc) => {
    //   // console.log(doc)
    // })
    // console.log(countryInfo)  
  }
  catch(error) {
    console.log(error)
  }

}
// const createQuestionDatabase = async() => {
//     const client = new ApolloClient({
//       link: new HttpLink({uri: 'https://countries.trevorblades.com/graphql', fetch}),
//         cache: new InMemoryCache(),
//       });

// client.query(allCountriesNamedInfoQuery()).then((res) => console.log(res.data))
// }


// module.exports = createQuestionDatabase