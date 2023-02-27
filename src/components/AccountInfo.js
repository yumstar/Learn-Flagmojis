import { Container, Text } from "theme-ui"
export default function AccountInfo({name, email}) {
    return (
    <>
        <Container>
        <Text>{name}</Text>
        <Text>{email}</Text>
        </Container>
    </>
    )
    
}