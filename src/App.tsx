import React, { useState } from 'react';
import { hot } from 'react-hot-loader';
import './App.css';
import Grid from './Grid';
import useUsersLoader from './useUsersLoader';

function App() {
  const [censored, setCensored] = useState(true);

  const { users, loadMoreUsers, status: loaderStatus } = useUsersLoader();

  return (
    <div className="App">
      <button id="censoredButton" onClick={() => setCensored(!censored)}>
        {censored ? 'Uncensored Mode' : 'Censored Mode'}
      </button>
      {loaderStatus == 'ERROR' && (
        <div className="error">
          There has been an error. Try reloading the page.
        </div>
      )}
      {users ? (
        <Grid
          users={users}
          censored={censored}
          onScrollEnd={loadMoreUsers}
          loaderStatus={loaderStatus}
        />
      ) : (
        'Loading'
      )}
    </div>
  );
}

export default hot(module)(App);
