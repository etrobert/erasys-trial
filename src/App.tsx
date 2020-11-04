import React, { useState } from 'react';
import { hot } from 'react-hot-loader';
import './App.css';
import Grid from './Grid';
import Radar from './Radar';
import useUsersLoader from './useUsersLoader';

type View = 'GRID' | 'RADAR';
enum ChangeViewButtonText {
  'GRID' = 'Radar',
  'RADAR' = 'Grid',
}

function App() {
  const [censored, setCensored] = useState(true);
  const [view, setView] = useState<View>('GRID');

  const { users, loadMoreUsers, status: loaderStatus } = useUsersLoader();

  const renderView = () => {
    if (!users) return 'Loading...';
    return view == 'GRID' ? (
      <Grid
        users={users}
        censored={censored}
        onScrollEnd={loadMoreUsers}
        loaderStatus={loaderStatus}
      />
    ) : (
      <Radar users={users} censored={censored} online_status="ONLINE" />
    );
  };

  return (
    <div className="App">
      <button id="censoredButton" onClick={() => setCensored(!censored)}>
        {censored ? 'Uncensored Mode' : 'Censored Mode'}
      </button>
      <button
        id="changeViewButton"
        onClick={() => setView((view) => (view == 'GRID' ? 'RADAR' : 'GRID'))}
      >
        {ChangeViewButtonText[view]}
      </button>
      {loaderStatus == 'ERROR' && (
        <div className="error">
          There has been an error. Try reloading the page.
        </div>
      )}
      {renderView()}
    </div>
  );
}

export default hot(module)(App);
