import { Container, Box, Text } from "theme-ui"
import {Collapse} from 'react-collapse';
import { useCallback, useState, useEffect } from "react";
import { countryInfoQuery } from "@/queries/countriesQuery";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {selectExpanded, selectLast, selectCurrent, noneExpandedOpen, someExpandedOpen, someExpandedClose } from "@/features/GridSlice";
export default function FlagCard({name, emoji, code, childIndex}) {
    const [showInfo, setShowInfo] = useState(false)
    const [countryCode, setCountryCode] = useState(code)
    const [countryInfo, setCountryInfo] = useState({})
    const dispatch = useDispatch()
    const expanded = useSelector((state) => state.grid.itemExpanded)
    const lastExpanded = useSelector((state) => state.grid.lastItemExpanded)
    const currentExpanded = useSelector((state) => state.grid.currentItemExpanded)

    const toggleShowInfo = (e) => {
        console.log("exp" + expanded)
        console.log("last" + lastExpanded)
        console.log(currentExpanded)
        if(currentExpanded == -1 && !expanded) {
            dispatch(noneExpandedOpen(childIndex))
            setShowInfo(true)
        }
        else if(currentExpanded == childIndex && expanded) {
            dispatch(someExpandedClose())
            setShowInfo(false)
        }
        // if(lastExpanded == childIndex){
        //     setShowInfo(false)
        // }
        else if(currentExpanded != childIndex && expanded){
            dispatch(noneExpandedOpen(childIndex))
        }
        if(lastExpanded == childIndex && expanded) {
            setShowInfo(false)
        }
        
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
        // boxShadow: '0px 0px 3px -1px',
        zIndex: '0',
        
    }
    const emojiContainerStyles = {
        width: '100%',
        textAlign: 'center',
        fontSize: 5,
        zIndex: '0'
        // height: 
        // borderWidth: 'thin',
        // borderStyle: 'solid',
        // borderColor: 'muted',

    }
    const innerContainerStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 0,
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
        zIndex: '1',
        display: showInfo? 'block': 'none',
        opacity: '1',
        backgroundColor: 'highlight',
        height: '120%',
        width: '160%'
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
        fontSize: 3
    }
    const labelStyles = {
        fontWeight: 'bold'
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
           {countryInfo.native && <Box><Text sx={labelStyles}>Native Name:</Text> <Text>{`${countryInfo.native}`}<br/></Text></Box>}
           {countryInfo.phone && <Box><Text sx={labelStyles}>Phone Code:</Text> <Text>{`${countryInfo.phone}`}<br/></Text></Box>}
           {countryInfo.continent && <Box><Text sx={labelStyles}>Continent:</Text> <Text>{`${countryInfo.continent}`}<br/></Text></Box>}
           {countryInfo.capital && <Box><Text sx={labelStyles}>Capital:</Text> <Text>{`${countryInfo.capital}`}<br/></Text></Box>}
           {countryInfo.currency && <Box><Text sx={labelStyles}>Currency:</Text> <Text>{`${countryInfo.currency}`}<br/></Text></Box>}
           {countryInfo.languages && countryInfo.languages.length > 0  && <Box><Text sx={labelStyles}>Languages:</Text> <Text>{`${countryInfoListString(countryInfo.languages.slice(0, 2))}`}<br/></Text></Box>}
           {countryInfo.languages && countryInfo.states.length > 0  && <Box><Text sx={labelStyles}>States:</Text> <Text>{`${countryInfoListString(countryInfo.states.slice(0, 2))}`}<br/></Text></Box>}
           {<Text>{currentExpanded}<br/></Text>}
           {<Text>{lastExpanded}</Text>}
        </Container>
        </Container>
        </Box>
    )
}