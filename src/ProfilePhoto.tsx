import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';
import './ProfilePhoto.css';

function ProfilePhoto({
  src,
  alt,
  censored,
}: {
  src: string;
  alt: string;
  censored: boolean;
}) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => setLoaded(false), [censored]);

  const placeholder = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1"></circle>
      <circle cx="19" cy="12" r="1"></circle>
      <circle cx="5" cy="12" r="1"></circle>
    </svg>
  );

  return (
    <div className="ProfilePhoto">
      {!loaded && placeholder}
      <img
        src={censored ? './cat-yawning.jpg' : src}
        alt={alt}
        style={{ visibility: loaded ? 'visible' : 'hidden' }}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

export default hot(module)(ProfilePhoto);
