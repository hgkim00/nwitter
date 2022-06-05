import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Navigation(props) {
	const { userObj } = props;

	return (
		<nav>
			<ul>
				<li>
					<Link to="/" className={styles.home}>
						<FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
					</Link>
				</li>
				<li>
					<Link to="/profile" className={styles.profile}>
						<FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
						<span style={{ marginTop: 10 }}>
							{userObj.displayName}'s Profile
						</span>
					</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Navigation;
