import React from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts'
import PropTypes from 'prop-types';

const Info = props => {

    const {
        title, 
        information
    } = props;

    const data = {}
    const chartData = [];

    Object.entries(information).forEach(([key, value]) => {
        if (key === 'sentiment') {
            Object.entries(value).forEach(([key, value]) => {
                const chart = {
                    name: key,
                    value: value    
                }

                switch (key) {
                    case 'positive':
                        chart.colour = 'green'
                        break;
                    case 'neutral':
                        chart.colour = 'grey'
                        break;
                    case 'negative':
                        chart.colour = 'red'
                        break;
                }

                chartData.push(chart)
                data[key] = value
            })
        } else {
            data[key] = value;
        }
    });


    const dataToDisaply = Object.entries(data).map(([key, value], index) => {
        switch (key) {
            case 'label':
                return <p key={index}>{`Information on topic "${value}":`}</p>
                break;
            case 'volume':
                return <p key={index}>Total Mentions: <span className="total-volume">{value}</span></p>
                break;
            case 'positive':
                return <p key={index}>{`${key} Mentions: `}<span className="info-positive">{value}</span></p>
            case 'neutral':
                return <p key={index}>{`${key} Mentions: `}<span className="info-neutral">{value}</span></p>
            case 'negative':
                return <p key={index}>{`${key} Mentions: `}<span className="info-negative">{value}</span></p>
                break;
        }
    });

    console.log(1, chartData)

    return (
        <React.Fragment>
            {Object.keys(information).length > 0 &&
                <div className="info">
                    <h1>{title}</h1>
                    <div className="scores">
                        {dataToDisaply}
                        <PieChart width={200} height={170}>
                            <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} label>
                            {
                                chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.colour}/>
                                ))
                            }
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </div>
                </div>
            }
        </React.Fragment>
    )
}

Info.propTypes = {
    title: PropTypes.string,
    wordCloud: PropTypes.object,
}

Info.defaultProps = {
    title: 'Info'
}

export default Info;