import React from 'react';
import PropTypes from 'prop-types';
import './Info.scss';

const Info = props => {

    const {
        title, 
        information
    } = props;

    let data = {}

    Object.entries(information).forEach(([key, value]) => {
        if (key === 'sentiment') {
            Object.entries(value).forEach(([key, value]) => {
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

    return (
        <React.Fragment>
            {Object.keys(information).length > 0 &&
                <div className="info">
                    <h1>{title}</h1>
                    <div className="scores">
                        {dataToDisaply}
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