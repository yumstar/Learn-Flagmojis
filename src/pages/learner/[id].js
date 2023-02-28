import { getLearnerPaths, getData, getLearnerInfo } from "@/utils/api"
import AppBody from "@/components/AppBody";
import { Container, Box } from "theme-ui";
import { Learner } from "@/server/models/LearnerModel";
import { accountInfoComponentStyles } from "@/styles/PageLearnerStyles";
import PersonalInfo from "@/components/PersonalInfo";
import LearnerInfoContainer from "@/components/LearnerInfoContainer";
export default function LearnerInfo({learnerId, userDataObj }) {
    return (
    <AppBody>
      <LearnerInfoContainer userDataObj={userDataObj}/>
    </AppBody>)
}

export async function getStaticPaths() {
  const ids = await getLearnerPaths();
  // console.log(ids)
  const paths =  ids.map((id) => {
    return {
      params: {
        id
      }
    }
  })
  return {
    paths,
    fallback: false,
  };
  // return ids;
}

export async function getStaticProps({ params }) {
  const learnerId = params.id
   let userData = await getLearnerInfo(learnerId);
   let userDataObj = userData.toJSON();
   delete userDataObj["password"]
   userDataObj = {...userDataObj, _id: userDataObj._id.toString()}
   return {
    props: {
      learnerId,
      userDataObj
    }
   }
  }