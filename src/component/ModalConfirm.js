import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../service/UserService";
import { toast } from "react-toastify";

function ModalConfirm(props) {
    const { show, handleClose, dataUserConfirm, handleDeleteUserConfirm } = props;

    const confirmDeleteUser = async() => {
        let res = await deleteUser(dataUserConfirm.id);
        if (res && +res.statusCode === 204) {
            toast.success('delete successfully')
            handleClose()
            handleDeleteUserConfirm(dataUserConfirm)

        }else{
            toast.error('delete failed');
        }
    }
    return (

        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Verify User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        <div>
                            Are you sure verify Action delete user ?<br></br>
                            email: <b>{dataUserConfirm.email}</b>
                        </div>
                    </>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => confirmDeleteUser()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalConfirm;
