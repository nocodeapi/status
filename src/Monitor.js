import React from "react";
import moment from "moment";
import { ArrowUp, ArrowDown, Play } from "react-feather";

import ResponseChart from "./ResponseChart";
import "./styles/monitor.css";

function Monitor({ data }) {
    const {
        id,
        friendly_name,
        url,
        type,
        create_datetime,
        logs,
        all_time_uptime_ratio,
        response_times,
        average_response_time
    } = data;

    const statusComp = type => {
        let status = "";

        if (type === 1)
            status = (
                <>
                    <ArrowDown color="red" size={14} /> Down
                </>
            );
        if (type === 2)
            status = (
                <>
                    <ArrowUp color="green" size={14} /> Up
                </>
            );
        if (type === 98)
            status = (
                <>
                    <Play color="blue" size={14} /> Started
                </>
            );

        return status;
    };

    function secondsToHms(d) {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor((d % 3600) / 60);
        var s = Math.floor((d % 3600) % 60);

        var hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
        var mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
        var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
        return hDisplay + mDisplay + sDisplay;
    }

    function getLastDown(logs){
        const downLogIndex = logs.findIndex(log => log.type === 1)
        let message;
        if(downLogIndex === -1){
            message = "No down time"
        }else {
            message = `${moment
                .unix(logs[downLogIndex].datetime)
                .format("YYYY-MM-DD, h:mm:ss")} (${secondsToHms(logs[downLogIndex].duration)})`
        }
        return message
    }

    return (
        <div className="monitor">
            <div className="head">
                <h2>{friendly_name}</h2>
                <small>
                    <a href={url}>{url}</a>
                </small>
            </div>
            <div className="stats-container">
                <div className="response-chart">
                    <ResponseChart response_times={response_times} />
                </div>
                <div className="status-numbers">
                    <div
                        className={
                            logs[0].type === 2 ? "number up" : "number down"
                        }
                    >
                        <div className="number-card current-status">
                            <label>Current Status</label>
                            <div className="value">
                                {logs[0].type === 2 ? "Up" : "Down"}
                            </div>
                        </div>
                    </div>
                    <div className="number">
                        <div className="number-card latest-downtime">
                            <label>Latest downtime</label>
                            <div className="value">{getLastDown(logs)}</div>
                        </div>
                    </div>
                    <div className="number">
                        <div className="number-card all_time_uptime_ratio">
                            <label>Overall Uptime</label>
                            <div className="value">
                                {parseInt(all_time_uptime_ratio).toFixed(2)}%
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="logs-list" style={{ overflowX: "auto" }}>
                <table>
                    <tbody>
                        {logs.map((log, key) => (
                            <tr key={key}>
                                <td>{statusComp(log.type)}</td>
                                <td>
                                    {moment
                                        .unix(log.datetime)
                                        .format("YYYY-MM-DD, h:mm:ss")}
                                </td>
                                <td>
                                    {log.reason.detail}({log.reason.code})
                                </td>
                                <td>{secondsToHms(log.duration)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Monitor;
