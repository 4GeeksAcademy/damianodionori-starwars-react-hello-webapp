import { useParams } from "react-router";
import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Information = () => {
  const { store } = useContext(Context);
  const { kind, uid } = useParams(); // kind can be any of: "planets", "people" or "starships"

  // store["planets"] when kind = "planets" when URL is /planets/1
  const entityData = store[kind].find((entity) => entity.uid === uid);

  console.log("entity", entityData);

  return (
    <>
      {entityData && (
        <div className="container mt-5">
          {kind === "people" && (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{entityData.name}</h5>
                <p className="card-text">Skin color: {entityData.details.properties.skin_color}</p>
                <p className="card-text">Mass: {entityData.details.properties.mass}</p>
                <p className="card-text">Height: {entityData.details.properties.height}</p>
                <p className="card-text">{entityData.details.description}</p>
              </div>
            </div>
          )}
          {kind === "planets" && (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{entityData.name}</h5>
                <p className="card-text">Gravity: {entityData.details.properties.gravity}</p>
                <p className="card-text">Population: {entityData.details.properties.population}</p>
                <p className="card-text">Terrain: {entityData.details.properties.terrain}</p>
                <p className="card-text">Climate: {entityData.details.properties.climate}</p>
                <p className="card-text">{entityData.details.description}</p>
              </div>
            </div>
          )}
          {kind === "starships" && (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{entityData.name}</h5>
                <p className="card-text">Crew: {entityData.details.properties.crew}</p>
                <p className="card-text">Length: {entityData.details.properties.length}</p>
                <p className="card-text">Model: {entityData.details.properties.model}</p>
                <p className="card-text">Starship Class: {entityData.details.properties.starship_class}</p>
                <p className="card-text">{entityData.details.description}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
