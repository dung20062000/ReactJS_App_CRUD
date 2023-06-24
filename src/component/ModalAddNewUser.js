import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalAddNewUser(props) {

    const {show, handleClose} = props
    const [name, setName] = useState('');
    const [job, setJob] = useState('');

    const handleSaveUser = () => {
        console.log('check state', name, job)
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
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <>
                <form>
                    <div className="mb-3">
                        <label for="name" className="form-label">Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="name" 
                            aria-describedby="emailHelp"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        ></input>
                    </div>
                    <div className="mb-3">
                        <label for="job" className="form-label">Job</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="job"
                            value={job}
                            onChange={(event) => setJob(event.target.value)}
                        ></input>
                    </div>
                </form>
                </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSaveUser()}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddNewUser;