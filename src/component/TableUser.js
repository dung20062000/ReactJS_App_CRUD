import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchUser } from "../service/UserService";
import ReactPaginate from "react-paginate";

const TableUser = (props) => {
    const [listUser, setListUser] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        //call api
        getUsers();
    }, []);

    const getUsers = async (page) => {
        let res = await fetchUser(page);
        if (res && res.data && res.data) {
            console.log(res)

            setListUser(res.data);
            setTotalUsers(res.total)
            setTotalPage(res.total_pages)
        }
    };
    const handlePageClick = (event) => {
        console.log('check event: ' , event)
        getUsers(+event.selected + 1);
    };

    console.log(totalUsers);
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
            <ReactPaginate
                breakLabel="..."
                nextLabel=" >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPage}
                previousLabel="<"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
            />
        </>
    );
};

export default TableUser;
