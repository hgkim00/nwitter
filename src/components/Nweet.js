import React, { useState } from "react";
import { doc, deleteDoc, getFirestore, updateDoc } from "firebase/firestore";

function Nweet(props) {
	const { nweetObj, isOwner } = props;
	const [editing, setEditing] = useState(false);
	const [newNweet, setNewNweet] = useState(nweetObj.text);

	const db = getFirestore();
	const onDeleteClick = async () => {
		const ok = window.confirm("정말로 이 느윗을 삭제하시겠습니까?");
		if (ok) {
			//delete
			await deleteDoc(doc(db, "nweets", `${nweetObj.id}`));
			alert("느윗이 삭제되었습니다.");
		}
	};
	const toggleEditing = () => setEditing((prev) => !prev);
	const onSubmit = async (event) => {
		event.preventDefault();
		await updateDoc(doc(db, "nweets", `${nweetObj.id}`), { text: newNweet });
		alert("느윗이 수정되었습니다.");
		setEditing(false);
	};
	const onChange = (event) => {
		const { value } = event.target;
		setNewNweet(value);
	};

	return (
		<div>
			{editing ? (
				<>
					<form onSubmit={onSubmit}>
						<input
							type="text"
							placeholder="Edit your nweet"
							value={newNweet}
							required
							onChange={onChange}
						/>
						<input type="submit" value="수정"></input>
					</form>
					<button onClick={toggleEditing}>Cancel</button>
				</>
			) : (
				<>
					<h4>{nweetObj.text}</h4>
					{isOwner ? (
						<>
							<button onClick={onDeleteClick}>Delete</button>
							<button onClick={toggleEditing}>Edit</button>
						</>
					) : null}
				</>
			)}
		</div>
	);
}

export default Nweet;
