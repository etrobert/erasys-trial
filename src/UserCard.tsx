import React from 'react';
import { hot } from 'react-hot-loader';
import { User } from './api';
import { statusColor } from './misc';
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
      <div
        className="status"
        style={{ background: statusColor[props.user.online_status] }}
      ></div>
    </div>
  );
}

export default hot(module)(UserCard);
