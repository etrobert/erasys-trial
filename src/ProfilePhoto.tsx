import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';
import './ProfilePhoto.css';
import { loading as loadingSvg, user as userSvg } from './svg';

function ProfilePhoto({
  picture,
  censored,
}: {
  picture?: { url: string; comment: string };
  censored: boolean;
}) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => setLoaded(false), [censored]);

  return (
    <div className="ProfilePhoto">
      {picture ? (
        <>
          {!loaded && loadingSvg}
          <img
            src={censored ? './cat-yawning.jpg' : picture.url}
            alt={picture.comment}
            style={{ visibility: loaded ? 'visible' : 'hidden' }}
            onLoad={() => setLoaded(true)}
          />
        </>
      ) : (
        userSvg
      )}
    </div>
  );
}

export default hot(module)(ProfilePhoto);
