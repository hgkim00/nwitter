import { getAuth, updateProfile } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
	collection,
	query,
	where,
	getDocs,
	getFirestore,
} from "firebase/firestore";

function Profile(props) {
	const { refreshUser, userObj } = props;
	const [newDisplayName, setNewDisplayName] = useState(
		`${userObj.displayName}`
	);

	const navigate = useNavigate();
	const auth = getAuth();
	const onLogoutClick = () => {
		auth.signOut();
		navigate("/");
	};
	const db = getFirestore();
	const getMyNweets = async () => {
		const q = query(
			collection(db, "nweets"),
			where("creatorId", "==", userObj.uid)
		);
		const nweets = await getDocs(q);
		nweets.forEach((doc) => {
			console.log(doc.id, "=>", doc.data());
		});
	};

	useEffect(() => {
		getMyNweets();
	}, []);

	const onChange = (event) => {
		const { value } = event.target;
		setNewDisplayName(value);
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		if (userObj.displayName !== newDisplayName) {
			await updateProfile(auth.currentUser, {
				displayName: newDisplayName,
			});
			refreshUser();
			console.log(userObj);
		}
	};

	return (
		<>
			<form onSubmit={onSubmit}>
				<input
					onChange={onChange}
					type="text"
					value={newDisplayName}
					placeholder="Display Name"
				/>
				<input type="submit" value="Update Display Name" />
			</form>
			<button onClick={onLogoutClick}>Logout</button>
		</>
	);
}

export default Profile;
