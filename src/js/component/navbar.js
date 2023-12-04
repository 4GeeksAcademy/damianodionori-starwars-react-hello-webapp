import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/navbar.css";

export const Navbar = () => {
	const { store } = useContext(Context);

	return (
		<nav className="navbar navbar-light bg-dark mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">
					<button type="button" className="btn btn-dark" id="icon">
						<img className="starWarsLogo" src="https://cdn.worldvectorlogo.com/logos/star-wars.svg" alt="Star Wars logo vector" />
					</button>
				</span>
			</Link>
			<div className="ml-auto btn btn-light">
				<div className="btn-group">
					<button
						type="button"
						className="dropdown-toggle"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						Favorites{' '}
						{store.favorites.length > 0 && (
							<span className="badge bg-secondary ms-1">{store.favorites.length}</span>
						)}
					</button>
					<ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
						{store.favorites.length === 0 ? (
							<li>
								<span className="dropdown-item">You don't have any favorite yet</span>
							</li>
						) : (
							store.favorites.map((favorite, index) => (
								<li key={index}>
									<Link
										to={`/information/${favorite.linkPath}/${favorite.uid}`}
										className="dropdown-item"
									>
										{favorite.name}
									</Link>
								</li>
							))
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};