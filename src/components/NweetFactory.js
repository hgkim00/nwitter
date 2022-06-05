import { addDoc, collection, getFirestore } from "firebase/firestore";
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadString,
} from "firebase/storage";
import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./NweetFactory.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

function NweetFactory(props) {
	const { userObj } = props;
	const [nweet, setNweet] = useState("");
	const [attachment, setAttachment] = useState("");

	const db = getFirestore();
	const storage = getStorage();

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
		<form onSubmit={onSubmit}>
			<div className={styles.container}>
				<input
					className={styles.factoryInput_input}
					value={nweet}
					onChange={onChange}
					type="text"
					placeholder="What's on your mind?"
					maxLength={120}
				/>
				<input
					type="submit"
					value="&rarr;"
					className={styles.factoryInput_arrow}
				/>
			</div>
			<label htmlFor="attach-file">
				<span>Add photos</span>
				<FontAwesomeIcon icon={faPlus} />
			</label>
			<input
				id="attach-file"
				type="file"
				accept="image/*"
				onChange={onFileChange}
				ref={fileInput}
				style={{ opacity: 0 }}
			></input>
			{attachment ? (
				<div className={styles.attachment}>
					<img
						src={attachment}
						style={{ backgroundImage: attachment }}
						alt=""
					/>
					<div onClick={onClearAttachment} className={styles.clear}>
						<span>Remove</span>
						<FontAwesomeIcon icon={faTimes} />
					</div>
				</div>
			) : null}
		</form>
	);
}

export default NweetFactory;
