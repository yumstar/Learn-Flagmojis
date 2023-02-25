import { getLearnerPaths } from "@/utils/api"
import AppBody from "@/components/AppBody";
import { Container } from "theme-ui";
export default function Learner({ learnerId }) {
    return (
    <AppBody>
        <Container>
        <p>learnerId</p>
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
   return {
    props: {
      learnerId
    }
   }
  }