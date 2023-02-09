import styles from "../styles/AppBody.module.css"
/** @jsxImportSource theme-ui */
import { ThemeProvider, Container } from 'theme-ui'
import  theme  from '../theme.js'
export default function AppBody({ children }) {
 return  ( 
    <ThemeProvider theme={theme}>
    <div>
    <Container sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <h1 sx={{color: 'primary', fontFamily: 'heading'}}>Flagmojis</h1>
    </Container>
    <main>
    {children}
    </main>
    </div>
    </ThemeProvider>
            
 )
}