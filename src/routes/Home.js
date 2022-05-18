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
import {
	getStorage,
	ref,
	uploadString,
	getDownloadURL,
} from "firebase/storage";
import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

function Home(props) {
	const { userObj } = props;
	const [nweet, setNweet] = useState("");
	const [nweets, setNweets] = useState([]);
	const [attachment, setAttachment] = useState("");
	const db = getFirestore();
	const storage = getStorage();
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

	const fileInput = useRef();

	const onSubmit = async (event) => {
		event.preventDefault();
		let attachmentURL = "";
		if (attachment !== "") {
			const attachmentRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
			const response = await uploadString(
				attachmentRef,
				attachment,
				"data_url"
			);
			attachmentURL = await getDownloadURL(response.ref);
		}
		const nweetDetail = {
			text: nweet,
			createdAt: Date.now(),
			creatorId: userObj.uid,
			attachmentURL,
		};
		try {
			await addDoc(collection(db, "nweets"), nweetDetail);
			setNweet("");
			setAttachment("");
		} catch (error) {
			console.error(error);
		}
	};
	const onChange = (event) => {
		const { value } = event.target;
		setNweet(value);
	};
	const onFileChange = (event) => {
		const { files } = event.target;
		const theFile = files[0];
		const reader = new FileReader();
		reader.onloadend = (event) => {
			const { result } = event.currentTarget;
			setAttachment(result);
		};
		reader.readAsDataURL(theFile);
	};
	const onClearAttachment = (event) => {
		setAttachment("");
		fileInput.current.value = null;
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
				<input
					type="file"
					accept="image/*"
					onChange={onFileChange}
					ref={fileInput}
				></input>
				<input type="submit" value="Nweet" />
				{attachment ? (
					<div>
						<img src={attachment} width="50px" height="50px" alt="" />
						<button onClick={onClearAttachment}>Clear</button>
					</div>
				) : null}
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
