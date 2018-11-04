import React from "react";
import Dropzone from "react-dropzone";

const ImageUpload = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24">
			<path d="M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v2h-3zm-3 4V8h-3V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8h-3zM5 19l3-4 2 3 3-4 4 5H5z" />
			<path d="M0 0h24v24H0z" fill="none" />
		</svg>
	);
};

const ChatRoom = (props) => {
	let messagesEnd = React.createRef();

	function scrollToBottom() {
		messagesEnd.current.scrollIntoView({ behavior: "smooth" });
	}

	const { messages, sendMessage, message } = props;

	const chatMessages = messages.map((user) => {
		let time = new Date(user.timestamp);
		let humanReadableTimestamp =
			time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
		console.log("human readable time ", humanReadableTimestamp);
		return (
			<div className="message">
				<div
					key={user.username + humanReadableTimestamp}
					className="message-username">
					{user.username} <span>-{humanReadableTimestamp}</span>
				</div>
				{user.image ? (
					<img src={user.image} />
				) : (
					<div className="message-content">{" " + user.message}</div>
				)}
			</div>
		);
	});

	return (
		<div className="main-room-container">
			<div className="messages-container">
				<img src={props.image} />
				{chatMessages}
				<div className="spacer" ref={messagesEnd} />
			</div>

			<div className="input-containers">
				<Dropzone
					accept="image/png"
					onChange={(file) => props.grabFile(file.target)}
					type="file"
					className="dropzone">
					<ImageUpload />
				</Dropzone>
				<input
					autoFocus={true}
					onKeyPress={(e) => {
						if (e.key === "Enter" && message) sendMessage();
						scrollToBottom();
					}}
					name="message"
					onChange={(e) =>
						props.changeHandler(e.target.name, e.target.value)
					}
					value={message}
				/>
				<button
					onClick={() => {
						console.log("dfgdfgsdfgsdfg", message);
						if (message) {
							sendMessage();
							scrollToBottom();
						}
					}}>
					Send
				</button>
			</div>
		</div>
	);
};

export default ChatRoom;
