import React from 'react';
import { useEffect, useState } from 'react';
import { supabase } from '../client';
import './ShowCreators.css';
import Card from '../components/Card';


const ShowCreators = () => {
    const [creators, setCreators] = useState([]);
    useEffect( () => {
    const fetchData = async() => {
        const { data, error } = await supabase.from('creators').select('*');
        if (error) {
            console.error('Error fetching creators:', error);
        } else {
            setCreators(data);
            console.log('Creators:', data);
        }
    };
    fetchData();
    }, []);
    if (creators.length == 0) {
        return <h1>NO CREATORS YET</h1>
    };
  return (
    <div className="creator-grid">
        {creators.map((creator) => (
            <Card
                key={creator.id}
                id={creator.id}
                name={creator.name}
                image={creator.image}
                description={creator.description}
                youtube={creator.youtube}
                twitter={creator.twitter}
                instagram={creator.instagram}
            />
        ))}
    </div>
  );
};

export default ShowCreators;
