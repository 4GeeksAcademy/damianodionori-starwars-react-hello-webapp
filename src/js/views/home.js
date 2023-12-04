import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import EntityCard from "./entitycard.js";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [isLoading, setIsLoading] = useState(false);

	const handleInitialData = async () => {
		await actions.getPeople();
		await actions.getPlanets();
		await actions.getStarships();
	}

	const handleFetchDetails = async () => {
		actions.getPeopleDetails();
		actions.getPlanetsDetails();
		actions.getStarshipsDetails();
	}

	const handleAsyncCalls = async () => {
		setIsLoading(true);
		await handleInitialData();
		await handleFetchDetails();
		setIsLoading(false);
	}

	useEffect(() => {
		if (!store.people.length || !store.planets.length || !store.starships.length) {
			handleAsyncCalls();
		}
	}, []);

	console.log(store);

	return isLoading ? (
		<p className="text-center">App's loading data from the API, please wait...</p>
	  ) : (
		<div className="text-center mt-5">
		  <h1>Welcome to Starwarspedia!</h1>
	  
		  <div className="m-3 p-3">
			<h2>Characters:</h2>
			<div className="d-flex overflow-auto ">
			  {store.people.map((person) => (
				<EntityCard
				  key={person.uid}
				  uid={person.uid}
				  name={person.name}
				  linkPath="people"
				  buttonText="Go to person's details"
				/>
			  ))}
			</div>
		  </div>
	  
		  <div className="m-3 p-3">
			<h2>Planets:</h2>
			<div className="d-flex overflow-auto">
			  {store.planets.map((planet) => (
				<EntityCard
				  key={planet.uid}
				  uid={planet.uid}
				  name={planet.name}
				  linkPath="planets"
				  buttonText="Go to planet's details"
				/>
			  ))}
			</div>
		  </div>
	  
		  <div className="m-3 p-3">
			<h2>Starships:</h2>
			<div className="d-flex overflow-auto">
			  {store.starships.map((starship) => (
				<EntityCard
				  key={starship.uid}
				  uid={starship.uid}
				  name={starship.name}
				  linkPath="starships"
				  buttonText="Go to starship's details"
				/>
			  ))}
			</div>
		  </div>
		</div>
	  );
};