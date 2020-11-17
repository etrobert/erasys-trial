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
  focus,
  setFocus,
  loaderStatus,
}: {
  users: User[];
  censored: boolean;
  onScrollEnd: () => void;
  focus: number | null;
  setFocus: (id: number) => void;
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

  const renderSingleUser = (user: User) => (
    <UserCard
      user={user}
      censored={censored}
      onClick={() => setFocus(user.id)}
      focused={user.id == focus}
    />
  );

  const renderUserGroup = (users: User[]) => {
    return (
      <ol className="Grid__group">
        {users.map((user) => (
          <li key={user.id}>{renderSingleUser(user)}</li>
        ))}
      </ol>
    );
  };

  const groupId = (users: User[]) => users.map((user) => user.id).join();

  /**
   * Creates a list of html *li* elements.
   *
   * Each element contains either a single premium user, or 4 regular users.
   */
  const renderUsers = () => {
    const squares: JSX.Element[] = [];
    let currentGroup: User[] = [];

    const pushCurrentGroup = () =>
      squares.push(
        <li key={groupId(currentGroup)}>{renderUserGroup(currentGroup)}</li>
      );

    users.forEach((user) => {
      if (user.is_plus)
        squares.push(<li key={user.id}>{renderSingleUser(user)}</li>);
      else {
        currentGroup.push(user);
        if (currentGroup.length == 4) {
          pushCurrentGroup();
          currentGroup = [];
        }
      }
    });
    if (currentGroup.length > 0) pushCurrentGroup();
    return squares;
  };

  return (
    <ol className="Grid">
      {renderUsers()}
      {loaderStatus != 'NO_MORE' && (
        <li ref={footerRef} className="footer">
          {loadingSvg}
        </li>
      )}
    </ol>
  );
}

export default hot(module)(Grid);
