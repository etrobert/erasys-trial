import React, { useEffect, useRef } from 'react';
import { hot } from 'react-hot-loader';
import { User } from './api';
import UserCard from './UserCard';
import './Grid.css';

function Grid({
  users,
  censored,
  onScrollEnd,
}: {
  users: User[];
  censored: boolean;
  onScrollEnd: () => void;
}) {
  const footerRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const footer = footerRef.current!;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) onScrollEnd();
    });
    observer.observe(footer);
    return () => observer.unobserve(footer);
  }, [onScrollEnd]);

  return (
    <ol className="Grid">
      {users.map((user) => (
        <li key={user.id}>
          <UserCard user={user} censored={censored} />
        </li>
      ))}
      <li ref={footerRef} className="footer"></li>
    </ol>
  );
}

export default hot(module)(Grid);
