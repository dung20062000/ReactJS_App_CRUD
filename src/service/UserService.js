import axios from './CustomAxios';


const fetchUser = (page) => {
    return axios.get(`/api/users?page=${page}`)
}

const createUser = (name, job) => {
    return axios.post(`/api/users`, {name, job})
}
export { fetchUser, createUser };