import React from "react"
import { ReactSession } from 'react-client-session'
import moment from 'moment'
import { WebSocketService, ApiService } from '../services'
import { ParticlesComponent } from '../components'

class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: ReactSession.get('user'),
            messages: [],
            currentMessage: "",
            chatsList: [],
            activeChannelId: "",
            apiService: new ApiService(),
            socketService: new WebSocketService()
        };
    }

    addMessage(message) {
        this.setState({
            messages: [...this.state.messages, message]
        });
    }

    componentDidMount() {
        this.state.socketService.init(this.addMessage.bind(this));
    }

    onMessageSubmit(e, state) {
        e.preventDefault();
        const { currentMessage, user, activeChannelId } = state;

        if (currentMessage.trim() === '') {
            return;
        }
        const message = {
            senderId: user._id,
            senderName: user.name,
            message: currentMessage,
            channel_id: activeChannelId,
            created_at: new Date()
        };

        this.state.socketService.send(message);
        this.setState({ currentMessage: '' });
    }

	setActiveChat(chatId) {
		if (chatId !== this.state.activeChannelId) {
            this.setState({ activeChannelId: chatId, messages: [] });
			this.getMessages(chatId);
		}	
	}

	getMessages(chatId) {
        this.state.apiService.post('/chat/messages', { channel_id : chatId }).then(res => {
            const data = res.json();
            this.setState({ messages: data });
        });
	}

	getChatsList() {

        this.state.apiService.post('/chat', { user_id : this.state.user._id }).then(res => {
            const data = res.json();
            this.setState({ chatsList: data });
 
			if (this.state.activeChannelId === '' && data.length > 0) {
                this.setState({ activeChannelId: data[0]._id });
			}
        });
    }

	isCurrentUser = (senderId) => {
		return senderId === this.state.user._id; 
	}

	renderChat = () => {
		return this.state.messages.map(({ message, image, createdAt, senderId, senderName}, index) => (

			<div key={index} className={"toast show mb-2 " + (this.isCurrentUser(senderId) ? "text-white bg-dark" : "ms-auto text-dark") } role="alert" aria-live="assertive" aria-atomic="true">
				<div className="toast-header">
					<img src="..." className="rounded mr-2" alt=""/>
					<strong className="mr-auto">{senderName} </strong>
					<small className="text-muted ms-auto"> {moment.utc(createdAt).local().fromNow()}</small>
				</div>
				<div className="toast-body">
					{image ? <img src={"data:image/png;base64, " + image} alt="" className="img-fluid"/> : message}
				</div>
			</div>
		))
	}

    render() {
        return (
            <div >
                <ParticlesComponent/>
                <section className="vh-100 pb-5 mb-5 content" >
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-white bg-dark" >
                                <div className="d-flex justify-content-center">
                                    <div className="col-md-8 col-sm-12">
                                        <div className="chat-container border overflow-auto pt-2 px-3">
                                            {this.renderChat()}
                                        </div>
        
                                        <form onSubmit={(e) => this.onMessageSubmit(e, this.state)}>
                                            <div className="input-group">
                                                <input type="text" name="currentMessage" className="form-control" value={this.state.currentMessage}  onChange={(e) => {this.setState({currentMessage: e.target.value})}} />
                                                <div className="input-group-append">
                                                    <button onClick={(e) => this.onMessageSubmit(e, this.state)} className="btn btn-outline-secondary" type="button">Send</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
        
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }  
}

export default Chat;
