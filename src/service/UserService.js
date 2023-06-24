import axios from './CustomAxios';


const fetchUser = () => {
    return axios.get('/api/users?page=2')
}
export { fetchUser };