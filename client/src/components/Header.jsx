import React from 'react'
import propTypes from "prop-types";

const Header = ({ isTyping }) => {
	return (
		<div>
			<h2>Climate Coach GPT</h2>
			<p>Introduce yourself and tell me about your business</p>
			<p>
				I&apos;ll try and give you climate advice to the best of my ability
				{isTyping ? "😆" : "😃"}
			</p>
		</div>
	);
};

Header.propTypes = {
	isTyping: propTypes.bool
};

export default Header;
