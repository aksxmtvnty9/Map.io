import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function BeforeHome() {
  const history = useHistory();
  useEffect(() => {
    document.title = 'Home | Map.io';
  });

  return (
    <div className="before-main-content">
      <p
        onClick={() => {
          localStorage.removeItem('token');
          history.push('/');
        }}
        className="logout"
      >
        Sign out
      </p>
      <h1 className="h1">Welcome to Map.io</h1>
      <div className="before-main-content-block">
        <div
          onClick={() => {
            history.push('/home/realtime');
          }}
          className="left-block"
        >
          <p>Maps with realtime info</p>
        </div>
        <div
          onClick={() => {
            history.push('/home/drive');
          }}
          className="middle-block"
        >
          <p>Play with Map</p>
        </div>
        <div
          onClick={() => {
            history.push('/home/directions');
          }}
          className="right-block"
        >
          <p>Map with directions</p>
        </div>
      </div>
    </div>
  );
}
