import { useState } from "react";

export default function Alunno(alunno, popolaAlunni){

    const [contatore, setContatore] = useState[alunno.id];
    const [inCancellazione, setInCancellazione] = useState[false];
    const [richiestaConferma, setRichiestaConferma] = useState[false];

    function incrementaVoto(){
        setContatore[contatore + 1];
    }

    async function cancellaAlunno(){
        setRichiestaConferma[false];
        setInCancellazione[true];
        const response = await fetch(`http://localhost:8080/alunni/${alunno.id}`, {method: "DELETE"});
        popolaAlunni();
    }

    function richiesta(){
        setRichiestaConferma[true];
    }

    function annulla(){
        setRichiestaConferma[false];
    }

    return (
        <div>
            {alunno.nome} {alunno.cognome}
            <botton onClick={incrementaVoto}>{contatore}</botton>

            {
                richiestaConferma ?
                <span>Sei Sicuro?
                    <button onClick={cancellaAlunno}>Si</button>
                    <button onClick={annulla}>No</button>
                </span>
                :
                <button onClick={richiesta}>Cancella</button>
            }
            {
                inCancellazione &&
                <span>in fase di cancellazione</span>
            }
        </div>
    );
}