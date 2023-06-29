import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchUser } from "../service/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNewUser from "./ModalAddNewUser";
import ModalEditUser from "./ModalEditUser";
import ModalConfirm from "./ModalConfirm";
import _ from "lodash"

const TableUser = (props) => {
    const [listUser, setListUser] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        //call api
        getUsers();
    }, []);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

    const [isShowModalEditUser, setShowModalEditUser] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});

    const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
    const [dataUserConfirm, setDataUserConfirm] = useState({})

    const handleClose = () => {
        setIsShowModalAddNew(false);
        setShowModalEditUser(false);
        setIsShowModalConfirm(false);
    };

    const handleEditUser = (user) => {
        setDataUserEdit(user);
        setShowModalEditUser(true);
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
        setListUser([user, ...listUser]);
    };

    const handleEditUserFromTable = (user) => {
        let cloneListUser = _.cloneDeep(listUser);
        let index = listUser.findIndex(item => item.id === user.id)
        cloneListUser[index].first_name = user.first_name
        setListUser(cloneListUser);
    }

    const handlePageClick = (event) => {
        getUsers(+event.selected + 1);
    };
    const handleDeleteUser = (user) => {
        setIsShowModalConfirm(true)
        setDataUserConfirm(user);
    }
    const handleDeleteUserConfirm = (user) => {
        let cloneListUser = _.cloneDeep(listUser);
        cloneListUser = cloneListUser.filter(item => item.id !== user.id)
        setListUser(cloneListUser);
    }
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
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary"
                                            onClick={() => handleEditUser(item)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteUser(item)}
                                            type="button"
                                            className="btn btn-outline-secondary mx-2"
                                        >
                                            Delete
                                        </button>
                                    </td>
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
            <ModalEditUser
                show={isShowModalEditUser}
                handleClose={handleClose}
                dataUserEdit={dataUserEdit}
                handleEditUserFromTable={handleEditUserFromTable}
            />
            <ModalConfirm
                show= {isShowModalConfirm}
                handleClose={handleClose}
                dataUserConfirm= {dataUserConfirm}
                handleDeleteUserConfirm={handleDeleteUserConfirm}

            />
        </>
    );
};

export default TableUser;
