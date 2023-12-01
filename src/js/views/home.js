import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
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

	return isLoading ? (<p>App's loading data from the API, please wait...</p>) : (
		<div className="text-center mt-5">
			<h1>Hello Starwars!</h1>
			<div>
				<h2>People:</h2>
				{store.people.map((person) => (
					<div key={person.uid}>
						<p>{person.name}</p>
						<Link to={`/information/people/${person.uid}`}><button className="btn btn-primary">Go person's details</button></Link>
					</div>
				))}
			</div>
			<div>
				<h2>Planets:</h2>
				{store.planets.map((planet) => (
					<div key={planet.uid}>
						<p>{planet.name}</p>
						<Link to={`/information/planets/${planet.uid}`}><button className="btn btn-primary">Go planet's details</button></Link>
					</div>
				))}
			</div>
			<div>
				<h2>Starships:</h2>
				{store.starships.map((starship) => (
					<div key={starship.uid}>
						<p>{starship.name}</p>
						<Link to={`/information/starships/${starship.uid}`}><button className="btn btn-primary">Go starship's details</button></Link>
					</div>
				))}
			</div>
		</div>
	);
};