import React, { useState, useEffect, useCallback } from "react";
import { ReactBingmaps } from 'react-bingmaps';
import car from '../../Assets/car.png';
import carLeft from '../../Assets/car-left.png';
import carRight from '../../Assets/car-right.png';
import carDown from '../../Assets/car-down.png';
import Axios from "axios";

export default function Map(props) {
    const latLong = [11.790640708130752, 78.09182189856892]
    const [cars, setCars] = useState(props.source.length>1?props.source:[11.0018115, 76.9628425])
    const [direction, setDirection] = useState("up");
    const [yes,setYes] = useState(false);
    const [flag,setFlag] = useState(true);
    const [routes,setRoutes] = useState({
        one:[],
        two:[]
    })

    useEffect(() => {
        window.addEventListener("keydown", (event) => {
            // console.log(event)
            if (event.keyCode === 38) {
                // console.log("up key pressed")
                setDirection("up")
                setCars([cars[0] += 0.03, cars[1]])
                setFlag(false)
            }
            if (event.keyCode === 37) {
                // console.log("left key pressed")
                setCars([cars[0], cars[1] -= 0.03])
                setDirection("left")
                setFlag(false)
            }
            if (event.keyCode === 39) {
                // console.log("right key pressed")
                setCars([cars[0], cars[1] += 0.03])
                setDirection("right")
                setFlag(false)
            }
            if (event.keyCode === 40) {
                // console.log("down key pressed")
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
                    // console.log("flag     set true")
                    props.setflag(true)
                }, 500);
            }
            if(event.keyCode === 88){
                console.log("x key pressed")
                let i=0,interval = 2000;                    
                const clear = setInterval(
                    () => {
                        console.log("interval")
                        setFlag(false)
                        // console.log(routes.one.routeLegs[0].itineraryItems[i].maneuverPoint.coordinates[0], routes.one.routeLegs[0].itineraryItems[i].maneuverPoint.coordinates[1])
                        if(i<routes.one.routeLegs[0].itineraryItems.length){
                            setCars([routes.one.routeLegs[0].itineraryItems[i].maneuverPoint.coordinates[0],routes.one.routeLegs[0].itineraryItems[i].maneuverPoint.coordinates[1]])
                            i+=2;
                        }
                        else{
                            setFlag(true)
                            alert("You have reached the destination.");
                            clearInterval(clear)
                        }
                }, interval);
            }
            if(event.keyCode === 81){
                getRoute()                
            }
        })        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function getRoute(){
        let start,end;
        for(let i in props.dest){
            let items = props.dest[i]
            if(i == 0)
                start = items[Object.keys(items)]
            else
                end = items[Object.keys(items)]
        }
        // console.log(start,end)
        Axios.get(`${process.env.REACT_APP_BINGMAPS_ROUTE_API_1}${start}${process.env.REACT_APP_BINGMAPS_ROUTE_API_2}${end}${process.env.REACT_APP_BINGMAPS_ROUTE_API_3}${process.env.REACT_APP_BINGMAPS_KEY}`)
        .then(res=>{
            console.log(res.data)//resourceSets[0].resources[].routeLegs[0].itineraryItems[].maneuverPoint.coordinates
            setRoutes(prev=>{
                prev.one = res.data.resourceSets[0].resources[0]
                prev.two = res.data.resourceSets[0].resources[1]
                return prev
            })
        })
        .catch(err=>{
            console.log(err.message)
        })
    }

    function addPushPinOnClick(coordinates) {
        // console.log("not empty")
        // console.log(coordinates.latitude, coordinates.longitude)
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
            let vehicle
            if (direction === "up")
                vehicle = car
            if (direction === "down")
                vehicle = carDown
            if (direction === "left")
                vehicle = carLeft
            if (direction === "right")
                vehicle = carRight
            return <ReactBingmaps
                    bingmapKey={process.env.REACT_APP_BINGMAPS_KEY}
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
                                "location": cars, "option": { icon: vehicle }
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
                <p>Click Y to set source locaion.</p>
            </div>
            <div className={yes?"overlay2":"overlay2 visible2"}>
                <p>Click Q to set location and then click X to track it live.</p>
            </div>
            {renderMaps()}
        </div>
    )
}