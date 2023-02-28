import { getLearnerPaths, getData, getLearnerInfo } from "@/utils/api"
import AppBody from "@/components/AppBody";
import { Container, Box, Button } from "theme-ui";
import Link from "next/link";
import { accountInfoComponentStyles } from "@/styles/PageLearnerStyles";
import PersonalInfo from "@/components/PersonalInfo";
import {CopyToClipboard} from "react-copy-to-clipboard";
export default function LearnerInfoContainer({ userDataObj }) {
    return (
        <Box className="learner-page" sx={accountInfoComponentStyles} >
          <PersonalInfo name={userDataObj.name} email={userDataObj.email}/>
          <Link href="/"><Button variant="primary" sx={{mr: 3}}>Back to Flags</Button></Link>
          <CopyToClipboard text={`${process.env.NEXT_PUBLIC_HOSTNAME}/learner/${userDataObj.id}`}>
          <Button variant="primary">Share Link</Button>
          </CopyToClipboard>
        </Box>
    )
}