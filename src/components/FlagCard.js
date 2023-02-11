import { Container, Box, Text } from "theme-ui"
import {Collapse} from 'react-collapse';
import { useCallback, useState, useEffect } from "react";
import { countryInfoQuery } from "@/queries/countriesQuery";
import axios from "axios";
export default function FlagCard({name, emoji, code, childIndex}) {
    const [showInfo, setShowInfo] = useState(false)
    const [countryCode, setCountryCode] = useState(code)
    const [countryInfo, setCountryInfo] = useState({})

    const toggleShowInfo = (e) => {
        setShowInfo(!showInfo);
        console.log(showInfo)
    }

const countryInfoListString = (list) => {
    return list.map((item => item))
}
 const getCountryInfo = useCallback(() => {
                if(showInfo){
                const query = JSON.stringify(countryInfoQuery(countryCode));
                axios.post("https://countries.trevorblades.com/graphql", query,{headers: {"Content-Type": "application/json"}})
                .then((response) => {
                    var countryInfoRes = response.data.data.country;
                    var countryInfoLanguages = [];
                    var countryInfoStates = []
                    countryInfoRes.languages.forEach(language => {
                        countryInfoLanguages.push(language.name)
                    });
                    countryInfoRes.states.forEach(state => {
                        countryInfoStates.push(state.name)
                    });
                    countryInfoRes.languages = countryInfoLanguages;
                    countryInfoRes.states = countryInfoStates;
                    countryInfoRes.continent = countryInfoRes.continent.name;
                    setCountryInfo(countryInfoRes);
                 })
                .catch((error) => console.log(error))

}}, [showInfo])
            useEffect(() => {
                getCountryInfo();
                return () => {
                    // cleanup
                };
            }, [showInfo]); 

    const containerStyles = {
        position: 'relative',
        maxWidth: '200px',
        minHeight: '200px',
        width: 1,
        height: 3,
        borderWidth: 'normal',
        borderStyle: 'solid',
        borderColor: 'secondary',
        borderRadius: 'normal',
        fontFamily: 'heading',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 3,
        boxShadow: '0px 0px 3px -1px',
        zIndex: showInfo?'0':'1',
        
    }
    const emojiContainerStyles = {
        width: '100%',
        textAlign: 'center',
        fontSize: 5,
        zIndex: showInfo?'0':'1',
        // height: 
        // borderWidth: 'thin',
        // borderStyle: 'solid',
        // borderColor: 'muted',

    }
    const innerContainerStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: '1',
        // justifyContent: 'center',

    }
    const popoutStyles = {
        position: 'absolute',
        borderWidth: 'normal',
        // borderStyle: 'solid',
        borderColor: 'red',
        borderRadius: 'normal',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        top: '-10%',
        zIndex: showInfo?'1':'0',
        display: showInfo? 'block': 'none',
        opacity: '1',
        backgroundColor: 'highlight',
        height: '120%'
    }
    const innerPopoutStyles = {
        clear: 'both',
        alignSelf: 'center',
        borderWidth: 'normal',
        // borderStyle: 'solid',
        // borderColor: 'primary',
        borderRadius: 'normal',
        textAlign: 'center',
        zIndex: '0',
        fontFamily: 'info',
        fontSize: 2
    }
    console.log(countryInfo)
    return (
        <Box sx={containerStyles} onClick={toggleShowInfo}>
        <Container sx={innerContainerStyles}>
            <Box sx={emojiContainerStyles}>
            <Text >{emoji}</Text>
            </Box>
            <Text>{name}</Text>
        </Container>
        <Container sx={popoutStyles}>
        <Container sx={innerPopoutStyles}>
            <Text>{`Native Name:  ${countryInfo.native}`}<br/></Text>
            <Text>{`Phone Code:  +${countryInfo.phone}`}<br/></Text>
            <Text>{`Continent:  ${countryInfo.continent}`}<br/></Text>
            <Text>{`Capital:  ${countryInfo.capital}`}<br/></Text>
            <Text>{`Currency:  ${countryInfo.currency}`}<br/></Text>
            <Text>{countryInfo.languages && countryInfo.languages.length > 0 && `Languages: ${countryInfoListString(countryInfo.languages.slice(0, 2))}`} </Text>
            <Text>{countryInfo.states && countryInfo.states.length > 0 && `States: ${countryInfoListString(countryInfo.states.slice(0, 2))}`} </Text>
            

        </Container>
        </Container>
        </Box>
    )
}