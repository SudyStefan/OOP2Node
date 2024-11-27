import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';
import { stringify } from 'querystring';


interface Geom {
  type: string,
  coordinates: number[];
}

interface Amenity {
  name: string;
  type: string;
  geom: Geom;
  tags: Map<string, string>;
}


function Button(props: { onClick: () => void, text: string}): JSX.Element {
  return (
    <button onClick={props.onClick}>
      {props.text}
      </button>
  );
}

function EntryField({ inputValue, isValid, handleInputChange }: { inputValue: string, isValid: boolean, handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void }): JSX.Element {
  return (
    <div>
      <input 
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder='Enter the ID to search'
      />
      {!isValid && <p>Please enter a valid integer!</p>}
    </div>
  );
}

function formatAmenity(obj: Amenity): string {
  const { name, geom, type, tags} = obj;
  return `name: '${name}', type: '${type}', [lon: ${geom.coordinates[0]} | lat: ${geom.coordinates[1]}], ${tags}`;
}

function App(): JSX.Element {
  const [showList, setShowList] = useState(false);
  const [inputId, setInputId] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);
  const [responseData, setResponseData] = useState<Amenity>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (parseInt(value)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    setInputId(value);
  };

  const getAmenityById = (id: number) => {
    axios.get(`http://localhost:8010/amenities/${id}`, { withCredentials: false })
      .then((res) => {
        console.log(res.data);
        setResponseData(res.data);
      }).catch((err) => {
        console.log(err)
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <EntryField inputValue={inputId} isValid={isValid} handleInputChange={handleInputChange} />
        <Button onClick={() => getAmenityById(parseInt(inputId))} text={`Get Amenity with ID: ${inputId}`}/>
        {responseData ? <p>{formatAmenity(responseData)}</p> : <img src={logo} className="App-logo" alt="logo" />}
      </header>
    </div>
  );
}

export default App;