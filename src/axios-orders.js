import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-burger-app-99d51.firebaseio.com/'
})

export default instance;
