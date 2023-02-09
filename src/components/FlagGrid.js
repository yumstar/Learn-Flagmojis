import { useCallback, useState, useEffect} from "react";
import axios from "axios";
import { Container } from "theme-ui";
import{ countriesQuery }  from "@/queries/countriesQuery";
import FlagCard from "./FlagCard";


export default function FlagGrid() {
    const styles = {
        width: '100%',
        height: '100%',
        borderWidth: 'normal',
        borderStyle: 'solid',
        p: 4,
        borderRadius: 'small',
        borderColor: 'accent',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'}
const [flags, setFlags] = useState([]);

const getCountries = useCallback(() => {
    const query = JSON.stringify(countriesQuery());
    axios.post("https://countries.trevorblades.com/graphql", query,{headers: {"Content-Type": "application/json"}})
    .then((response) => {console.log(response);const countryData = response.data.data.countries; setFlags(countryData); console.log(flags)})
    .catch((error) => console.log(error))

}, [])
useEffect(() => {
    getCountries();
    return () => {
        // cleanup
    };
}, [getCountries]); 
    return (
        <Container sx={styles} >

            {flags.map(({name, emoji}) => <FlagCard name={name} emoji={emoji}/>)}
        </Container>
    )
}
