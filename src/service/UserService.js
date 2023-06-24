import axios from 'axios';


const fetchUser = () => {
    return axios.get('https://reqres.in/api/users?page=2')
}
export { fetchUser };