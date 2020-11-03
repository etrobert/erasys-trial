import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';
import { Profile, SearchResult, SearchUser, User } from './api';
import './App.css';
import Grid from './Grid';

function App() {
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      const searchResponse = await fetch('http://localhost:3000/api/search');
      if (!searchResponse.ok) throw new Error('Error using the search api');
      const {
        items: searchUsers,
      } = (await searchResponse.json()) as SearchResult;

      const url =
        'http://localhost:3000/api/profiles?' +
        searchUsers.map((user) => 'ids=' + user.id).join('&');

      const profileResponse = await fetch(url);
      if (!profileResponse.ok) throw new Error('Error using the profile api');
      const profiles = (await profileResponse.json()) as Profile[];

      const mergedUsers = searchUsers.map((user) => {
        const findProfile = (id: number) => profiles.find((p) => p.id == id);
        return {
          ...user,
          ...findProfile(user.id)!, // Output is considered OK
        };
      });
      setUsers(mergedUsers);
    };

    loadUsers().catch((err) => console.error(err));
  }, []);

  const [censored, setCensored] = useState(true);

  return (
    <div className="App">
      <button id="censoredButton" onClick={() => setCensored(!censored)}>
        {censored ? 'Uncensored Mode' : 'Censored Mode'}
      </button>
      {users ? <Grid users={users} censored={censored} /> : 'Loading'}
    </div>
  );
}

export default hot(module)(App);
