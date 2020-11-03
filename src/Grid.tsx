import React from 'react';
import { hot } from 'react-hot-loader';
import { User } from './api';
import UserCard from './UserCard';
import './Grid.css';

function Grid(props: {
  users: User[];
  censored: boolean;
  onScrollEnd: () => void;
}) {
  return (
    <ol className="Grid">
      {props.users.map((user) => (
        <li key={user.id}>
          <UserCard user={user} censored={props.censored} />
        </li>
      ))}
      <li className="footer" onClick={props.onScrollEnd}></li>
    </ol>
  );
}

export default hot(module)(Grid);
