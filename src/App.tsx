import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader';
import './App.css';

function App() {
  useEffect(() => {
    fetch('http://localhost:3000/api/search')
      .then((response) => {
        if (!response.ok) throw new Error('There was an error during search');
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  });
  return (
    <div className="App">
      <h1>Hello World!</h1>
    </div>
  );
}

export default hot(module)(App);
