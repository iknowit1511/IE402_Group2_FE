import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/tour_booking_management',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;