import axios from 'axios';
export default axios.create({
    // baseURL: 'http://localhost:3000/api/v1/admin',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }
});