import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Card = ({id, name, image, description, youtube, twitter, instagram}) => {
    return (
        <div className="creator-card">
            <div className="creator-image" style={{ backgroundImage: `url(${image})` }}>
                <nav className="summary">
                    <h4 className="card-left">{name}</h4>
                    <p>{description}</p>
                </nav>
                <div className="socials">
                    <a href={youtube} target="_blank" rel="noopener noreferrer" aria-label="Visit our YouTube channel" className="social-icon youtube">
                        <span className="fab fa-youtube" aria-hidden="true"></span>
                    </a>
                    <a href={twitter} target="_blank" rel="noopener noreferrer" aria-label="Visit our Twitter profile" className="social-icon twitter">
                        <span className="fab fa-twitter" aria-hidden="true"></span>
                    </a>
                    <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Visit our Instagram profile" className="social-icon instagram">
                        <span className="fab fa-instagram" aria-hidden="true"></span>
                    </a>
                    <div className="socials-info">
                        <Link to={`/creators/${id}`} role="button">
                            <span className="fa-solid fa-circle-exclamation" aria-label="More info"></span>
                        </Link>
                        <Link to={`/creators/${id}/edit`} role="button">
                            <span className="fa-solid fa-pencil" aria-label="None"></span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;