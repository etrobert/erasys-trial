import React, { useEffect, useRef, useState } from 'react';
import { hot } from 'react-hot-loader';
import { User } from './api';
import ProfilePhoto from './ProfilePhoto';
import { statusColor } from './misc';
import './UserCard.css';

const formatDist = (dist: number) =>
  dist >= 1000 ? Math.floor(dist / 1000) + 'km' : dist + 'm';

function UserCard(props: {
  user: User;
  censored: boolean;
  onClick?: () => void;
  focused?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>();

  const ratio = 13.5; // font-size = (element-width / ratio) px;

  useEffect(() => {
    const card = cardRef.current!;
    const observer = new ResizeObserver((entries) => {
      const cardEntry = entries[0];
      setWidth(cardEntry.contentRect.width);
    });
    observer.observe(card);
    return () => observer.unobserve(card);
  }, []);

  return (
    <div
      className={'UserCard' + (props.focused ? ' focused' : '')}
      onClick={props.onClick}
      ref={cardRef}
      style={width ? { fontSize: width / ratio } : undefined}
    >
      <ProfilePhoto picture={props.user.picture} censored={props.censored} />
      <div className="slider">
        <div className="header">
          <div className="status-name">
            <div
              className="status"
              style={{ background: statusColor[props.user.online_status] }}
            ></div>
            <span className="name" title={props.user.name}>
              {props.user.name}
            </span>
          </div>
          <span className="distance">
            {formatDist(props.user.location.distance)}
          </span>
        </div>
        <div className="additional-info">
          <span className="age">{props.user.personal.age}yo</span>
          <span className="location">{props.user.location.name}</span>
        </div>
        <span className="headline">{props.user.headline}</span>
      </div>
    </div>
  );
}

export default hot(module)(UserCard);
