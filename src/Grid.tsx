import React, { useEffect, useRef } from 'react';
import { hot } from 'react-hot-loader';
import { User } from './api';
import UserCard from './UserCard';
import './Grid.css';

function Grid(props: {
  users: User[];
  censored: boolean;
  onScrollEnd: () => void;
}) {
  const footerRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const footer = footerRef.current!;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) props.onScrollEnd();
    });
    observer.observe(footer);
    return () => observer.unobserve(footer);
  });

  return (
    <ol className="Grid">
      {props.users.map((user) => (
        <li key={user.id}>
          <UserCard user={user} censored={props.censored} />
        </li>
      ))}
      <li ref={footerRef} className="footer"></li>
    </ol>
  );
}

export default hot(module)(Grid);
