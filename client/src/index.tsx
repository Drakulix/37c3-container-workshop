import { Component, render } from 'preact';
import './style.css';
import dockerNames from 'docker-names';

const randomColor = Math.floor(Math.random() * 16777215).toString(16);
const randomName = dockerNames.getRandomName();

type ChatMessage = {
	color: string,
	name: string,
	msg: string,
}
type State = {
	chat: ChatMessage[],
}

class App extends Component<{}, State> {
	state = { chat: [] };
	socket = null;

	componentDidMount() {
		fetch("chat")
			.then(resp => resp.json())
			.then(json => {
				console.log(json);
				this.setState({
					chat: json,
				});
				this.socket = new WebSocket(location.origin.replace(/^http/, 'ws') + "/ws");
				this.socket.addEventListener("message", e => {
					let entry = JSON.parse(e.data);
					this.setState({
						chat: [
							...this.state.chat,
							entry,
						]
					})
				})
			})
	}

	componentWillUnmount() {
		this.socket = null;
	}

	onSubmit = (e: Event) => {
		const event = {
			color: e.target[0].value ? e.target[0].value : randomColor,
			username: e.target[1].value ? e.target[1].value : randomName,
			msg: e.target[2].value,
		};
		if (this.socket) {
			this.socket.send(JSON.stringify(event));
			e.target[2].value = "";
		} else {
			console.log("Missing socket connection");
		}
		e.preventDefault();
	}

	render(_, { chat }) {
		return (
			<div>
				<h1>Simple Chat app</h1>
				<table class="messages">
					{
						chat.map((msg: ChatMessage) => {
							return (
								<tr>
									<th><b style={{ color: "#" + msg.color }}>{msg.username}:</b></th>
									<th>{msg.msg}</th>
								</tr>
							);
						})
					}
				</table>
				<form id="footer" onSubmit={this.onSubmit}>
					<Input id="color" label="Your Color" default={randomColor} />
					<Input id="name" label="Your Name" default={randomName} />
					<Input id="message" label="Message" />
					<button id="send" type="submit">Send</button>
				</form>
			</div >
		);
	}
}

function Input(props) {
	return (
		<div class={props.id} style={{
			display: "flex", flexFlow: "row nowrap", alignItems: "stretch",
		}}>
			<label for={props.id} class="form-label" style={{ marginRight: "10px" }}>{props.label}:</label>
			<input id={props.id} type="text" placeholder={props.default} style={{ flex: "1 1 auto" }} />
		</div >
	);
}

render(<App />, document.getElementById('app'));
