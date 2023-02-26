import styles from "../styles/AppBody.module.css"
import { useRouter } from "next/router"
/** @jsxImportSource theme-ui */
import { ThemeProvider, Container, Button } from 'theme-ui'
import  theme  from '../theme.js'
import { Provider } from 'react-redux'
import store from "@/app/store"
import { Spinner } from "theme-ui";
import { useState, useEffect } from "react"
import { deleteCookie, hasCookie, setCookie } from "cookies-next"
export default function AppBody({ children }) {
 const [authStatus, setAuthStatus] = useState(false);
 const router = useRouter();
 useEffect(() => {
   const authPath = new RegExp('\/auth\/.*');
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
 });

//  useEffect(() => {getLearnerPaths()}, [])

const handleAuthOperation = (e) => {
      // token = window.localStorage.getItem("userToken");
      // if(token) {
      //    window.localStorage.removeItem("userToken");
      // }
      if(hasCookie('userToken')) {
         deleteCookie('userToken')
      }
      router.reload();
      router.push("/auth/LearnerSignIn")
}

 return  (
    <Provider store={store}>
    <ThemeProvider theme={theme}>
    <div>
    <Container sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <h1 sx={{color: 'primary', fontFamily: 'heading'}}>Flagmojis</h1>
    <Button variant="primary" sx={{mx: 3}} onClick={handleAuthOperation}>{authStatus? "Log out": "Log in"}</Button>
    </Container>
    <main>
    {children? children: <Spinner sx={{color: 'accent'}}/>}
    </main>
    </div>
    </ThemeProvider>
    </Provider>
 )
}