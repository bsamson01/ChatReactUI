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
        return Promise.resolve(this.socket)
    }

    isOpen() {
        return this.socket.readyState === WebSocket.OPEN;
    }
    
    send(message) {
        if(!this.isOpen()) {
            this.open().then(() => {
                this.socket.send(JSON.stringify(message));
            }).catch(() => {
                console.log('Failed to open WebSocket connection');
            });
        } else {
            this.socket.send(JSON.stringify(message));
        }
    }
}

export default WebSocketService