import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

function AppRouter(props) {
	const { isLoggedIn, userObj } = props;

	return (
		<Router>
			{isLoggedIn ? <Navigation /> : null}
			<Routes>
				{isLoggedIn ? (
					<>
						<Route exact={true} path="/profile" element={<Profile />} />
						<Route exact={true} path="/" element={<Home userObj={userObj} />} />
					</>
				) : (
					<Route exact={true} path="/" element={<Auth />} />
				)}
			</Routes>
		</Router>
	);
}

export default AppRouter;
