import React from 'react';
import { hot } from 'react-hot-loader';
import { User } from './api';
import ProfilePhoto from './ProfilePhoto';
import { statusColor } from './misc';
import './UserCard.css';

function UserCard(props: { user: User; censored: boolean }) {
  const noPicture = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );
  return (
    <div className="UserCard">
      {props.user.picture ? (
        <ProfilePhoto
          src={props.user.picture.url}
          alt={props.user.picture.comment}
          censored={props.censored}
        />
      ) : (
        noPicture
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
