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
			const textResponse = await fetch('https://www.swapi.tech/api/people');
			const jsonResponse = await textResponse.json();
			setStore({ ...getStore(), people: jsonResponse.results });
	
			localStorage.setItem('starwars_main_data', JSON.stringify({ people: jsonResponse.results, planets: [], starships: [] }));
		  },
  
		  getPlanets: async () => {
			const textResponse = await fetch('https://www.swapi.tech/api/planets');
			const jsonResponse = await textResponse.json();
			setStore({ ...getStore(), planets: jsonResponse.results });
	
			localStorage.setItem('starwars_main_data', JSON.stringify({ people: [], planets: jsonResponse.results, starships: [] }));
		  },
  
		  getStarships: async () => {
			const textResponse = await fetch('https://www.swapi.tech/api/starships');
			const jsonResponse = await textResponse.json();
			setStore({ ...getStore(), starships: jsonResponse.results });
	
			localStorage.setItem('starwars_main_data', JSON.stringify({ people: [], planets: [], starships: jsonResponse.results }));
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
		  const updatedFavorites = [...store.favorites];
		  const { uid, linkPath } = item;
		  const existingIndex = updatedFavorites.findIndex((fav) => fav.uid === uid && fav.linkPath === linkPath);
  
		  if (existingIndex !== -1) {
			updatedFavorites.splice(existingIndex, 1);
		  } else {
			updatedFavorites.push(item);
		  }
  
		  setStore({ ...store, favorites: updatedFavorites });
		  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
		},
  
		removeFromFavorites: (uid, linkPath) => {
		  const store = getStore();
		  const updatedFavorites = store.favorites.filter(
			(favorite) => !(favorite.uid === uid && favorite.linkPath === linkPath)
		  );
  
		  setStore({ ...store, favorites: updatedFavorites });
  
		  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
		},
  
		initialize: () => {
		  const storedData = localStorage.getItem('starwars_data');
  
		  if (storedData) {
			setStore(JSON.parse(storedData));
		  } else {
			const mainData = localStorage.getItem('starwars_main_data');
  
			if (mainData) {
			  const parsedMainData = JSON.parse(mainData);
			  if (parsedMainData.people.length || parsedMainData.planets.length || parsedMainData.starships.length) {
				setStore(parsedMainData);
			  }
			} else {
			  getActions().getPeople();
			  getActions().getPlanets();
			  getActions().getStarships();
			}
		  }
		},
	  },
	};
  };
  
  export default getState;
  