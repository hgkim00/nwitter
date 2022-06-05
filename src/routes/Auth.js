import React from "react";
import {
	getAuth,
	GoogleAuthProvider,
	GithubAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import AuthForm from "components/AuthForm";
import styles from "./Auth.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTwitter,
	faGoogle,
	faGithub,
} from "@fortawesome/free-brands-svg-icons";

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
		<div className={styles.container}>
			<FontAwesomeIcon
				icon={faTwitter}
				color={"#04AAFF"}
				size="3x"
				style={{ marginBottom: 30 }}
			/>
			<AuthForm />
			<div className={styles.btns}>
				<button onClick={onSocialClick} name="google" className={styles.btn}>
					Continue with Google <FontAwesomeIcon icon={faGoogle} />
				</button>
				<button onClick={onSocialClick} name="github" className={styles.btn}>
					Continue with GitHub <FontAwesomeIcon icon={faGithub} />
				</button>
			</div>
		</div>
	);
}

export default Auth;
