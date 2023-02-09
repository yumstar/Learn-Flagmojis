import { Container, Image, Text } from "theme-ui"
export default function FlagCard(props) {
    const containerStyles = {
        maxWidth: '200px',
        minHeight: '200px',
        width: 1,
        height: 3,
        borderWidth: 'thin',
        borderStyle: 'solid',
        borderColor: 'muted',
        borderRadius: 'normal',
        fontFamily: 'body',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
    const emojiContainerStyles = {
        width: '100%',
        textAlign: 'center',
        fontSize: 5,
        // height: 
        // borderWidth: 'thin',
        // borderStyle: 'solid',
        // borderColor: 'muted',

    }
    return (
        <Container sx={containerStyles} >
            <Container sx={emojiContainerStyles}>
            <Text>{props.emoji}</Text>
            </Container>
            <Text>{props.name}</Text>
        </Container>
    )
}