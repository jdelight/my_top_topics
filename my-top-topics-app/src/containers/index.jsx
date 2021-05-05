import React, { useEffect, useState } from 'react';
import TopicsWrapper from '../components/topicsWrapper/TopicsWrapper';
import Topics from '../components/topicsWrapper/topics/Topics';
import Info from '../components/topicsWrapper/info/Info';

const TopTopics = props => {

    const [data, setData]=useState([]);

    const getData=()=>{
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
    }
        
    useEffect(()=>{
        getData();
    },[])

    return (
        <TopicsWrapper>
            <Topics />
            <Info />
        </TopicsWrapper>
    )
}

export default TopTopics;