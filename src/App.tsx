import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';
import './App.css';

interface SearchUser {
  id: number;
  name: string;
  online_status: 'OFFLINE' | 'ONLINE' | 'DATE';
  is_plus: boolean;
  picture: {
    comment: string;
    url: string;
  };
  last_login: string;
}

interface SearchResult {
  cursors: {
    after: string;
  };
  items: SearchUser[];
  total: number;
}

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
  return (
    <div className="App">
      {users ? `There are ${users.length} loaded users` : 'Loading'}
    </div>
  );
}

export default hot(module)(App);
