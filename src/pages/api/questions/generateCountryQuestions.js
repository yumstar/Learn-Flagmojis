import { questionTypes } from "@/enums/questionTypes";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { countryAttributeQuery } from "@/queries/countriesQuery";
const handler = async(req, res) => {
    if(req.method == 'POST') {
        const client = new ApolloClient({
            uri: 'https://countries.trevorblades.com/graphql',
            cache: new InMemoryCache(),
          });
    var typesChosen = []
    var queriesMade = 0;
   while(typesChosen.length < 5 && queriesMade < 20) {
        const typeNum = Math.floor(Math.random(0, 8) * 8);
        const type = questionTypes.get(typeNum);
        const typeString = type.key
        if(!typesChosen.includes(typeString)) {
            // console.log(typeString)
            await client.query(countryAttributeQuery(req.body.id, typeString)).then((res) => {
                var resData = res.data.country[typeString];
                var resDataDataType = typeof resData
                if(resDataDataType != 'undefined' && resData !== null) {
                    switch(resDataDataType){
                        case "string":
                            typesChosen.push(typeString)
                        case "object":
                            if(Array.isArray(resData)){
                                var hasNonNullItems = resData.length > 0;
                                resData.forEach((item) => {
                                    hasNonNullItems = hasNonNullItems && !(typeof item  == 'undefined' || item == null)

                                })
                                if(hasNonNullItems) typesChosen.push(typeString) 
                            }
                            else {
                                resData = resData["name"]
                                resDataDataType = typeof resData
                                if(resDataDataType != 'undefined' && resData !== null) typesChosen.push(typeString)
                            }
                        default:
                    }
                }
            })
        }
        queriesMade++;
    }
    res.status(200).send(typesChosen)
}
}

export default handler