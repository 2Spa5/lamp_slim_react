import "./App.css";
import Alunno from "./Alunno.js";
import { useEffect, useState } from "react";
import FormDiInserimento from "./FormDiInserimento";

function App() {
  const [alunni, setAlunni] = useState([]);
  const [pronto, setPronto] = useState(false);
  const [mostraForm, setMostraForm] = useState(false);
  const [alunno, setAlunno] = useState(null);

  useEffect(() => {
    popolaAlunni();
  }, []);

  async function popolaAlunni() {
    const response = await fetch("http://localhost:8080/alunni", {
      method: "GET",
    });
    const array = await response.json();
    setAlunni(array);
    setPronto(true);
  }

  return (
    <div className="App">
      {
        pronto ? (
          alunni.map((a) => (
            <Alunno className="alunno" alunno={a} setMostraForm={setMostraForm} setAlunno={setAlunno} popolaAlunni={popolaAlunni} key={a.id} />
          ))
        ) : (
          <p>LOADING...</p>
        )}
      <button onClick={() => {setMostraForm(true); setAlunno(null)}}>Inserisci nuovo alunno</button>
      {
        mostraForm &&
          <div>
            <div><FormDiInserimento alunno={alunno} popolaAlunni={popolaAlunni} setMostraForm={setMostraForm}/></div>
            <br/>
            <button onClick={() => setMostraForm(false)}>Annulla inserimento</button>
          </div>
      }
    </div>
  );
}

export default App;
