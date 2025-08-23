import React from 'react';
import { supabase } from '../client';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './AddCreator.css';;

function AddCreatorForm() {
  const handleSubmit = async (e) => {
    e.preventDefault(); // stop page reload

    const form = e.target;

    const data = {
        name: form.name.value,
        image: form.image.value,
        description: form.description.value,
        youtube: 'https://' + form.youtube.value,
        twitter: 'https://' + form.twitter.value,
        instagram: 'https://' + form.instagram.value,
    };

    try {
        const { error } = await supabase
        .from('creators')
        .insert(data)
        if (error) throw error;

        alert('Creator added!');
        form.reset();
      } catch (err) {
      console.error(err);
      alert('Error submitting form');
    }
  };

  return (
    <form id="addCreatorForm" onSubmit={handleSubmit} className="addCreatorForm">
      <label>Name</label>
      <input id="name" type="text" name="name" required defaultValue="" />

      <label>
        Image
        <p>Provide a link to an image of your creator. Be sure to include the http://</p>
      </label>
      <input type="text" id="image" name="image" required defaultValue="" />

      <label>
        Description
        <p>Provide a description of the creator. Who are they? What makes them interesting?</p>
      </label>
      <textarea id="description" name="description" rows="3" cols="50" required />

      <h3>Social Media Links</h3>
      <p>Provide at least one of the creator's social media links.</p>
      <span className="fa-brands fa-youtube" aria-hidden="true"></span>
      Youtube
      <p>The creator's YouTube handle (without the @)</p>
      <input type="text" id="youtube" name="youtube" defaultValue="" />
      <span className="fa-brands fa-twitter" aria-hidden="true"></span>
      Twitter
      <p>The creator's Twitter handle (without the @)</p>
      <input type="text" id="twitter" name="twitter" defaultValue="" />
      <span className="fa-brands fa-instagram" aria-hidden="true"></span>
      Instagram
      <p>The creator's Instagram handle (without the @)</p>
      <input type="text" id="instagram" name="instagram" defaultValue="" />
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddCreatorForm;
