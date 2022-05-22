import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";

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
			<form onSubmit={onSubmit}>
				<input
					name="email"
					type="email"
					placeholder="Email"
					required
					value={email}
					onChange={onChange} // onChange는 필수
				/>
				<input
					name="password"
					type="password"
					placeholder="Password"
					value={password}
					onChange={onChange}
					required
				/>
				<input type="submit" value={newAccount ? "Create Account" : "Login"} />
				<span
					style={{
						color: "red",
					}}
				>
					{error}
				</span>
			</form>
			<span onClick={toggleAccount}>
				{newAccount ? "Login" : "Create Account"}
			</span>
		</>
	);
}

export default AuthForm;
