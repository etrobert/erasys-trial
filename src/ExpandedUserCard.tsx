import React from 'react';
import { hot } from 'react-hot-loader';
import { User } from './api';
import ProfilePhoto from './ProfilePhoto';
import './ExpandedUserCard.css';
import { statusColor } from './misc';

function ExpandedUserCard(props: { user: User; censored: boolean }) {
  return (
    <div className="ExpandedUserCard">
      {props.user.picture && (
        <ProfilePhoto
          src={props.user.picture.url}
          alt={props.user.picture.comment}
          censored={props.censored}
        />
      )}
      <span className="name">{props.user.name}</span>
      <div
        className="status"
        style={{ background: statusColor[props.user.online_status] }}
      ></div>
      <div className="details">
        <span>{props.user.headline}</span>
      </div>
    </div>
  );
}

export default hot(module)(ExpandedUserCard);
