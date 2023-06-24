import axios from './CustomAxios';


const fetchUser = (page) => {
    return axios.get(`/api/users?page=${page}`)
}
export { fetchUser };