import { useEffect, useState } from 'react';
import { Profile, SearchResult, User } from './api';

/**
 * React Hook that handles user fetching
 *
 * *users* is initially null.
 * Calling *loadUsers* will fetch users.
 * Subsequent calls will fetch new ones and extend the users array.
 */
function useUsersLoader(): { users: User[] | null; loadMoreUsers: () => void } {
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [newContentRequested, setNewContentRequested] = useState(true);

  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      if (loading || !newContentRequested) return;
      setLoading(true);

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

      setCursor(cursors.after);
      setUsers(users ? [...users, ...mergedUsers] : mergedUsers);
      setNewContentRequested(false);
      setLoading(false);
    };

    loadUsers().catch((err) => console.error(err));
  }, [users, cursor, loading, newContentRequested]);

  return {
    users,
    loadMoreUsers: () => {
      setNewContentRequested(true);
    },
  };
}

export default useUsersLoader;
