import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Maps from './Maps';

export default function Realtime() {
  const [name, setName] = useState('');
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [estimate, setEstimate] = useState(['no estimate']);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    const users = JSON.parse(localStorage.getItem('Users'));
    // console.log(token)

    if (token && users) {
      const currentUser = users.filter((items) => {
        if (items) {
          return items.userName === token.token;
        }
      });
      if (currentUser.length > 0) {
        setName(token.name);
      } else if (currentUser.length < 0) {
        history.push('/');
      }
    } else {
      history.push('/');
    }

    setTimeout(() => {
      setLoading((prev) => (prev = false));
    }, 2000);
  }, [history]);

  function loadData() {
    if (loading) {
      return (
        <div className="loader">
          <div className="cssload-thecube">
            <div className="cssload-cube cssload-c1"></div>
            <div className="cssload-cube cssload-c2"></div>
            <div className="cssload-cube cssload-c4"></div>
            <div className="cssload-cube cssload-c3"></div>
          </div>
        </div>
      );
    }

    return (
      <div className="main-content">
        <div className="left-section" style={{ width: '15vw' }}>
          <div className="name-section">
            <p>{name}</p>
          </div>
          <div>
            {estimate[0] === 'no estimate' ? (
              <div className="show-details">
                Select a route to display realtime info.
              </div>
            ) : (
              <div className="show-details">
                <p>
                  Total distance of trip <br />
                  <span className="normal-span">
                    {estimate[0].distance / 1000 + ' kms'}
                  </span>
                </p>
                <p>
                  Estimated reaching time with Traffice: <br />
                  <span className="danger-span">{estimate[0].trafficTime}</span>
                </p>
                <p>
                  Estimated time without traffic: <br />
                  <span className="safe-span">{estimate[0].baseTime}</span>
                </p>
              </div>
            )}
          </div>
          <div className="logout-section">
            <p
              onClick={() => {
                localStorage.removeItem('token');
                history.push('/');
              }}
            >
              Log out
            </p>
          </div>
        </div>
        <Maps method={setEstimate} />
      </div>
    );
  }

  return <>{loadData()}</>;
}
