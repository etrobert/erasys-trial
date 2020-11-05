import React from 'react';
import { hot } from 'react-hot-loader';
import { OnlineStatus, User } from './api';
import { statusColor } from './misc';
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
  focus: number | null;
  setFocus: (id: number) => void;
}) {
  return (
    <div
      className="RadarCircle"
      style={{
        '--radar-elem-count': props.users.length,
      }}
    >
      {props.users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          censored={props.censored}
          focused={props.focus == user.id}
          onClick={() => props.setFocus(user.id)}
        />
      ))}
    </div>
  );
}

function Radar(props: {
  users: User[];
  censored: boolean;
  online_status: OnlineStatus;
  focus: number | null;
  setFocus: (id: number) => void;
}) {
  return (
    <div className="Radar">
      <RadarCircle
        users={[props.users[0], props.users[1], props.users[2]]}
        distanceMax={12}
        censored={props.censored}
        focus={props.focus}
        setFocus={props.setFocus}
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
        focus={props.focus}
        setFocus={props.setFocus}
      />
      <RadarCircle
        users={[
          props.users[11],
          props.users[12],
          props.users[13],
          props.users[14],
          props.users[15],
          props.users[16],
          props.users[17],
          props.users[18],
          props.users[19],
        ]}
        distanceMax={20}
        censored={props.censored}
        focus={props.focus}
        setFocus={props.setFocus}
      />
      <div
        className="Radar-status"
        style={{ background: statusColor[props.online_status] }}
      ></div>
    </div>
  );
}

export default hot(module)(Radar);
