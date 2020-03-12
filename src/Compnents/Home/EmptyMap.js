import React from "react";
import { ReactBingmaps } from 'react-bingmaps';

const KEY ="AoVMH4fhTFyAXxfjqNVBvLYjGjOxCYN8llWIud4Ro0CgtJ_2b379XxIP3XZsEmT1";

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
        <div style={{width:"70vw",height:"100vh"}}>
            <ReactBingmaps 
            bingmapKey = {KEY}
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