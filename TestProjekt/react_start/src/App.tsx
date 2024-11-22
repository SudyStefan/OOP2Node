import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

interface Fact {
  text: string;
  type: string;
}


function MyButton(props: { onClick: () => void}) {
  return (
    <button onClick={props.onClick}>
      Get cat fact
      </button>
  );
}

function FactList({ list }: { list: Fact[]}) {
  return (
    <ul>
      {list.map((item, index) => (
        <li key={index}>{item.text}</li>
      ))}
    </ul>
  )
}

function App() {
  const [showList, setShowList] = useState(false);
  const [facts, setFacts] = useState<any[]>([]);


  const getCatFact = async () => {
    setShowList(false);
    //axios.get("https://cat-fact.herokuapp.com/facts")
    axios.get("http://localhost:8010/animal")
      .then((res) => {
        setFacts(res.data);
        console.log(res.data);
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        console.log("Fact received");
        setShowList(true);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <MyButton onClick={getCatFact} />
        {showList ? <FactList list={facts}/> : <img src={logo} className="App-logo" alt="logo" />}
      </header>
    </div>
  );
}

export default App;