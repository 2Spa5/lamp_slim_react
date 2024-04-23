import { useState } from "react";

export default function Alunno({alunno, popolaAlunni}){

    const [inCancellazione, setInCancellazione] = useState(false);
    const [richiestaConferma, setRichiestaConferma] = useState(false);
    const [inModifica, setModifica] = useState(false);
    const [richiestaModifica, setRichiestaModifica] = useState(false);

    async function cancellaAlunno(){
        setRichiestaConferma(false);
        setInCancellazione(true);
        await fetch(`http://localhost:8080/alunni/${alunno.id}`, {method: "DELETE"});
        popolaAlunni();
    }

    function richiestaC(){
        setRichiestaConferma(true);
    }

    function annullaC(){
        setRichiestaConferma(false);
    }

    async function modificaAlunno(){
        setRichiestaModifica(false);
        setModifica(true);
        await fetch(`http://localhost:8080/alunni/${alunno.id}`, {method: "PUT"});
        popolaAlunni();
    }

    function richiestaM(){
        setRichiestaModifica(true);
    }

    function annullaM(){
        setRichiestaModifica(false);
    }

    return (
        <div>
            
            {
                richiestaModifica ?
                <input type="text" value={alunno.nome}/>
                :
                <span>{alunno.nome} {alunno.cognome}</span>
            }
            <span> </span>
            {
                richiestaConferma ?
                <span> / Sei Sicuro?
                    <button onClick={cancellaAlunno}>Si</button>
                    <button onClick={annullaC}>No</button>
                </span>
                :
                <button onClick={richiestaC}>Cancella</button>
            }
            {
                inCancellazione &&
                <span> In fase di cancellazione</span>
            }
            <span> / </span>
            {
                richiestaModifica ?
                <span>
                    <button onClick={modificaAlunno}>Salva</button>
                    <span> </span>
                    <button onClick={annullaM}>Annulla</button>
                </span>
                :
                <button onClick={richiestaM}>Modifica</button>
            }
            {
                inModifica &&
                <span> In fase di modifica</span>
            }
            <hr />
        </div>
    );
}