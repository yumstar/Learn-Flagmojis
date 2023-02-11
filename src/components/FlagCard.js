import { Container, Box, Text } from "theme-ui"
import {Collapse} from 'react-collapse';
import { useState } from "react";
export default function FlagCard(props) {
    const [showInfo, setShowInfo] = useState(false)
    const toggleShowInfo = (e) => {
        setShowInfo(!showInfo);
        console.log(showInfo)
    }
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
        borderStyle: 'solid',
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
        borderStyle: 'solid',
        borderColor: 'primary',
        borderRadius: 'normal',
        zIndex: '0'
    }
    return (
        <Box sx={containerStyles} onClick={toggleShowInfo}>
        <Container sx={innerContainerStyles}>
            <Box sx={emojiContainerStyles}>
            <Text >{props.emoji}</Text>
            </Box>
            <Text>{props.name}</Text>
        </Container>
        {props.childIndex == 0 &&<Container sx={popoutStyles}>
        <Container sx={innerPopoutStyles}>
        <Collapse isOpened="true">
            <div>c</div>
        </Collapse>
        </Container>
        </Container>}
        </Box>
    )
}