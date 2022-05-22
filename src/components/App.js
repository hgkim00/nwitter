import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";

function App() {
	const [init, setInit] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userObj, setUserObj] = useState(null);

	const auth = getAuth();
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setIsLoggedIn(true);
				if (user.displayName == null) {
					const name = user.email.split("@")[0];
					user.displayName = name;
				}
				setUserObj({
					displayName: user.displayName,
					uid: user.uid,
					updateProfile: (args) =>
						updateProfile(user, { displayName: user.displayName }),
				});
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
	const refreshUser = () => {
		const user = auth.currentUser;
		setUserObj({
			displayName: user.displayName,
			uid: user.uid,
			updateProfile: (args) =>
				updateProfile(user, { displayName: user.displayName }),
		});
	};

	return (
		<>
			{init ? (
				<AppRouter
					refreshUser={refreshUser}
					isLoggedIn={isLoggedIn}
					userObj={userObj}
				/>
			) : (
				"Initializing..."
			)}
			{/* <footer>&copy; Copyright Nwitter {new Date().getFullYear()}</footer> */}
		</>
	);
}

export default App;
