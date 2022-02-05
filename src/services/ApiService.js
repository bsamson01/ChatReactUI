class ApiService {
    constructor() {
        this.apiUrl = 'https://chatserver-bsam.herokuapp.com/api';
        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });
    }

    get(url) {
        return fetch(this.apiUrl + url, {
            method: 'GET',
            headers: this.headers
        })
            .then(response => response.json())
            .catch(error => console.log(error));
    }

    post(url, data) {
        return fetch(this.apiUrl + url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .catch(error => console.log(error));
    }

    put(url, data) {
        return fetch(this.apiUrl + url, {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .catch(error => console.log(error));
    }

    delete(url) {
        return fetch(this.apiUrl + url, {
            method: 'DELETE',
            headers: this.headers
        })
            .then(response => response.json())
            .catch(error => console.log(error));
    }
}

export default ApiService