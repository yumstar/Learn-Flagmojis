import { getLearnerPaths, getData, getLearnerInfo } from "@/utils/api"
import AppBody from "@/components/AppBody";
import { Container, Box, Button, Text } from "theme-ui";
import Link from "next/link";
import { accountInfoComponentStyles } from "@/styles/PageLearnerStyles";
import PersonalInfo from "@/components/PersonalInfo";
import ScoreInfo from "@/components/ScoreInfo";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";
import { Tooltip } from 'react-tooltip'
export default function LearnerInfoContainer({ userDataObj }) {

  return (
    <Box className="learner-page">
      <Box className="learner-info" sx={accountInfoComponentStyles} >
      <PersonalInfo name={userDataObj.name} email={userDataObj.email} />
      <ScoreInfo name={userDataObj.name} email={userDataObj.email} />
      <Box className="account-action-buttons" sx={{ width: '100%', textAlign: 'center' }}>
        <Link href="/"><Button variant="primary" sx={{ mr: 3 }}>Back to Flags</Button></Link>
        <Box className="share-link" sx={{ display: "inline" }}>
          <CopyToClipboard text={`${process.env.NEXT_PUBLIC_HOSTNAME}/learner/${userDataObj.id}`}>
            <Button variant="primary" data-tooltip-id="copy-tooltip" data-tooltip-content="Copied! 📋">Share Link</Button>
          </CopyToClipboard>
          <Tooltip id="copy-tooltip" openOnClick/>
        </Box>
      </Box>
      </Box>
    </Box>
  )
}