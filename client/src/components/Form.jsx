import React from 'react'
import propTypes from "prop-types";

const Form = ({ updateChat, message, setMessage, setIsTyping }) => {

	console.log(updateChat)

	const handleSubmit = (e) => {
		setIsTyping(true);
		updateChat(e, message);
		console.log("message updated", message)
	};

	const handleChange = (e) => {
		setMessage(e.target.value);
	};

	return (
		<>
			<form action="" onSubmit={handleSubmit}>
				<input
					type="text"
					name="message"
					value={message}
					placeholder="Please type a message here.."
					onChange={handleChange}
				></input>
			</form>
		</>
	);
};

Form.propTypes = {
	updateChat: propTypes.func,
	message: propTypes.string,
	setMessage: propTypes.func,
	setIsTyping: propTypes.func
};

export default Form;
