import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchUser } from "../service/UserService";

const TableUser = (props) => {
    const [listUser, setListUser] = useState([]);

    useEffect(() => {
        //call api
        getUsers();
    }, []);

    const getUsers = async () => {
        let res = await fetchUser();
        if (res && res.data && res.data.data) {
            setListUser(res.data.data);
        }
    };
    
    console.log(listUser);
    return (
        <>
            <Table class="table mt-2" striped bordered hover>
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Email</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser &&
                        listUser.length > 0 &&
                        listUser.map((item, index) => {
                            return (
                                <tr key={`user-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td>action</td>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>
        </>
    );
};

export default TableUser;
