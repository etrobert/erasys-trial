import React from 'react';
import { hot } from 'react-hot-loader';
import { SearchUser } from './api';
import './UserCard.css';

function UserCard(props: { user: SearchUser; censored: boolean }) {
  return (
    <div className="UserCard">
      {props.user.picture ? (
        <img
          src={props.censored ? './cat-yawning.jpg' : props.user.picture.url}
          alt={props.user.picture.comment}
        />
      ) : (
        'no picture'
      )}
    </div>
  );
}

export default hot(module)(UserCard);
