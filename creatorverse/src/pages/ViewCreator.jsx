import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { supabase } from '../client';
import './ViewCreator.css'

const ViewCreator = () => {
    const { id } = useParams();
    const [creator, setCreator] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect( () => {
    const fetchCreator = async() => {
        const { data, error } = await supabase.from('creators').select('*').eq('id', id).single();
        if (error) {
            console.error('Error fetching creator:', error);
        } else {
            setCreator(data);
            console.log('Creator:', data);
        }
        setLoading(false);
    };
    fetchCreator();
    }, [id]);

    const handleDelete = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this creator?');
        if (!confirmed) return;

        const { error } = await supabase.from('creators').delete().eq('id', creator.id);

        if (error) {
            alert('Error deleting creator: ' + error.message);
        } else {
            alert('Creator deleted successfully');
            navigate('/creators');
            console.log('Deleting creator with ID:', creator.id);
        }
    };
    if (loading) return <p>Loading...</p>
    if (!creator) return <h1>Creator not found</h1>;
  return (
    <div className='info-page'>
        <img src={creator.image} alt="name" className="profile-image"></img>
        <div className='profile-description'>
            <div className='profile-container'>
                <h6>{creator.name}</h6>
                <p>{creator.description}</p>
            </div>
            <div className='profile-socials'>
                <div className='youtube-link'>
                    <span className="fab fa-youtube" aria-hidden="true"></span>
                    {creator.youtube}
                </div>
                <div className='twitter-link'>
                    <span className="fab fa-twitter" aria-hidden="true"></span>
                    {creator.twitter}
                </div>
                <div className='instagram-link'>
                    <span className="fab fa-instagram" aria-hidden="true"></span>
                    {creator.instagram}
                </div>
            </div>
        </div>
        <div className="add-delete-buttons">
            <Link to={`/creators/${creator.id}/edit`} className="edit-button">
                Edit
            </Link>
            <button type="delete" onClick={handleDelete}>Delete</button>
        </div>
    </div>
  );
};

export default ViewCreator;