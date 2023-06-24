import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { createUser } from "../service/UserService";

import { toast } from "react-toastify";

function ModalAddNewUser(props) {
    const { show, handleClose, handleUpdate } = props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");

    const handleSaveUser = async () => {
        let res = await createUser(name, job);
        if (res && res.id) {
            handleClose();
            setName("");
            setJob("");
            toast.success("User added successfully");
            handleUpdate({first_name: res.name, id: res.id})
        } else {
            //err
            toast.error("User added failed");
        }
        console.log("check result:", res);
    };

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New User</Modal.Title>
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
                    <Button variant="primary" onClick={() => handleSaveUser()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalAddNewUser;
