import React, { useState,useEffect } from "react";
import { ReactBingmaps } from 'react-bingmaps';
import car from '../../Assets/car.png'
import bus from '../../Assets/bus.png'
import marker from '../../Assets/marker.png'
import axios from 'axios';

const HERE_MAPS_KEY ="9a8Wc3VJvFHLF4I2s8Sisj_c2kfQE7ppvF4lzgtmO0I";
const KEY ="AoVMH4fhTFyAXxfjqNVBvLYjGjOxCYN8llWIud4Ro0CgtJ_2b379XxIP3XZsEmT1";
const CAR = "CAR"
const PUBLIC_TRANSPORT = "PUBLIC_TRANSPORT"

export default function Map(props) {
    const latLong = [11.790640708130752, 78.09182189856892]   
    const [cars,setCars] = useState([11.0018115,76.9628425])
    const [buss,setBuss] = useState([13.0801721,79.2838331])
    const [gps,setGPS] = useState();
    const [routes,setRoutes] = useState([]);
    const [pushPinOne,setpushPinOne] = useState("car")
    const [pushPinTwo,setpushPinTwo] = useState("bus")

    useEffect(() => {
        // console.log(cars)
        //enable the below to get cars moving
        if(cars[0]<12){
            setCars([cars[0]+0.00003,cars[1]+0.000002])
            setBuss([buss[0]-0.00003,buss[1]-0.000002])
        }
    }, [cars,buss])

    function distance(lat1, lon1, lat2, lon2, unit) {
        if ((lat1 === lat2) && (lon1 === lon2)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * lat1/180;
            var radlat2 = Math.PI * lat2/180;
            var theta = lon1-lon2;
            var radtheta = Math.PI * theta/180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit==="K") { dist = dist * 1.609344 }
            if (unit==="N") { dist = dist * 0.8684 }
            return dist;
        }
    }
    useEffect(() => {
        if(gps){
            // console.log(gps,cars,buss)
            if(distance(gps[0],gps[1],cars[0],cars[1],"K") < distance(gps[0],gps[1],buss[0],buss[1])){
                // console.log("car")
                getRoute(cars,"CAR")
            }
            else{
                // console.log("bus")
                getRoute(buss,"PUBLIC_TRANSPORT")
            }
        }
                // 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gps])

    function addPushPinOnClick(coordinates){
        // console.log(coordinates.latitude,coordinates.longitude)
        setGPS([coordinates.latitude,coordinates.longitude])
    }

    function changePushPinOneMode(){
        setpushPinOne(prev=>{
            if(prev==="car")
                return prev = "bus"
            else
                return prev = "car"
        })
    }
    function changePushPinTwoMode(){
        setpushPinTwo(prev=>{
            if(prev==="bus")
                return prev = "car"
            else
                return prev = "bus"
        })
    }
    const [one,setOne] = useState(false);
    function hoverOnFirst(){
        setOne(prev=>prev=!prev);
    }

    const [two,setTwo] = useState(false);
    function hoverOnSecond(){
        setTwo(prev=>prev=!prev);
    }

    function secondsToTime(secs) {
        var hours = Math.floor(secs / (60 * 60));
    
        var divisor_for_minutes = secs % (60 * 60);
        var minutes = Math.floor(divisor_for_minutes / 60);
    
        var divisor_for_seconds = divisor_for_minutes % 60;
        var seconds = Math.ceil(divisor_for_seconds);
    
        if(hours>1)
            if(minutes > 1)
                return hours+" hrs "+minutes+" mins"
            else
                return hours+" hrs "+minutes+" min"
        else if(hours < 1)
            if(minutes>1)
                return minutes+" mins"
            else
                return minutes+" min"
        else if(hours === 1)
            if(minutes > 1)
                return hours+" hr "+minutes+" mins"
            else
                return hours+" hr "+minutes+" min"
    }

    async function getRoute(data,mode){
        if(mode === CAR){
            await axios.get(`https://route.ls.hereapi.com/routing/7.2/calculateroute.json?waypoint0=${gps[0]}%2C${gps[1]}&waypoint1=${data[0]}%2C${data[1]}&mode=fastest%3Bcar%3Btraffic%3Aenabled&departure=now&alternatives=1&apiKey=${HERE_MAPS_KEY}`)
            .then(res=>{
                setRoutes([])
                console.log(res.data.response.route)
                props.method([{trafficTime:secondsToTime(res.data.response.route[0].summary.trafficTime), baseTime:secondsToTime(res.data.response.route[0].summary.baseTime), distance:res.data.response.route[0].summary.distance}])
                res.data.response.route[0].leg[0].maneuver.map(items=>{
                    setRoutes(prev=>{
                        prev.push([items.position.latitude,items.position.longitude])
                        return prev
                    })
                })
                console.log(res.data.resourceSets[0].resources)
            })
            .catch(err=>{
                console.log(err.message)
            })
        }
        if(mode === PUBLIC_TRANSPORT){
            await axios.get(`https://route.ls.hereapi.com/routing/7.2/calculateroute.json?waypoint0=${gps[0]}%2C${gps[1]}&waypoint1=${data[0]}%2C${data[1]}&mode=fastest%3Btruck%3Btraffic%3Aenabled&departure=now&alternatives=1&apiKey=${HERE_MAPS_KEY}`)
            .then(res=>{
                setRoutes([])
                console.log(res.data.response.route)
                props.method([{trafficTime:secondsToTime(res.data.response.route[0].summary.trafficTime), baseTime:secondsToTime(res.data.response.route[0].summary.baseTime), distance:res.data.response.route[0].summary.distance}])
                res.data.response.route[0].leg[0].maneuver.map(items=>{
                    setRoutes(prev=>{
                        prev.push([items.position.latitude,items.position.longitude])
                        return prev
                    })
                })
                console.log(res.data.resourceSets[0].resources)
            })
            .catch(err=>{
                console.log(err.message)
            })
        }
    }

    return (
        <div style={{width:"85vw",height:"100vh"}}>
            <ReactBingmaps 
            bingmapKey = {KEY}
            center = {latLong}
            zoom = {8}
            pushPins = {
                [
                    {
                      "location":cars, "option":{ icon: pushPinOne==="car"?car:bus }, "addHandler": {"type" : "click", callback: changePushPinOneMode }
                    },
                    {
                        "location": buss, "option":{ icon: pushPinTwo==="car"?car:bus }, "addHandler": {"type" : "click", callback: changePushPinTwoMode }
                    },
                    {
                        "location": [11.77503, 78.209442], "option": {icon: marker, title: one?'Yercaud':'',subTitle: one?'best chill & hilly area':''}, "addHandler": {"type" : "mouseover", callback: hoverOnFirst}
                    },
                    {
                        "location": [11.4051694, 76.6963387], "option": {icon: marker, title: two?'Ooty':'',subTitle: two?'Crown of hills':''}, "addHandler": {"type" : "mouseover", callback: hoverOnSecond}
                    }
                ]
            }
            polyline = {
                {
                    "location": routes,
                    "option": { strokeColor: 'dodgerBlue', strokeThickness: 5}
                }
            }
            getLocation = {
                {addHandler: "click", callback:addPushPinOnClick}
            }
            
        > 
        </ReactBingmaps>
    </div>
    )
}