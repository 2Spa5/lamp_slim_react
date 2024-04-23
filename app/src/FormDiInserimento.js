import { useState } from "react";
export default function FormDiInserimento({popolaAlunni}){

    const [nome, setNome] = useState("");
    const [cognome, setCognome] = useState("");

    function svuota(){
        setNome("");
        setCognome("");
    }

    async function salvaAlunno(){

        await fetch(`http://localhost:8080/alunni`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({nome: nome, cognome: cognome})
            }
        );
        svuota();
        popolaAlunni();
    }

    function gestisciCambioNome(e){
        setNome(e.target.value);
    }

    function gestisciCambioCognome(e){
        setCognome(e.target.value);
    }

    return (
        <div>
            <h1>Form Di Inserimento</h1>
            <div>Nome: <input type="text" onChange={gestisciCambioNome} value={nome}/></div>
            <div>Cognome: <input type="text" onChange={gestisciCambioCognome} value={cognome}/></div>
            <br/> 
            <button onClick={salvaAlunno}>Salva</button>
            {/* <br/>
            {nome} <br/> {cognome} */}
        </div>
    )
}