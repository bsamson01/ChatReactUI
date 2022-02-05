class WebSocketService {
    constructor(socket) {
        this.socket = socket;
    }
    
    init() {
        this.socket.on('connect', () => {
            console.log('Connected to server');
        });
    
        this.socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });
    
        this.socket.on('message', (message) => {
            console.log('Message from server', message);
        });
    }
    
    send(message) {
        this.socket.emit('message', message);
    }
}