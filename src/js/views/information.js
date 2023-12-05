import { useParams } from "react-router";
import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Information = () => {
  const { store } = useContext(Context);
  const { kind, uid } = useParams(); // kind can be any of: "planets", "people" or "starships"

  // store["planets"] when kind = "planets" when URL is /planets/1
  const entityData = store[kind].find((entity) => entity.uid === uid);

  return (
    <>
      {entityData && (
        <div style={styles.container}>
          {kind === "people" && (
            <div style={styles.card}>
              <h2 style={styles.title}>Name: {entityData.name}</h2>
              <p>Skin color: {entityData.details.properties.skin_color}</p>
              <p>Mass: {entityData.details.properties.mass}</p>
              <p>Height: {entityData.details.properties.height}</p>
              <p>{entityData.details.description}</p>
            </div>
          )}
          {kind === "planets" && (
            <div style={styles.card}>
              <h2 style={styles.title}>Name: {entityData.name}</h2>
              <p>Gravity: {entityData.details.properties.gravity}</p>
              <p>Population: {entityData.details.properties.population}</p>
              <p>Terrain: {entityData.details.properties.terrain}</p>
              <p>Climate: {entityData.details.properties.climate}</p>
              <p>{entityData.details.description}</p>
            </div>
          )}
          {kind === "starships" && (
            <div style={styles.card}>
              <h2 style={styles.title}>Name: {entityData.name}</h2>
              <p>Crew: {entityData.details.properties.crew}</p>
              <p>Length: {entityData.details.properties.length}</p>
              <p>Model: {entityData.details.properties.model}</p>
              <p>Starship Class: {entityData.details.properties.starship_class}</p>
              <p>{entityData.details.description}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    maxWidth: "400px",
    margin: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "24px",
    marginBottom: "10px",
  },
};
