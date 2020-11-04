import { useEffect, useState } from 'react';
import { Profile, SearchResult, User } from './api';

type Status =
  | 'IDLE'
  | 'NEW_CONTENT_REQUESTED'
  | 'LOADING'
  | 'NO_MORE'
  | 'ERROR';

/**
 * React Hook that handles user fetching
 *
 * *users* is initially null.
 * Calling *loadUsers* will fetch users.
 * Subsequent calls will fetch new ones and extend the users array.
 */
function useUsersLoader(): {
  users: User[] | null;
  loadMoreUsers: () => void;
  status: Status;
} {
  const [cursor, setCursor] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('NEW_CONTENT_REQUESTED');

  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      if (status != 'NEW_CONTENT_REQUESTED') return;
      setStatus('LOADING');

      const searchUrl =
        'http://localhost:3000/api/search' +
        (cursor ? '?cursor=' + cursor : '');
      const searchResponse = await fetch(searchUrl);
      if (!searchResponse.ok) throw new Error('Error using the search api');
      const {
        cursors,
        items: searchUsers,
      } = (await searchResponse.json()) as SearchResult;

      const profilesUrl =
        'http://localhost:3000/api/profiles?' +
        searchUsers.map((user) => 'ids=' + user.id).join('&');

      const profileResponse = await fetch(profilesUrl);
      if (!profileResponse.ok) throw new Error('Error using the profile api');
      const profiles = (await profileResponse.json()) as Profile[];

      const mergedUsers = searchUsers.map((user) => {
        const findProfile = (id: number) => profiles.find((p) => p.id == id);
        return {
          ...user,
          ...findProfile(user.id)!, // Output is considered OK
        };
      });

      setUsers(users ? [...users, ...mergedUsers] : mergedUsers);
      if (!cursors) setStatus('NO_MORE');
      else {
        setCursor(cursors.after);
        setStatus('IDLE');
      }
    };

    loadUsers().catch(() => setStatus('ERROR'));
  }, [users, cursor, status]);

  return {
    users,
    loadMoreUsers: () => {
      setStatus((status) =>
        status === 'IDLE' ? 'NEW_CONTENT_REQUESTED' : status
      );
    },
    status,
  };
}

export { Status };
export default useUsersLoader;
