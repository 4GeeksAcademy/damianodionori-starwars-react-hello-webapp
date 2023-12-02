import React from 'react';
import { Link } from 'react-router-dom';

const EntityCard = ({ uid, name, linkPath, buttonText }) => (
  <div className="card" style={{ width: '100%', margin: '15px', padding: '15px', display: 'flex', flexDirection: 'column' }}>
    <img src="https://placehold.co/500x325" className="card-img-top" alt="..." />
    <div className="card-body text-center" style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{/* Add content here if needed */}</p>
      </div>
      <div className="text-center">
        <Link to={`/information/${linkPath}/${uid}`} className="btn btn-primary my-button">
          {buttonText}
        </Link>
      </div>
    </div>
  </div>
);

export default EntityCard;
