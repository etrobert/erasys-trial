interface SearchUser {
  id: number;
  name: string;
  online_status: 'OFFLINE' | 'ONLINE' | 'DATE';
  is_plus: boolean;
  picture?: {
    comment: string;
    url: string;
  };
  last_login: string;
}

interface SearchResult {
  cursors: {
    after: string;
  };
  items: SearchUser[];
  total: number;
}

export { SearchResult, SearchUser };
