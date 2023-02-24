import styles from "../styles/AppBody.module.css"
import { useRouter } from "next/router"
/** @jsxImportSource theme-ui */
import { ThemeProvider, Container, Button } from 'theme-ui'
import  theme  from '../theme.js'
import { Provider } from 'react-redux'
import store from "@/app/store"
import { Spinner } from "theme-ui";
export default function AppBody({ children }) {
 const router = useRouter();
 var token;
 if(typeof window !== 'undefined') {
   // console.log(window)
   const authPath = new RegExp('\/auth\/.*');
   token = window.localStorage.getItem("userToken")
   if(!token && !authPath.test(window.location.pathname)) {
      router.push('/auth/LearnerSignIn')
      // console.log(window.location)
    }
 }

const handleAuthOperation = (e) => {
   if(typeof window !== 'undefined') {
      token = window.localStorage.getItem("userToken");
      if(token) {
         window.localStorage.removeItem("userToken");
      }
      router.reload();
      router.push("/auth/LearnerSignIn")
   }
}
 return  (
    <Provider store={store}>
    <ThemeProvider theme={theme}>
    <div>
    <Container sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <h1 sx={{color: 'primary', fontFamily: 'heading'}}>Flagmojis</h1>
    <Button variant="primary" sx={{mx: 3}} onClick={handleAuthOperation}>{token? "Log out": "Log in"}</Button>
    </Container>
    <main>
    {children? children: <Spinner sx={{color: 'accent'}}/>}
    </main>
    </div>
    </ThemeProvider>
    </Provider>
 )
}