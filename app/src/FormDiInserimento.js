import { useState } from "react";
export default function FormDiInserimento({alunno, popolaAlunni, setMostraForm}){

    const [nome, setNome] = useState(alunno !== null ? alunno.nome : "");
    const [cognome, setCognome] = useState(alunno !== null ? alunno.cognome : "");

    function svuota(){
        setNome("");
        setCognome("");
    }

    async function salvaAlunno(){
        alunno === null ?
        await fetch(`http://localhost:8080/alunni`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({nome: nome, cognome: cognome})
            }
        )
        :
        await fetch(`http://localhost:8080/alunni/${alunno.id}`,{
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({nome: nome, cognome: cognome})
        });
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
            {
                alunno ?
                <h1>Form di Modifica</h1>
                :
                <h1>Form Di Inserimento</h1>
            }
            <div>Nome: <input type="text" onChange={gestisciCambioNome} value={nome}/></div>
            <div>Cognome: <input type="text" onChange={gestisciCambioCognome} value={cognome}/></div>
            <br/> 
            <button onClick={() => {salvaAlunno(); setMostraForm(false);}}>Salva</button>
            {/* <br/>
            {nome} <br/> {cognome} */}
        </div>
    )
}