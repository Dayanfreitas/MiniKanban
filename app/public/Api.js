const API = axios.create({
    baseURL: 'http://localhost:3333',
    timeout: 30000,
    headers: {
        'Authorization':`Bearer ${Data.getToken()}`,
    }
})
