import { Container, Box, Text, Spinner, Button } from "theme-ui"
import {Collapse} from 'react-collapse';
import { useCallback, useState, useEffect } from "react";
import { countryInfoQuery } from "@/queries/countriesQuery";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import styles from "@/theme";
import { keyframes } from '@emotion/react'
import Link from "next/link";
import {selectExpanded, selectLast, selectCurrent, noneExpandedOpen, someExpandedOpen, someExpandedClose, changeCurrent } from "@/features/gridSlice";
export default function FlagCard({name, emoji, code, childIndex}) {
    const [showInfo, setShowInfo] = useState(false)
    const [countryCode, setCountryCode] = useState(code)
    const [countryInfo, setCountryInfo] = useState({})
    const dispatch = useDispatch()
    // const expanded = useSelector((state) => state.grid.itemExpanded)
    // const lastExpanded = useSelector((state) => state.grid.lastItemExpanded)
    const currentExpanded = useSelector((state) => state.grid.currentItemExpanded)

    const toggleShowInfo = (e) => {
        if(currentExpanded != childIndex) {
            dispatch(changeCurrent(childIndex))
        }
        else {
            dispatch(changeCurrent(-1))
        }
        
    }

    useEffect(() => {
        setShowInfo(currentExpanded == childIndex)
    }, [currentExpanded])

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
        minWidth: '175px',
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
        // boxShadow: '0px 0px 3px -1px',
        zIndex: '0',
        
    }
    const emojiContainerStyles = {
        width: '100%',
        textAlign: 'center',
        fontSize: 5,
        zIndex: '0',

    }
    const innerContainerStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 0,
        textAlign: 'center'
        // justifyContent: 'center',

    }
    const fadeIn = keyframes({ from: { opacity: 0 }, to: { opacity: 1 } })
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
        zIndex: '1',
        display: showInfo? 'block': 'none',
        opacity: '1',
        backgroundColor: 'highlight',
        height: '120%',
        width: '120%',
        animation: `${fadeIn} 1s`
        // transition: 'opacity 4s'
    }
    
    const popoutCloseStyles = {
        ...popoutStyles,
        animation: `${fadeIn} 1s reverse`
    }
    const innerPopoutStyles = {
        clear: 'both',
        alignSelf: 'center',
        borderWidth: 'normal',
        // borderStyle: 'solid',
        // borderColor: 'primary',
        borderRadius: 'normal',
        textAlign: 'center',
        zIndex: '50',
        fontFamily: 'info',
        fontSize: 2,
        opacity: '1',
    }
    const labelStyles = {
        fontWeight: 'bold'
    }
    return (
        <Box sx={containerStyles} onClick={toggleShowInfo}>
        <Container sx={innerContainerStyles}>
            <Box sx={emojiContainerStyles}>
            <Text variant="emoji">{emoji}</Text>
            </Box>
            <Text>{name}</Text>
        </Container>
        <Container sx={showInfo? popoutStyles: popoutCloseStyles}>
        <Container sx={innerPopoutStyles}>
           {Object.keys(countryInfo).length == 0 && <Spinner sx={{color: 'accent'}}/>}     
           {countryInfo && countryInfo.native && <Box><Text sx={labelStyles}>Native Name:</Text> <Text>{`${countryInfo.native}`}<br/></Text></Box>}
           {countryInfo && countryInfo.continent && <Box><Text sx={labelStyles}>Continent:</Text> <Text>{`${countryInfo.continent}`}<br/></Text></Box>}
           {countryInfo && countryInfo.states && countryInfo.states.length > 0  && <Box><Text sx={labelStyles}>States:</Text> <Text>{`${countryInfoListString(countryInfo.states.slice(0, 3))}`}<br/></Text></Box>}
           {countryInfo && countryInfo.capital && <Box><Text sx={labelStyles}>Capital:</Text> <Text>{`${countryInfo.capital}`}<br/></Text></Box>}
           {countryInfo && countryInfo.languages && countryInfo.languages.length > 0  && <Box><Text sx={labelStyles}>Languages:</Text> <Text>{`${countryInfoListString(countryInfo.languages.slice(0, 3))}`}<br/></Text></Box>}
           {countryInfo && countryInfo.currency && <Box><Text sx={labelStyles}>Currency:</Text> <Text>{`${countryInfo.currency}`}<br/></Text></Box>}
           {countryInfo && countryInfo.phone && <Box><Text sx={labelStyles}>Phone Code:</Text> <Text>{`+${countryInfo.phone}`}<br/></Text></Box>}
           {countryInfo && <Box><Button><Link href={`/quizzes/country/${code}`}>Quiz me!</Link></Button></Box>}
          
        </Container>
        </Container>
        </Box>
    )
}