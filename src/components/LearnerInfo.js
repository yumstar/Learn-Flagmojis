import { getLearnerPaths, getData, getLearnerInfo } from "@/utils/api"
import AppBody from "@/components/AppBody";
import { Container, Box, Button } from "theme-ui";
import Link from "next/link";
import { accountInfoComponentStyles } from "@/styles/PageLearnerStyles";
import PersonalInfo from "@/components/AccountInfo";
export default function LearnerInfo({ learnerId, userDataObj }) {
    return (
        <Box className="learner-page" sx={accountInfoComponentStyles} >
          <PersonalInfo name={userDataObj.name} email={userDataObj.email}/>
          <Link href="/"><Button variant="primary">Back to Flags</Button></Link>
        </Box>
    )
}