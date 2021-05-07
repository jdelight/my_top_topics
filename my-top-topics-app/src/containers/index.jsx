import React, { useEffect, useState } from 'react';
import Topics from '../components/topics/Topics';
import Info from '../components/info/Info';
import './index.scss';

const TopTopics = props => {

    const [data, setData]=useState([]);
    const [info, setInfo]=useState({});

    const words = [];
        
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
    
    const displayInfo = (data) => {
        const requiredInfo = {
            label: data.label,
            volume: data.volume,
            sentiment: data.sentiment,
        }

        setInfo(requiredInfo)
    }

    if (typeof data.topics != 'undefined') {
        let scores = [];

        data.topics.forEach(score => {
            scores.push(score.sentimentScore)
        })

        const topScore = Math.max(...scores);
        const fontRanges = [];
        const fontIncrement = topScore / 6;

        for (let i = 1; i <= 6; i++) {
            let result = {
                range: i * fontIncrement,
            }

            let colour = result.range > 60 ? 'positive' : result.range < 40 ? 'negative' : 'neutral';

            result.colour = colour;

            fontRanges.push(result)
        }
        
        const wordsToRender = data.topics.map(data => {

            const score = data.sentimentScore;
            const id = data.id;
            const label = data.label;
            const f1 = fontRanges[0];
            const f2 = fontRanges[1];
            const f3 = fontRanges[2];
            const f4 = fontRanges[3];
            const f5 = fontRanges[4];
            const f6 = fontRanges[5];

            switch (true) {
                case (score <= f1.range):
                    return <p key={id} className={f1.colour} onClick={(() => displayInfo(data))}>{label}</p>
                    break;
                case (score > f1.range && score <= f2.range):
                    return <h6 key={id} className={f2.colour} onClick={(() => displayInfo(data))}>{label}</h6>
                    break;
                case (score > f2.range && score <= f3.range):
                    return <h5 key={id} className={f3.colour} onClick={(() => displayInfo(data))}>{label}</h5>
                    break;
                case (score > f3.range && score <= f4.range):
                    return <h4 key={id} className={f4.colour} onClick={(() => displayInfo(data))}>{label}</h4>
                    break;
                case (score > f4.range && score <= f5.range):
                    return <h3 key={id} className={f5.colour} onClick={(() => displayInfo(data))}>{label}</h3>
                    break;
                case (score > f5.range && score <= f6.range):
                    return <h2 key={id} className={f6.colour} onClick={(() => displayInfo(data))}>{label}</h2>
                    break;
            }            
        })

        words.push(wordsToRender);
    }

    return (
        <div className="background">
            <div className="row">
                <div className="col-12 col-sm-6">
                    <Topics 
                        title='My Top Topics'
                        wordCloud={words}
                    />
                </div>
                <div className="col-12 col-sm-6">
                    <Info 
                        title="Info"
                        information={info}
                    />
                </div>
            </div>
        </div>
    )
}

export default TopTopics;