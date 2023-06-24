import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchUser } from "../service/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNewUser from "./ModalAddNewUser";

const TableUser = (props) => {
    const [listUser, setListUser] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        //call api
        getUsers();
    }, []);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState();

    const handleClose = () => {
        setIsShowModalAddNew(false);
    };

    const getUsers = async (page) => {
        let res = await fetchUser(page);
        if (res && res.data && res.data) {
            setListUser(res.data);
            setTotalUsers(res.total);
            setTotalPage(res.total_pages);
        }
    };
    const handleUpdate = (user) => {
        setListUser([user, ...listUser])
    }

    const handlePageClick = (event) => {
        getUsers(+event.selected + 1);
    };

    
    return (
        <>
            <div>
                <div className="my-3 text-uppercase text-center title">
                    List User{" "}
                </div>
                <div>
                    <button
                        type="button"
                        className="btn btn-primary my-3"
                        onClick={() => setIsShowModalAddNew(true)}
                    >
                        Add New User +
                    </button>
                </div>
            </div>
            <Table className="table mt-2" striped bordered hover>
                <thead className="thead-dark">
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
                nextLabel="🖤>"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPage}
                previousLabel="<🖤"
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
            <ModalAddNewUser
                show={isShowModalAddNew}
                handleClose={handleClose}
                handleUpdate={handleUpdate}
            />
        </>
    );
};

export default TableUser;
