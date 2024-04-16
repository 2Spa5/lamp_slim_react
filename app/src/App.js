
import './App.css';
import {useEffect, useState} from 'react';

function App() {

  useEffect(() => {
    popolaAlunni();
  }, [])

  const [alunni, setAlunni] = useState([]);
  const [pronto, setPronto] = useState([]);

  async function popolaAlunni(){
    const response = await fetch("http://localhost:8080/alunni" , {method: "GET"});
    const array = await response.json();
    setAlunni[alunni];
    setPronto[true];
  }

  return(
    <div className="App">
      {
        pronto ?
        alunni.map(a => (
          <Alunno alunno={a} popolaAlunni={popolaAlunni} key={a.id} />
        ))
        :
        <p>LOADING...</p>
      }
    </div>
  );
}

export default App;
