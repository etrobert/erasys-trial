import React from 'react';
import { hot } from 'react-hot-loader';
import { OnlineStatus, User } from './api';
import UserCard from './UserCard';
import './Radar.css';

// See https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors
declare module 'csstype' {
  interface Properties {
    '--radar-elem-count'?: number;
  }
}

function RadarCircle(props: {
  users: User[];
  distanceMax: number;
  censored: boolean;
}) {
  return (
    <div
      className="RadarCircle"
      style={{
        '--radar-elem-count': props.users.length,
      }}
    >
      {props.users.map((user) => (
        <UserCard key={user.id} user={user} censored={props.censored} />
      ))}
    </div>
  );
}

enum statusColor {
  ONLINE = '#6df500',
  OFFLINE = 'grey',
  DATE = '#f91e79',
}

function Radar(props: {
  users: User[];
  censored: boolean;
  online_status: OnlineStatus;
}) {
  return (
    <div className="Radar">
      <RadarCircle
        users={[props.users[0], props.users[1], props.users[2]]}
        distanceMax={12}
        censored={props.censored}
      />
      <RadarCircle
        users={[
          props.users[3],
          props.users[4],
          props.users[5],
          props.users[6],
          props.users[7],
          props.users[8],
          props.users[9],
          props.users[10],
        ]}
        distanceMax={12}
        censored={props.censored}
      />
      <div
        className="Radar-status"
        style={{ background: statusColor[props.online_status] }}
      ></div>
    </div>
  );
}

export default hot(module)(Radar);
