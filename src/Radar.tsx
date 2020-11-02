import React from 'react';
import { hot } from 'react-hot-loader';
import { SearchUser } from './api';
import UserCard from './UserCard';
import './Radar.css';

// See https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors
declare module 'csstype' {
  interface Properties {
    '--radar-elem-count'?: number;
  }
}

function RadarCircle(props: {
  users: SearchUser[];
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

function Radar(props: { users: SearchUser[]; censored: boolean }) {
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
    </div>
  );
}

export default hot(module)(Radar);
