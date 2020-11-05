import React, { useState } from 'react';
import { hot } from 'react-hot-loader';
import './App.css';
import Grid from './Grid';
import { View } from './misc';
import Radar from './Radar';
import Toolbar from './Toolbar';
import useUsersLoader from './useUsersLoader';

function App() {
  const [censored, setCensored] = useState(true);
  const [view, setView] = useState<View>('GRID');

  const { users, loadMoreUsers, status: loaderStatus } = useUsersLoader();

  const [focus, setFocus] = useState<number | null>(null);

  const renderView = () => {
    if (!users) return 'Loading...';
    return view == 'GRID' ? (
      <Grid
        users={users}
        censored={censored}
        onScrollEnd={loadMoreUsers}
        loaderStatus={loaderStatus}
        focus={focus}
        setFocus={setFocus}
      />
    ) : (
      <Radar
        users={users}
        censored={censored}
        online_status="ONLINE"
        focus={focus}
        setFocus={setFocus}
      />
    );
  };

  return (
    <div className="App">
      <Toolbar
        censored={censored}
        setCensored={setCensored}
        currentView={view}
        setView={setView}
      />
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
