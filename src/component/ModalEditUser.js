import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { updateUser } from '../service/UserService'
 
import { toast } from "react-toastify";

function ModalEditUser(props) {
    const { show, handleClose, dataUserEdit, handleEditUserFromTable } = props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");

    const handleEditUser = async() => {
        let res = await updateUser(name, job)
        console.log('chweck edit',res);
        if(res &&  res.updatedAt){
            // successfully
            handleEditUserFromTable({
                first_name: name,
                id: dataUserEdit.id
            })
            handleClose()   
            toast.success('update user success')
        }

    }
    useEffect(() => {
        if(show) {
            setName(dataUserEdit.first_name);
            // setJob(dataUserEdit.job);
        }
    }, [dataUserEdit])

     return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    aria-describedby="emailHelp"
                                    value={name}
                                    onChange={(event) =>
                                        setName(event.target.value)
                                    }
                                ></input>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="job" className="form-label">
                                    Job
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="job"
                                    value={job}
                                    onChange={(event) =>
                                        setJob(event.target.value)
                                    }
                                ></input>
                            </div>
                        </form>
                    </>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleEditUser()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalEditUser;
