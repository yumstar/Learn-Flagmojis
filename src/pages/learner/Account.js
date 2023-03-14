import { Box, Spinner } from "theme-ui"
import AppBody from "@/components/AppBody"
import { accountInfoComponentStyles } from "@/styles/PageLearnerStyles"
import { useState, useEffect } from "react";
import LearnerInfoContainer from "@/components/LearnerInfoContainer";
import { getData } from "@/utils/api";
export default function Account(props) {
    const [userData, setuserData] = useState(null);
    const getUserData = async() => {
        const res = await getData("/api/learner/LearnerRead");
        setuserData(res)
    }
    useEffect(() => {
        getUserData()
    }, []);
    return    ( <AppBody>
    <Box className="learner-page">
      {!userData && <Spinner sx={{color: 'accent', display: 'block', margin: 'auto'}}/>}
      {userData && <LearnerInfoContainer userDataObj={userData}/>}

    </Box>
</AppBody>)
}