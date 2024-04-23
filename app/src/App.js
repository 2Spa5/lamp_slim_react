import "./App.css";
import Alunno from "./Alunno.js";
import { useEffect, useState } from "react";
import FormDiInserimento from "./FormDiInserimento";

function App() {
  const [alunni, setAlunni] = useState([]);
  const [pronto, setPronto] = useState(false);

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
      {pronto ? (
        alunni.map((a) => (
          <Alunno alunno={a} popolaAlunni={popolaAlunni} key={a.id} />
        ))
      ) : (
        <p>LOADING...</p>
      )}
      <FormDiInserimento                 <span>{alunno.nome} {alunno.cognome}</span>
popolaAlunni={popolaAlunni} />
    </div>
  );
}

export default App;
