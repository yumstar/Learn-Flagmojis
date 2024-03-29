import styles from "../styles/AppBody.module.css"
import { useRouter } from "next/router"
import Link from "next/link"
/** @jsxImportSource theme-ui */
import { ThemeProvider, Container, Button } from 'theme-ui'
import  theme  from '../theme.js'
import { Provider } from 'react-redux'
// import store from "@/app/store"
import { Spinner } from "theme-ui";
import { useState, useEffect } from "react"
import { deleteCookie, hasCookie, setCookie } from "cookies-next"
import { titleStyles } from "@/styles/appStyles"
import { useSelector, useDispatch } from "react-redux"
import { clearScores } from "@/features/quizScoresSlice"
export default function AppBody({ children }) {
 const [authStatus, setAuthStatus] = useState(false);
 const [onAccountPage, setOnAccountPage] = useState(false)
 const router = useRouter();
 const dispatch = useDispatch();
 const HOMEPATH = "/"
 useEffect(() => {
   const authPath = new RegExp('\/auth\/.*');
   const accountPath = new RegExp(('\/learner\/Account.*'))
   // token = window.localStorage.getItem("userToken");
   if(!hasCookie('userToken')) {
      setAuthStatus(false);
      if(!authPath.test(window.location.pathname)) {
         router.push('/auth/LearnerSignIn')
      }
    }
    else {
      setAuthStatus(true);
    }
    setOnAccountPage(accountPath.test(window.location.pathname))
 });



const handleAuthOperation = (e) => {
      if(hasCookie('userToken')) {
         deleteCookie('userToken')
         dispatch(clearScores())
         setAuthStatus(false)
      }
      router.reload();
      router.push("/auth/LearnerSignIn")

}
 return  (
    <ThemeProvider theme={theme}>
    <div>
    <Container sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    {authStatus && window.location.pathname != HOMEPATH?<Link href="/"><h1 sx={titleStyles}>Flagmojis</h1></Link>: <h1 sx={titleStyles}>Flagmojis</h1>}
    </Container>
    <Container sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <Button variant="primary" sx={{mx: 3, cursor: 'pointer'}} onClick={handleAuthOperation}>{authStatus? "Log out": "Log in"}</Button>
    <Link href="/learner/Account/"><Button variant="primary" sx={{mx: 3, cursor: 'pointer', display: authStatus && !onAccountPage? "inline": "none"}}>My Account</Button></Link>
    </Container>
    <main>
    {children? children: <Spinner sx={{color: 'accent', display: 'block', margin: 'auto'}}/>}
    </main>
    </div>
    </ThemeProvider>
 )
}