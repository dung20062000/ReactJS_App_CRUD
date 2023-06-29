import axios from './CustomAxios';


const fetchUser = (page) => {
    return axios.get(`/api/users?page=${page}`)
}

const createUser = (name, job) => {
    return axios.post(`/api/users`, {name, job})
}

const updateUser = (name, job) => {
    return axios.put("/api/users", {name, job})
}
const deleteUser = (id) => {
    return axios.delete(`/api/users/${id}`)
}
export { fetchUser, createUser, updateUser, deleteUser };