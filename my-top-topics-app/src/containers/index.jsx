import React, { useEffect, useState } from 'react';
import Topics from '../components/topics/Topics';
import Info from '../components/info/Info';

const TopTopics = () => {

    const [data, setData]=useState([]);
    const [info, setInfo]=useState({});

    const words = [];
    
    // simulate API call
    useEffect(()=>{
        fetch('topics.json', 
            {
                headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                }
            }
        )
        .then(function(response){
            return response.json();
        })
        .then(function(dataJson) {
            setData(dataJson);
        });
    },[]);
    
    // set data that needs to be displayed in info component
    const displayInfo = (data) => {
        const requiredInfo = {
            label: data.label,
            volume: data.volume,
            sentiment: data.sentiment,
        }

        setInfo(requiredInfo)
    }

    return (
        <div className="background">
            <div className="row">
                <div className="col-12 col-sm-6">
                    {typeof data.topics != 'undefined' &&
                        <Topics 
                            title='TOP EVENTS'
                            wordCloud={data.topics}
                            displayTopicData={displayInfo}
                        />
                    }
                </div>
                <div className="col-12 col-sm-6">
                    <Info 
                        title="Feedback"
                        information={info}
                    />
                </div>
            </div>
        </div>
    )
}

export default TopTopics;