import { getLearnerPaths, getData, getLearnerInfo } from "@/utils/api"
import AppBody from "@/components/AppBody";
import { Container } from "theme-ui";
import http from 'http'
import { Learner } from "@/server/models/LearnerModel";
import PersonalInfo from "@/components/AccountInfo";
export default function LearnerInfo({ learnerId, userDataObj }) {
    return (
    <AppBody>
        <Container>
          <PersonalInfo name={userDataObj.name} email={userDataObj.email}/>
        </Container>
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
   const learnerId = params.id;
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