import React, { useState, useEffect, useCallback } from "react";
import { ReactBingmaps } from 'react-bingmaps';
import car from '../../Assets/car.png';
import carLeft from '../../Assets/car-left.png';
import carRight from '../../Assets/car-right.png';
import carDown from '../../Assets/car-down.png';

const KEY = "AoVMH4fhTFyAXxfjqNVBvLYjGjOxCYN8llWIud4Ro0CgtJ_2b379XxIP3XZsEmT1";

export default function Map(props) {
    const latLong = [11.790640708130752, 78.09182189856892]
    const [cars, setCars] = useState(props.source.length>1?props.source:[11.0018115, 76.9628425])
    const [direction, setDirection] = useState("up");
    const [yes,setYes] = useState(false);
    const [flag,setFlag] = useState(true)

    useEffect(() => {
        // console.log(cars)
        window.addEventListener("keydown", (event) => {
            if (event.keyCode === 38) {
                console.log("up key pressed")
                setDirection("up")
                setCars([cars[0] += 0.03, cars[1]])
                setFlag(false)
            }
            if (event.keyCode === 37) {
                console.log("left key pressed")
                setCars([cars[0], cars[1] -= 0.03])
                setDirection("left")
                setFlag(false)
            }
            if (event.keyCode === 39) {
                console.log("right key pressed")
                setCars([cars[0], cars[1] += 0.03])
                setDirection("right")
                setFlag(false)
            }
            if (event.keyCode === 40) {
                console.log("down key pressed")
                setCars([cars[0] -= 0.03, cars[1]])
                setDirection("down")
                setFlag(false)
            }
            if(event.keyCode === 89){
                setYes(true);
                props.setDest2(prev => {
                    prev = cars
                    return prev
                })
                props.setflag(false)
                setTimeout(() => {
                    console.log("flag set true")
                    props.setflag(true)
                }, 500);
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function addPushPinOnClick(coordinates) {
        console.log("not empty")
        console.log(coordinates.latitude, coordinates.longitude)
        props.setDest(prev => {
            prev = [coordinates.latitude, coordinates.longitude]
            return prev
        })
        props.setflag(false)
        setTimeout(() => {
            console.log("flag set true")
            props.setflag(true)
        }, 500);
    }

    const renderMaps = useCallback(
        () => {
            if (direction === "up")
                return <ReactBingmaps
                    bingmapKey={KEY}
                    center={latLong}
                    zoom={8}
                    disablePanning={true}
                    directions={
                        {
                            "renderOptions": { "itineraryContainer": "itineraryContainer" },
                            "requestOptions": { "routeMode": "driving", "maxRoutes": 2 },
                            "wayPoints": flag?props.dest:""
                        }
                    }
                    pushPins={
                        [
                            {
                                "location": cars, "option": { icon: car }
                            }
                        ]
                    }
                    getLocation={
                        { addHandler: "click", callback: addPushPinOnClick }
                    }
                >
                </ReactBingmaps>

            if (direction === "down")
                return <ReactBingmaps
                    bingmapKey={KEY}
                    center={latLong}
                    zoom={8}
                    disablePanning={true}
                    directions={
                        {
                            "renderOptions": { "itineraryContainer": "itineraryContainer" },
                            "requestOptions": { "routeMode": "driving", "maxRoutes": 2 },
                            "wayPoints": flag?props.dest:""
                        }
                    }
                    pushPins={
                        [
                            {
                                "location": cars, "option": { icon: carDown }
                            }
                        ]
                    }
                    getLocation={
                        { addHandler: "click", callback: addPushPinOnClick }
                    }
                >
                </ReactBingmaps>
            if (direction === "left")
                return <ReactBingmaps
                    bingmapKey={KEY}
                    center={latLong}
                    zoom={8}
                    disablePanning={true}
                    directions={
                        {
                            "renderOptions": { "itineraryContainer": "itineraryContainer" },
                            "requestOptions": { "routeMode": "driving", "maxRoutes": 2 },
                            "wayPoints": flag?props.dest:""
                        }
                    }
                    pushPins={
                        [
                            {
                                "location": cars, "option": { icon: carLeft }
                            }
                        ]
                    }
                    getLocation={
                        { addHandler: "click", callback: addPushPinOnClick }
                    }
                >
                </ReactBingmaps>
            if (direction === "right")
                return <ReactBingmaps
                    bingmapKey={KEY}
                    center={latLong}
                    zoom={8}
                    disablePanning={true}
                    directions={
                        {
                            "renderOptions": { "itineraryContainer": "itineraryContainer" },
                            "requestOptions": { "routeMode": "driving", "maxRoutes": 2 },
                            "wayPoints": flag?props.dest:""
                        }
                    }
                    pushPins={
                        [
                            {
                                "location": cars, "option": { icon: carRight }
                            }
                        ]
                    }
                    getLocation={
                        { addHandler: "click", callback: addPushPinOnClick }
                    }
                >
                </ReactBingmaps>
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [cars, flag, direction, latLong],
    )

    return (
        <div style={{ width: "70vw", height: "100vh" }}>
            <div className={yes?"overlay":"overlay visible"}>
                Click y to set source locaion
            </div>
            {renderMaps()}
        </div>
    )
}