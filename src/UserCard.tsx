import React from 'react';
import { hot } from 'react-hot-loader';
import { User } from './api';
import ProfilePhoto from './ProfilePhoto';
import { statusColor } from './misc';
import { user as userSvg } from './svg';
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
        userSvg
      )}
      <div className="slider">
        <div className="header">
          <div className="status-name">
            <div
              className="status"
              style={{ background: statusColor[props.user.online_status] }}
            ></div>
            <span className="name">{props.user.name}</span>
          </div>
          <span className="distance">{props.user.location.distance}m</span>
        </div>
        <div className="additional-info">
          <span className="age">{props.user.personal.age}yo</span>
          <span className="location">{props.user.location.name}</span>
        </div>
        <span className="headline">{props.user.headline}</span>
      </div>
    </div>
  );
}

export default hot(module)(UserCard);
