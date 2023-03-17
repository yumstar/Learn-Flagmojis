import { getLearnerPaths, getData, getLearnerInfo } from "@/utils/api"
import AppBody from "@/components/AppBody";
import { Container, Box, Button, Text } from "theme-ui";
import Link from "next/link";
import { accountInfoComponentStyles } from "@/styles/PageLearnerStyles";
import PersonalInfo from "@/components/PersonalInfo";
import ScoreInfo from "@/components/ScoreInfo";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";
export default function LearnerInfoContainer({ userDataObj }) {
  const [copyText, setCopyText] = useState({
    copyMessage: "",
    copyEmoji: ""
  });
  const [showCopyText, setShowCopyText] = useState(false);
  const onTextCopy = () => {
    setCopyText(
      {
        copyMessage: "Copied!",
        copyEmoji: "📋"
      }
    )
    setShowCopyText(true);
    const timeoutId = setTimeout(() => { setShowCopyText(false) }, 2000)
  }
  return (
    <Box className="learner-page">
      <Box className="learner-info" sx={accountInfoComponentStyles} >
      <PersonalInfo name={userDataObj.name} email={userDataObj.email} />
      <ScoreInfo name={userDataObj.name} email={userDataObj.email} />
      <Box className="account-action-buttons" sx={{ width: '100%', textAlign: 'center' }}>
        <Link href="/"><Button variant="primary" sx={{ mr: 3 }}>Back to Flags</Button></Link>
        <Box className="share-link" sx={{ display: "inline" }}>
          <CopyToClipboard text={`${process.env.NEXT_PUBLIC_HOSTNAME}/learner/${userDataObj.id}`} onCopy={onTextCopy}>
            <Button variant="primary">Share Link</Button>
          </CopyToClipboard>
          <Box className="copy-message" sx={{ display: "inline", mx: 2 }}>
            <Text sx={{ fontFamily: "body", display: showCopyText ? "inline" : "none" }}>{copyText.copyMessage}</Text>
            <Text sx={{ fontFamily: "emoji", display: showCopyText ? "inline" : "none" }}>{copyText.copyEmoji}</Text>
          </Box>
        </Box>
      </Box>
      </Box>
    </Box>
  )
}