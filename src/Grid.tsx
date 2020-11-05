import React, { useEffect, useRef } from 'react';
import { hot } from 'react-hot-loader';
import { User } from './api';
import UserCard from './UserCard';
import './Grid.css';
import { Status as LoaderStatus } from './useUsersLoader';

import { loading as loadingSvg } from './svg';

function Grid({
  users,
  censored,
  onScrollEnd,
  loaderStatus,
}: {
  users: User[];
  censored: boolean;
  onScrollEnd: () => void;
  loaderStatus: LoaderStatus;
}) {
  const footerRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (loaderStatus != 'IDLE') return;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const footer = footerRef.current!;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) onScrollEnd();
    });
    observer.observe(footer);
    return () => observer.unobserve(footer);
  }, [onScrollEnd, loaderStatus]);

  return (
    <ol className="Grid">
      {users.map((user) => (
        <li key={user.id}>
          <UserCard user={user} censored={censored} />
        </li>
      ))}
      {loaderStatus != 'NO_MORE' && (
        <li ref={footerRef} className="footer">
          {loadingSvg}
        </li>
      )}
    </ol>
  );
}

export default hot(module)(Grid);
