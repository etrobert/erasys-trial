import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';
import './ProfilePhoto.css';
import { loading as loadingSvg } from './svg';

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

  return (
    <div className="ProfilePhoto">
      {!loaded && loadingSvg}
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
