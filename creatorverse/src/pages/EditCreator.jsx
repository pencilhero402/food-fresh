import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const EditCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: '',
    youtube: '',
    twitter: '',
    instagram: '',
  });

  // Fetch creator data by ID
  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase.from('creators').select('*').eq('id', id).single();

      if (error) {
        console.error('Error fetching creator:', error);
      } else {
        setFormData(data);
      }
    };

    fetchCreator();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      youtube: formData.youtube.startsWith('http') ? formData.youtube : `https://${formData.youtube}`,
      twitter: formData.twitter.startsWith('http') ? formData.twitter : `https://${formData.twitter}`,
      instagram: formData.instagram.startsWith('http') ? formData.instagram : `https://${formData.instagram}`,
    };

    const { error } = await supabase
      .from('creators')
      .update(updatedData)
      .eq('id', id);

    if (error) {
      console.error('Error updating creator:', error);
      alert('Error updating creator');
    } else {
      alert('Creator updated!');
      navigate(`/creators/${id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="editCreatorForm">
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        name="name"
        required
        value={formData.name}
        onChange={handleChange}
      />

      <label htmlFor="image">Image</label>
      <p>Provide a link to an image of your creator. Be sure to include the http://</p>
      <input
        type="text"
        id="image"
        name="image"
        required
        value={formData.image}
        onChange={handleChange}
      />

      <label htmlFor="description">Description</label>
      <p>Provide a description of the creator. Who are they? What makes them interesting?</p>
      <textarea
        id="description"
        name="description"
        rows="3"
        cols="50"
        required
        value={formData.description}
        onChange={handleChange}
      />

      <h3>Social Media Links</h3>
      <p>Provide at least one of the creator's social media links.</p>

      <label htmlFor="youtube">
        <span className="fa-brands fa-youtube" aria-hidden="true"></span> YouTube
      </label>
      <input
        type="text"
        id="youtube"
        name="youtube"
        value={formData.youtube}
        onChange={handleChange}
      />

      <label htmlFor="twitter">
        <span className="fa-brands fa-twitter" aria-hidden="true"></span> Twitter
      </label>
      <input
        type="text"
        id="twitter"
        name="twitter"
        value={formData.twitter}
        onChange={handleChange}
      />

      <label htmlFor="instagram">
        <span className="fa-brands fa-instagram" aria-hidden="true"></span> Instagram
      </label>
      <input
        type="text"
        id="instagram"
        name="instagram"
        value={formData.instagram}
        onChange={handleChange}
      />

      <button type="submit">Update Creator</button>
    </form>
  );
};

export default EditCreator;
