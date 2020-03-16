import React from "react";
import { ReactBingmaps } from 'react-bingmaps';

export default function Map(props) {
    const latLong = [11.790640708130752, 78.09182189856892]

    function addPushPinOnClick(coordinates){
        console.log("empty")
        console.log(coordinates.latitude,coordinates.longitude)
        props.setDest(prev=>{
            prev = [coordinates.latitude,coordinates.longitude]
            return prev
        })
    }

    return (
        <div className="empty-map">
            <ReactBingmaps 
            bingmapKey = {process.env.REACT_APP_BINGMAPS_KEY}
            center = {latLong}
            zoom = {8}
            getLocation = {
                {addHandler: "click", callback:addPushPinOnClick}
            } 
        > 
        </ReactBingmaps>
        </div>
    )
}