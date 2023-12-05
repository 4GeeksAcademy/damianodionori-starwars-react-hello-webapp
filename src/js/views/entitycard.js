import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';

const EntityCard = ({ uid, name, linkPath, buttonText }) => {
  const { store, actions } = useContext(Context);
  const [isFavorite, setFavorite] = useState(false);

  useEffect(() => {
    const isItemInFavorites = store.favorites.some((favorite) => favorite.uid === uid && favorite.linkPath === linkPath);
    setFavorite(isItemInFavorites);
  }, [store.favorites, uid, linkPath]);

  const handleFavoriteClick = () => {
    setFavorite((prevFavorite) => !prevFavorite);
    if (isFavorite) {
      actions.removeFromFavorites(uid, linkPath);
    } else {
      const item = { uid, name, linkPath, buttonText };
      actions.addToFavorites(item);
    }
  };


  return (
    <div className="col-md-4 p-4 m-3">
      <div className="card border">
        <img src="https://placehold.co/400x250" className="card-img-top" alt="..." style={{ height: '200px', objectFit: 'cover' }} />
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 className="card-title text-dark font-weight-bold mb-4">{name}</h5>
          </div>
          <div className="text-center">
            <div className="d-flex justify-content-between mb-2">
              <Link to={`/information/${linkPath}/${uid}`} className="btn btn-success my-button">
                {buttonText}
              </Link>
              <button
                className={`btn ${isFavorite ? 'btn-danger' : 'btn-warning'} my-button`}
                onClick={handleFavoriteClick}
              >
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EntityCard;
