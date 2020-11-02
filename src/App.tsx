import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';
import { SearchResult, SearchUser } from './api';
import './App.css';
import Radar from './Radar';

function App() {
  const [users, setUsers] = useState<SearchUser[] | null>(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/search')
      .then((response) => {
        if (!response.ok) throw new Error('There was an error during search');
        return response.json();
      })
      .then((data: SearchResult) => setUsers(data.items))
      .catch((error) => console.error(error));
  }, []);

  const [censored, setCensored] = useState(true);

  return (
    <div className="App">
      <button id="censoredButton" onClick={() => setCensored(!censored)}>
        {censored ? 'Uncensored Mode' : 'Censored Mode'}
      </button>
      {users ? (
        <Radar users={users} censored={censored} online_status={'ONLINE'} />
      ) : (
        'Loading'
      )}
    </div>
  );
}

export default hot(module)(App);
