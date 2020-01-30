import React, { PureComponent } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

function getTime(value){


    let unix_timestamp = value
    var date = new Date(unix_timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();

    var formattedTime = hours + ':' + minutes.substr(-2);

    return formattedTime
}

export default class ResponseChart extends PureComponent {
   
    render() {
        const { response_times } = this.props;

        const renderCustomAxisTick = (tickItem) => {
            return getTime(tickItem)
        }

        const renderCustomBarLabel = (datetime) => {
            return getTime(datetime)
        };

        return (
            <ResponsiveContainer>
                <AreaChart
                    width={700}
                    height={300}
                    data={response_times}
                    margin={{
                        top: 10, right: 30, left: 0, bottom: 0,
                    }}
                    fill="#007AFF"
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="datetime" tickFormatter={renderCustomAxisTick} />
                    <YAxis />
                    <Tooltip wrapperStyle={{fontSize: '12px'}} labelFormatter={(index) => renderCustomBarLabel(index)} formatter={(value) => `${value}ms`}/>
                    <Area type="monotone" dataKey="value" stroke="#007AFF" fill="#007AFF" />
                </AreaChart>
            </ResponsiveContainer>
        );
    }
}
