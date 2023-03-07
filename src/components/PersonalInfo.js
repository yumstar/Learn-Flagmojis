import { Container, Box, Text } from "theme-ui"
import { personalInfoContainerStyles, accountInfoHeadingContainerStyles, accountInfoLabelStyles, accountInfoStyles, accountInfoValueStyles } from "@/styles/accountStyles"
export default function AccountInfo({name, email}) {
    return (
    <>
        <Box className="account-info" sx={personalInfoContainerStyles}>
        <Container className="account-info-heading" sx={accountInfoHeadingContainerStyles}>
        <Text variant="cardHeading" sx>Account Info</Text>
        </Container>
        <Container sx={accountInfoStyles}>
        <Box>
            <Text sx={accountInfoLabelStyles}>Learner:</Text>
            <Text sx={accountInfoValueStyles}>{name}</Text>
        </Box>
        <Box>
            <Text sx={accountInfoLabelStyles}>Email:</Text>
            <Text sx={accountInfoValueStyles}>{email}</Text>
        </Box>
        </Container>
        </Box>
    </>
    )
    
}