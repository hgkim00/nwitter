import React, { useState } from "react";

function Home() {
	const [nweet, setNweet] = useState("");

	const onSubmit = (event) => {
		event.preventDefault();
	};
	const onChange = (event) => {
		const { value } = event.target;
		setNweet(value);
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input
					value={nweet}
					onChange={onChange}
					type="text"
					placeholder="What's on your mind?"
					maxLength={120}
				/>
				<input type="submit" value="Nweet" />
			</form>
		</div>
	);
}

export default Home;