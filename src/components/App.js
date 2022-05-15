import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
	const [init, setInit] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userObj, setUserObj] = useState(null);

	useEffect(() => {
		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setIsLoggedIn(true);
				setUserObj(user);
			} else {
				setIsLoggedIn(false);
			}
			setInit(true);
		});
	}, []);
	console.log(getAuth().currentUser);
	// setInterval(() => {
	// 	console.log(getAuth().currentUser);
	// }, 2000);
	return (
		<>
			{init ? (
				<AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
			) : (
				"Initializing..."
			)}
			<footer>&copy; Copyright Nwitter {new Date().getFullYear()}</footer>
		</>
	);
}

export default App;
