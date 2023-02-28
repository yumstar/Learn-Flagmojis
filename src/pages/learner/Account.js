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
        // return res;
    }
    useEffect(() => {
        getUserData()
        // .then((res) => {setuserData(res); console.log(res)})
        // setuserData(userDataRes)
        // console.log(userDataRes)
    }, []);
    return    ( <AppBody>
    <Box className="learner-page" sx={accountInfoComponentStyles} >
      {!userData && <Spinner sx={{color: 'accent'}}/>}
      {userData && <LearnerInfoContainer userDataObj={userData}/>}

    </Box>
</AppBody>)
}