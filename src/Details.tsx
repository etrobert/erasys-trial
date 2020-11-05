import React, { useEffect, useRef } from 'react';
import { hot } from 'react-hot-loader';
import { User } from './api';
import './Details.css';
import ExpandedUserCard from './ExpandedUserCard';

function Details(props: { users: User[]; target?: number; censored: boolean }) {
  const targetRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const targetElem = targetRef.current;
    if (!targetElem) return;
    targetElem.scrollIntoView({ block: 'center' });
  }, []);

  return (
    <div className="Details">
      {props.users.map((user) => (
        <ExpandedUserCard key={user.id} user={user} censored={props.censored} />
      ))}
    </div>
  );
}

export default hot(module)(Details);
