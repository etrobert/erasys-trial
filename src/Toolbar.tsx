import React from 'react';
import { hot } from 'react-hot-loader';
import { View } from './misc';
import './Toolbar.css';

enum ViewButtonText {
  'GRID' = 'Grid',
  'RADAR' = 'Radar',
}

function Toolbar({
  censored,
  setCensored,
  currentView,
  setView,
}: {
  censored: boolean;
  setCensored: (b: boolean) => void;
  currentView: View;
  setView: (v: View) => void;
}) {
  const renderViewButton = (view: View) => {
    return (
      <button
        className={currentView == view ? 'selected' : ''}
        onClick={() => setView(view)}
      >
        {ViewButtonText[view]}
      </button>
    );
  };
  return (
    <div className="Toolbar">
      <button
        className={censored ? 'selected' : ''}
        onClick={() => setCensored(!censored)}
      >
        Censored Mode
      </button>
      <section className="viewSection">
        {renderViewButton('GRID')}
        {renderViewButton('RADAR')}
      </section>
    </div>
  );
}

export default hot(module)(Toolbar);
