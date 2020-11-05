import React, { useEffect, useRef } from 'react';
import { hot } from 'react-hot-loader';
import { User } from './api';
import './Details.css';

function Details(props: { users: User[]; target?: number }) {
  const targetRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const targetElem = targetRef.current;
    if (!targetElem) return;
    targetElem.scrollIntoView({ block: 'center' });
  }, []);

  return (
    <div className="Details">
      {props.users.map((user) =>
        user.picture ? (
          <img
            key={user.id}
            ref={user.id == props.target ? targetRef : null}
            src={user.picture.url}
          />
        ) : (
          ''
        )
      )}
    </div>
  );
}

export default hot(module)(Details);
