import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import styles from "./AuthForm.module.css";

function AuthForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [newAccount, setNewAccount] = useState(true);
	const [error, setError] = useState("");

	const onChange = (event) => {
		const { name, value } = event.target;
		if (name === "email") {
			setEmail(value);
		} else if (name === "password") {
			setPassword(value);
		}
	};
	const onSubmit = async (event) => {
		event.preventDefault();
		const auth = getAuth();
		try {
			let data;
			if (newAccount) {
				// create new account
				data = await createUserWithEmailAndPassword(auth, email, password);
			} else {
				// Login
				data = await signInWithEmailAndPassword(auth, email, password);
			}
			console.log(data);
		} catch (error) {
			console.log(error);
			setError(error.message.replace("Firebase:", ""));
		}
	};
	const toggleAccount = () => {
		setNewAccount((prev) => !prev);
	};

	return (
		<>
			<form onSubmit={onSubmit} className={styles.container}>
				<input
					name="email"
					type="email"
					placeholder="Email"
					required
					value={email}
					onChange={onChange} // onChange는 필수
					className={styles.input}
				/>
				<input
					name="password"
					type="password"
					placeholder="Password"
					value={password}
					onChange={onChange}
					className={styles.input}
					required
				/>
				<input
					type="submit"
					value={newAccount ? "Create Account" : "Login"}
					className={styles.submit}
				/>
				{error && <span className={styles.error}>{error}</span>}
			</form>
			<span onClick={toggleAccount} className={styles.switch}>
				{newAccount ? "Login" : "Create Account"}
			</span>
		</>
	);
}

export default AuthForm;
