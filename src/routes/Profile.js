import { getAuth } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
	const navigate = useNavigate();
	const auth = getAuth();
	const onLogoutClick = () => {
		auth.signOut();
		navigate("/");
	};

	return (
		<>
			<button onClick={onLogoutClick}>Logout</button>
		</>
	);
}

export default Profile;
