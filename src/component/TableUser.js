import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchUser } from "../service/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNewUser from "./ModalAddNewUser";
import ModalEditUser from "./ModalEditUser";
import ModalConfirm from "./ModalConfirm";
import "./TableUser.scss";
import { debounce } from "lodash";
import _ from "lodash";
import { CSVLink, CSVDownload } from "react-csv";
import Papa from "papaparse";
import { toast } from "react-toastify";

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
    const [dataUserConfirm, setDataUserConfirm] = useState({});

    const [sortBy, setSortBy] = useState("asc");
    const [sortField, setSortField] = useState("id");

    const [keyWord, setKeyWord] = useState("");
    const [dataExport, setDataExport] = useState([]);

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
        let index = listUser.findIndex((item) => item.id === user.id);
        cloneListUser[index].first_name = user.first_name;
        setListUser(cloneListUser);
    };

    const handlePageClick = (event) => {
        getUsers(+event.selected + 1);
    };
    const handleDeleteUser = (user) => {
        setIsShowModalConfirm(true);
        setDataUserConfirm(user);
    };
    const handleDeleteUserConfirm = (user) => {
        let cloneListUser = _.cloneDeep(listUser);
        cloneListUser = cloneListUser.filter((item) => item.id !== user.id);
        setListUser(cloneListUser);
    };
    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);

        let cloneListUser = _.cloneDeep(listUser);
        cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);
        setListUser(cloneListUser);
    };

    const handleOnchange = debounce((event) => {
        let term = event.target.value;
        console.log(term);
        if (term) {
            let cloneListUser = _.cloneDeep(listUser);
            cloneListUser = cloneListUser.filter((item) =>
                item.email.includes(term)
            );
            setListUser(cloneListUser);
        } else {
            getUsers();
        }
    }, 500);

    const getUsersExport = (event, done) => {
        let result = [];
        if (listUser && listUser.length > 0) {
            result.push(["ID", "Email", "First Name", "Last Name"]);
            listUser.map((item, index) => {
                let arr = [];
                arr[0] = item.id;
                arr[1] = item.email;
                arr[2] = item.first_name;
                arr[3] = item.last_name;
                result.push(arr);
            });
            setDataExport(result);
            done();
        }
    };

    const handleImport = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            let file = event.target.files[0];
            if (file.type !== "text/csv") {
                toast.error("import failed. Only csv file");
                return;
            }
            Papa.parse(file, {
                // header:  true,
                complete: function (results) {
                    let dataCsv = results.data;
                    if (dataCsv.length > 0) {
                        if (dataCsv[0] && dataCsv[0].length === 3) {
                            if (
                                dataCsv[0][0] !== "email" ||
                                dataCsv[0][1] !== "first_name" ||
                                dataCsv[0][2] !== "last_name"
                            ) {
                                toast.error(
                                    "import failed, check header data CSV"
                                );
                            } else {
                                // console.log("check for dataCsv: " ,dataCsv);
                                let result = [];
                                dataCsv.map((item, index) => {
                                    if (index > 0 && item.length === 3) {
                                        let obj = {};
                                        obj.email = item[0];
                                        obj.first_name = item[1];
                                        obj.last_name = item[2];
                                        result.push(obj);
                                    }
                                });
                                setListUser(result);
                            }
                        } else {
                            toast.error("import failed! format CSV");
                        }
                    } else {
                        toast.error("import failed no data CSV");
                    }
                },
            });
        }
    };

    const csvData = [
        ["firstname", "lastname", "email"],
        ["Ahmed", "Tomi", "ah@smthing.co.com"],
        ["Raed", "Labes", "rl@smthing.co.com"],
        ["Yezzi", "Min l3b", "ymin@cocococo.com"],
    ];
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
                        Add New User <i className="fa-solid fa-user-plus"></i>
                    </button>

                    <CSVLink
                        filename={"user-file.csv"}
                        className="btn btn-success mx-3"
                        data={dataExport}
                        asyncOnClick={true}
                        onClick={getUsersExport}
                    >
                        Download file <i className="fa-solid fa-download"></i>
                    </CSVLink>
                    <label htmlFor="import" className="btn btn-info">
                        <i className="fa-solid fa-file-import"></i> Import file
                    </label>
                    <input
                        id="import"
                        type="file"
                        hidden
                        onChange={(event) => handleImport(event)}
                    ></input>
                </div>
                <div className="col-4 my-3">
                    <input
                        className="form-control "
                        type="text"
                        // value={keyWord}
                        onChange={(event) => handleOnchange(event)}
                        placeholder="Search user by email"
                    ></input>
                </div>
            </div>
            <Table className="table mt-2" striped bordered hover>
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">
                            <div className="sort-header">
                                <span>ID</span>
                                <div>
                                    <i
                                        onClick={() =>
                                            handleSort("asc", "first_name")
                                        }
                                        className="fa-solid fa-arrow-up"
                                    ></i>
                                    <i
                                        onClick={() =>
                                            handleSort("desc", "first_name")
                                        }
                                        className="fa-solid fa-arrow-down"
                                    ></i>
                                </div>
                            </div>
                        </th>
                        <th scope="col">Email</th>
                        <th scope="col">
                            <div className="sort-header">
                                <span>First Name</span>
                                <div>
                                    <i
                                        onClick={() =>
                                            handleSort("asc", "first_name")
                                        }
                                        className="fa-solid fa-arrow-up"
                                    ></i>
                                    <i
                                        onClick={() =>
                                            handleSort("desc", "first_name")
                                        }
                                        className="fa-solid fa-arrow-down"
                                    ></i>
                                </div>
                            </div>
                        </th>
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
                                            onClick={() =>
                                                handleDeleteUser(item)
                                            }
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
                show={isShowModalConfirm}
                handleClose={handleClose}
                dataUserConfirm={dataUserConfirm}
                handleDeleteUserConfirm={handleDeleteUserConfirm}
            />
        </>
    );
};

export default TableUser;
