import AppBody from "@/components/AppBody";
import { Text } from "theme-ui";
import { useRouter } from "next/router";
export default function Result() {
const router = useRouter();
const {quizCode, quizScore, quizTotal} = router.query; 
   return <AppBody>
        <Text>{quizCode}</Text>
        <Text>{quizScore} / {quizTotal}</Text>
    </AppBody>
}