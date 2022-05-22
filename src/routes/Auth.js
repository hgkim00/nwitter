import React from "react";
import {
	getAuth,
	GoogleAuthProvider,
	GithubAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import AuthForm from "components/AuthForm";

function Auth() {
	const onSocialClick = async (event) => {
		const { name } = event.target;
		let provider;
		const auth = getAuth();
		if (name === "google") {
			provider = new GoogleAuthProvider();
		} else if (name === "github") {
			provider = new GithubAuthProvider();
		}
		const data = await signInWithPopup(auth, provider);
		console.log(data);
	};

	return (
		<div>
			<AuthForm />
			<div>
				<button onClick={onSocialClick} name="google">
					Continue with Google
				</button>
				<button onClick={onSocialClick} name="github">
					Continue with GitHub
				</button>
			</div>
		</div>
	);
}

export default Auth;
