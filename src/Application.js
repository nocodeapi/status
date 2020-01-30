import React, {useEffect, useState} from 'react';
import axios from 'axios'

import Monitor from './Monitor'
import logo from './images/logo_round.png';
import './styles/app.css';

function Application() {

    const [myMonitors, setMyMonitors] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/betauser/uptime/jWbKgShOsFpnGQNa?monitors=784130462-784130459-784021932').then(result => {
            setMyMonitors(result.data.monitors)
        })
    },[])

    return (
        <>
            <div className="banner"><a href="">NoCodeAPI Status Page: With UptimeRobot API</a></div>
            <div className="applications">
                <header className="app-header">
                    <a href="https://nocodeapi.com"><img src={logo} height="60" alt="logo" /></a>
                    <div className="feedback">
                    report
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
