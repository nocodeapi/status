import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {config} from './env'

import Monitor from './Monitor'
import logo from './images/logo_round.png';
import './styles/app.css';

function Application() {

    const [myMonitors, setMyMonitors] = useState([])

    useEffect(() => {
        axios.get(config.ENDPOINT).then(result => {
            setMyMonitors(result.data.monitors)
        })
    },[])

    return (
        <>
            <div className="applications">
                <header className="app-header">
                    <a href={config.website} className="title"><span>{config.title}</span> Status</a>
                    <div className="feedback">
                        <a href={config.twitterURL}>{config.twitterHandle}</a>
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
