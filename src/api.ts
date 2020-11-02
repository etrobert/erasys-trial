type OnlineStatus = 'OFFLINE' | 'ONLINE' | 'DATE';

interface SearchUser {
  id: number;
  name: string;
  online_status: OnlineStatus;
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

interface Profile {
  headline: string;
  id: number;
  location: {
    area: string;
    city: string;
    country: string;
    distance: number;
    name: string;
  };
  personal: {
    age: number;
    body_hair: string;
    body_type: string;
    ethnicity: string;
    eye_color: string;
    height: {
      cm: number;
    };
    relationship: string;
    smoker: string;
  };
}
type User = SearchUser & Profile;

export { SearchResult, SearchUser, OnlineStatus, Profile, User };
