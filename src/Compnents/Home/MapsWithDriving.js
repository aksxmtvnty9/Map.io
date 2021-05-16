import React, { useState, useEffect, useCallback } from 'react';
import { ReactBingmaps } from 'react-bingmaps';
import car from '../../Assets/car.png';
import carLeft from '../../Assets/car-left.png';
import carRight from '../../Assets/car-right.png';
import carDown from '../../Assets/car-down.png';

export default function MapWithDriving(props) {
  const latLong = [11.790640708130752, 78.09182189856892];
  const [cars, setCars] = useState([11.0018115, 76.9628425]);
  const [direction, setDirection] = useState('up');

  useEffect(() => {
    // console.log(cars)
    window.addEventListener('keydown', (event) => {
      if (event.keyCode === 38) {
        console.log('up key pressed');
        setDirection('up');
        setCars([(cars[0] += 0.03), cars[1]]);
      }
      if (event.keyCode === 37) {
        console.log('left key pressed');
        setCars([cars[0], (cars[1] -= 0.03)]);
        setDirection('left');
      }
      if (event.keyCode === 39) {
        console.log('right key pressed');
        setCars([cars[0], (cars[1] += 0.03)]);
        setDirection('right');
      }
      if (event.keyCode === 40) {
        console.log('down key pressed');
        setCars([(cars[0] -= 0.03), cars[1]]);
        setDirection('down');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderMaps = useCallback(() => {
    let vehicle;
    if (direction === 'up') vehicle = car;
    if (direction === 'down') vehicle = carDown;
    if (direction === 'left') vehicle = carLeft;
    if (direction === 'right') vehicle = carRight;

    return (
      <ReactBingmaps
        bingmapKey={process.env.REACT_APP_BINGMAPS_KEY}
        center={latLong}
        zoom={8}
        pushPins={[
          {
            location: cars,
            option: { icon: vehicle },
          },
        ]}
        getLocation={{ addHandler: 'click', callback: addPushPinOnClick }}
      ></ReactBingmaps>
    );
  }, [cars, direction, latLong]);

  function addPushPinOnClick(coordinates) {
    console.log(coordinates.latitude, coordinates.longitude);
  }

  return <div className="realtime-map">{renderMaps()}</div>;
}
