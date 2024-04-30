import { useState } from "react";

export default function Alunno({alunno, popolaAlunni, setAlunno, setMostraForm}){

    const [inCancellazione, setInCancellazione] = useState(false);
    const [richiestaConferma, setRichiestaConferma] = useState(false);

    const [inModifica, setModifica] = useState(false);
    const [richiestaModifica, setRichiestaModifica] = useState(false);

    const [nome, setNome] = useState(alunno.nome);
    const [cognome, setCognome] = useState(alunno.cognome);

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
        await fetch(`http://localhost:8080/alunni/${alunno.id}`,{
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({nome: nome, cognome: cognome})
        });
        popolaAlunni();
        setModifica(false);
    }

    function richiestaM(){
        setRichiestaModifica(true);
    }

    function annullaM(){
        setRichiestaModifica(false);
        popolaAlunni();
    }

    function gestisciInputNome(e){
        setNome(e.target.value);
    }

    function gestisciInputCognome(e){
        setCognome(e.target.value);
    }

    return (
        <div className="alunno">
            {
                richiestaModifica ?
                <span>
                    <input type="text" value={nome} onChange={gestisciInputNome}/>
                    <span> </span>
                    <input type="text" value={cognome} onChange={gestisciInputCognome}/>
                </span>
                :
                <span>{alunno.nome} {alunno.cognome}</span>
            }
            <span> </span>
            {
                richiestaConferma ?
                <span> / Sei Sicuro?
                    <button onClick={cancellaAlunno}>Si</button>
                    <span> </span>
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
                <span> In fase di modifica </span>
            }
            <span> / </span>
            {
                <span>
                    <span> </span>
                    <button onClick={() => {setAlunno(alunno); setMostraForm(true);}}>Modifica2</button>
                </span>
            }
            
            <hr/>
        </div>
    );
}