import React from 'react';
import './Topics.scss';

const Topics = props => {

    return (
        <div className="topics">
            <h1>{props.title}</h1>
            <div>
                {props.wordCloud}
            </div>
        </div> 
    )
}

export default Topics;