import React from 'react';
import { hot } from 'react-hot-loader';
import { User } from './api';
import ProfilePhoto from './ProfilePhoto';
import { statusColor } from './misc';
import './UserCard.css';

function UserCard(props: { user: User; censored: boolean }) {
  return (
    <div className="UserCard">
      {props.user.picture ? (
        <ProfilePhoto
          src={props.user.picture.url}
          alt={props.user.picture.comment}
          censored={props.censored}
        />
      ) : (
        'no picture'
      )}
      <span className="name">{props.user.name}</span>
      <div
        className="status"
        style={{ background: statusColor[props.user.online_status] }}
      ></div>
    </div>
  );
}

export default hot(module)(UserCard);
