import React from 'react';
import { Link } from 'react-router-dom';

const EntityCard = ({ uid, name, linkPath, buttonText }) => (
  <div className="col-md-4 mb-4">
  <div className="card">
      <img src="https://placehold.co/500x325" className="card-img-top" alt="..." />
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title">{name}</h5>
        </div>
        <div className="text-center">
          <Link to={`/information/${linkPath}/${uid}`} className="btn btn-success my-button">
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default EntityCard;
