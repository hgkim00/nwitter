import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";
import styles from "./Router.module.css";

function AppRouter(props) {
	const { refreshUser, isLoggedIn, userObj } = props;

	return (
		<Router>
			{isLoggedIn ? <Navigation userObj={userObj} /> : null}
			<div className={styles.container}>
				<Routes>
					{isLoggedIn ? (
						<>
							<Route
								exact={true}
								path="/profile"
								element={
									<Profile refreshUser={refreshUser} userObj={userObj} />
								}
							/>
							<Route
								exact={true}
								path="/"
								element={<Home userObj={userObj} />}
							/>
						</>
					) : (
						<Route exact={true} path="/" element={<Auth />} />
					)}
				</Routes>
			</div>
		</Router>
	);
}

export default AppRouter;
