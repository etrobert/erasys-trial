import React from 'react';
import { hot } from 'react-hot-loader';
import { User } from './api';
import UserCard from './UserCard';
import './Grid.css';

function Grid(props: { users: User[]; censored: boolean }) {
  return (
    <ol className="Grid">
      {props.users.map((user) => (
        <li key={user.id}>
          <UserCard user={user} censored={props.censored} />
        </li>
      ))}
    </ol>
  );
}

export default hot(module)(Grid);
