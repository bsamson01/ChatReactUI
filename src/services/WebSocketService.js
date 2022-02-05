class WebSocketService {
    constructor() {
        this.open();
    }
    
    init(callback) {
        this.socket.onopen = () => {
            console.log('WebSocket Client Connected');
        };
    
        this.socket.onmessage = (response) => {
            const { message } = JSON.parse(response.data);
            callback(message);
        };

        this.socket.onclose = () => {
            console.log('WebSocket Client Disconnected');
        }
    }

    open() {
        this.socket = new WebSocket('wss://chatsocket-bsam.herokuapp.com');
    }

    isOpen() {
        return this.socket.readyState === WebSocket.OPEN;
    }
    
    send(message) {
        this.socket.send(JSON.stringify(message));
    }
}

export default WebSocketService