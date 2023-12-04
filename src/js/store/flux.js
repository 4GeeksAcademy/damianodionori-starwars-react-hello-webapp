const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			people: [],
			planets: [],
			starships: [],
			favorites: [],
		},
		actions: {
			getPeople: async () => {
				const store = getStore();
				const textResponse = await fetch("https://www.swapi.tech/api/people");
				const jsonResponse = await textResponse.json();
				setStore({ ...store, people: jsonResponse.results });
			},
			getPlanets: async () => {
				const store = getStore();
				const textResponse = await fetch("https://www.swapi.tech/api/planets")
				const jsonResponse = await textResponse.json();
				setStore({ ...store, planets: jsonResponse.results });
			},
			getStarships: async () => {
				const store = getStore();
				const textResponse = await fetch("https://www.swapi.tech/api/starships");
				const jsonResponse = await textResponse.json();
				setStore({ ...store, starships: jsonResponse.results });
			},
			getPeopleDetails: async () => {
				const store = getStore();

				const newPeopleWithDetails = await Promise.all(store.people.map(async (person) => {
					const textResponse = await fetch(person.url);
					const jsonResponse = await textResponse.json();
					return { ...person, details: jsonResponse.result };
				}));

				setStore({ ...store, people: newPeopleWithDetails });
			},
			getPlanetsDetails: async () => {
				const store = getStore();

				const newPlanetsWithDetails = await Promise.all(store.planets.map(async (planet) => {
					const textResponse = await fetch(planet.url);
					const jsonResponse = await textResponse.json();
					return { ...planet, details: jsonResponse.result };
				}));

				setStore({ ...store, planets: newPlanetsWithDetails });
			},
			getStarshipsDetails: async () => {
				const store = getStore();

				const newStarshipsWithDetails = await Promise.all(store.starships.map(async (starship) => {
					const textResponse = await fetch(starship.url);
					const jsonResponse = await textResponse.json();
					return { ...starship, details: jsonResponse.result };
				}));

				setStore({ ...store, starships: newStarshipsWithDetails });
			},
			addToFavorites: (item) => {
				const store = getStore();
				const updatedFavorites = [...store.favorites, item];
				setStore({ ...store, favorites: updatedFavorites });
			  },
		}
	};
};

export default getState;