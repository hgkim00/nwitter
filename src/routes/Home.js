import Nweet from "components/Nweet";
import {
	addDoc,
	getDocs,
	collection,
	getFirestore,
	query,
	orderBy,
	onSnapshot,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

function Home(props) {
	const { userObj } = props;
	console.log(userObj);
	const [nweet, setNweet] = useState("");
	const [nweets, setNweets] = useState([]);
	const db = getFirestore();
	// const getNweets = async () => {
	// 	const querySnapshot = await getDocs(collection(db, "nweets"));
	// 	querySnapshot.forEach((doc) => {
	// 		const nweetObj = {
	// 			...doc.data(),
	// 			id: doc.id,
	// 		};
	// 		setNweets((prev) => [...prev, nweetObj]);
	// 	});
	// };
	// 구식의 방법임.
	useEffect(() => {
		// getNweets();
		const q = query(collection(db, "nweets"), orderBy("createdAt", "desc"));
		onSnapshot(q, (snapshot) => {
			const nweetArr = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setNweets(nweetArr);
		});
	}, []);
	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			await addDoc(collection(db, "nweets"), {
				text: nweet,
				createdAt: Date.now(),
				creatorId: userObj.uid,
			});
			setNweet("");
		} catch (error) {
			console.error(error);
		}
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

			<div>
				{nweets.map((nweet) => (
					<Nweet
						key={nweet.id}
						nweetObj={nweet}
						isOwner={nweet.creatorId === userObj.uid}
					/>
				))}
			</div>
		</div>
	);
}

export default Home;
