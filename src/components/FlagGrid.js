import { useCallback, useState, useEffect} from "react";
import { Container } from "theme-ui";
import axios from "axios";
import{ countriesQuery }  from "@/queries/countriesQuery";
import FlagCard from "./FlagCard";
import { Spinner } from "theme-ui";

export default function FlagGrid() {
    const styles = {
        width: '100%',
        height: '100%',
        borderWidth: 'normal',
        borderStyle: 'solid',
        p: 4,
        borderRadius: 'small',
        borderColor: 'muted',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        userSelect: 'none'}
const [flags, setFlags] = useState([]);

const getCountries = useCallback(() => {
    const query = JSON.stringify(countriesQuery());
    axios.post("https://countries.trevorblades.com/graphql", query,{headers: {"Content-Type": "application/json"}})
    .then((response) => {const countryData = response.data.data.countries; setFlags(countryData);})
    .catch((error) => console.log(error))

}, [])
useEffect(() => {
    getCountries();
    return () => {
        // cleanup
    };
}, [getCountries]); 
    return (
        <Container sx={styles}>
            {flags.length == 0 && <Spinner sx={{color: 'accent'}}/>}
            {flags.map(({code,name, emoji}, i) => <FlagCard code={code} name={name} emoji={emoji} key={i} childIndex={i}/>)}
        </Container>
    )
}
