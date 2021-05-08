import React from 'react';
import PropTypes from 'prop-types';
import './Topics.scss';

const Topics = props => {

    const {
        title, 
        wordCloud, 
        displayTopicData
    } = props;

    const words = [];

    if (wordCloud.length) {

        let scores = [];

        wordCloud.forEach(score => {
            scores.push(score.sentimentScore)
        })

        // establish font size increments and colours
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
        
        // set what font size and colour should be applided to each word
        const wordsToRender = wordCloud.map(data => {

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
                    return <p key={id} className={f1.colour} onClick={(() => displayTopicData(data))}>{label}</p>
                    break;
                case (score > f1.range && score <= f2.range):
                    return <h6 key={id} className={f2.colour} onClick={(() => displayTopicData(data))}>{label}</h6>
                    break;
                case (score > f2.range && score <= f3.range):
                    return <h5 key={id} className={f3.colour} onClick={(() => displayTopicData(data))}>{label}</h5>
                    break;
                case (score > f3.range && score <= f4.range):
                    return <h4 key={id} className={f4.colour} onClick={(() => displayTopicData(data))}>{label}</h4>
                    break;
                case (score > f4.range && score <= f5.range):
                    return <h3 key={id} className={f5.colour} onClick={(() => displayTopicData(data))}>{label}</h3>
                    break;
                case (score > f5.range && score <= f6.range):
                    return <h2 key={id} className={f6.colour} onClick={(() => displayTopicData(data))}>{label}</h2>
                    break;
            }            
        });

        words.push(wordsToRender);
    }

    return (
        <div className="topics">
            <h1>{title}</h1>
            <div>
                {words}
            </div>
        </div> 
    ) 
}

Topics.propTypes = {
    title: PropTypes.string,
    wordCloud: PropTypes.array.isRequired,
    displayTopicData: PropTypes.func.isRequired
}

Topics.defaultProps = {
    title: 'My Topics Topics'
}

export default Topics;