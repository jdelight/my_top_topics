import React from 'react';
import './Topics.scss';

const Topics = props => {

    const {title, wordCloud} = props;

    return (
        <div className="topics">
            <h1>{title}</h1>
            <div>
                {wordCloud}
            </div>
        </div> 
    )
}

export default Topics;