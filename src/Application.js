import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {ENDPOINT} from './env'

import Monitor from './Monitor'
import logo from './images/logo_round.png';
import './styles/app.css';

function Application() {

    const [myMonitors, setMyMonitors] = useState([])

    useEffect(() => {
        axios.get(process.env.UPTIME_ROBOT_NOCODEAPI).then(result => {
            setMyMonitors(result.data.monitors)
        })
    },[])

    return (
        <>
            <div className="banner"><a href="https://nocodeapi.com/docs/uptime-robot-nocodeapi-docs">NoCodeAPI Status Page: With UptimeRobot API</a></div>
            <div className="applications">
                <header className="app-header">
                    <a href="https://nocodeapi.com"><img src={logo} height="60" alt="logo" /></a>
                    <div className="feedback">
                        <a href="https://twitter.com/nocodeapi">@nocodeapi</a>
                    </div>
                </header>
                {myMonitors.map((monitor, key) => (
                    <Monitor data={monitor} key={key}/>
                ))}
            </div>
            <div className="footer">
                *All the status is coming from uptimerobot API.
            </div>
        </>
    );
}

export default Application;
