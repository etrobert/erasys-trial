import React from 'react';
import { hot } from 'react-hot-loader';
import { User } from './api';
import './UserCard.css';

function UserCard(props: { user: User; censored: boolean }) {
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
      {props.user.location.distance}
    </div>
  );
}

export default hot(module)(UserCard);
