import React, {useState, useEffect, useCallback} from 'react';
import { ReactBingmaps } from 'react-bingmaps';
import car from '../../Assets/car.png';
import carLeft from '../../Assets/car-left.png';
import carRight from '../../Assets/car-right.png';
import carDown from '../../Assets/car-down.png';

const KEY ="AoVMH4fhTFyAXxfjqNVBvLYjGjOxCYN8llWIud4Ro0CgtJ_2b379XxIP3XZsEmT1";

export default function MapWithDriving(props) {
    const latLong = [11.790640708130752, 78.09182189856892]   
    const [cars,setCars] = useState([11.0018115,76.9628425])
    const [direction,setDirection] = useState("up");

    useEffect(() => {
        // console.log(cars)
        window.addEventListener("keydown",(event)=>{
            if(event.keyCode === 38){   
                console.log("up key pressed")
                setDirection("up")
                setCars([cars[0]+=0.03,cars[1]])
            }
            if(event.keyCode === 37){   
                console.log("left key pressed")
                setCars([cars[0],cars[1]-=0.03])
                setDirection("left")
            }
            if(event.keyCode === 39){   
                console.log("right key pressed")
                setCars([cars[0],cars[1]+=0.03])
                setDirection("right")
            }
            if(event.keyCode === 40){   
                console.log("down key pressed")
                setCars([cars[0]-=0.03,cars[1]])
                setDirection("down")
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderMaps = useCallback(
        () => {
            if(direction === "up")
                return <ReactBingmaps 
                            bingmapKey = {KEY}
                            center = {latLong}
                            zoom = {8}
                            pushPins = {
                                [
                                    {
                                    "location":cars, "option":{ icon: car }
                                    }
                                ]
                            }
                            getLocation = {
                                {addHandler: "click", callback:addPushPinOnClick}
                            }
                            
                        > 
                        </ReactBingmaps>
            if(direction === "down")
                return <ReactBingmaps 
                            bingmapKey = {KEY}
                            center = {latLong}
                            zoom = {8}
                            pushPins = {
                                [
                                    {
                                    "location":cars, "option":{ icon: carDown }
                                    }
                                ]
                            }
                            getLocation = {
                                {addHandler: "click", callback:addPushPinOnClick}
                            }
                            
                        > 
                        </ReactBingmaps>
            if(direction === "left")
                return <ReactBingmaps 
                            bingmapKey = {KEY}
                            center = {latLong}
                            zoom = {8}
                            pushPins = {
                                [
                                    {
                                    "location":cars, "option":{ icon: carLeft }
                                    }
                                ]
                            }
                            getLocation = {
                                {addHandler: "click", callback:addPushPinOnClick}
                            }
                            
                        > 
                        </ReactBingmaps>
            if(direction === "right")
                return <ReactBingmaps 
                            bingmapKey = {KEY}
                            center = {latLong}
                            zoom = {8}
                            pushPins = {
                                [
                                    {
                                    "location":cars, "option":{ icon: carRight }
                                    }
                                ]
                            }
                            getLocation = {
                                {addHandler: "click", callback:addPushPinOnClick}
                            }
                            
                        > 
                        </ReactBingmaps>
        },
        [cars,direction,latLong],
    )

    function addPushPinOnClick(coordinates){
        console.log(coordinates.latitude,coordinates.longitude)
    }

    return (
        <div style={{width:"85vw",height:"100vh"}}>
            {renderMaps()}
        </div>
    )
}