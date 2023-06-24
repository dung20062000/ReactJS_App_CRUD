import "./App.scss";
import Header from "./component/Header";
import TableUser from "./component/TableUser";
import Container from "react-bootstrap/Container";
import ModalAddNewUser from "./component/ModalAddNewUser";
import { useState } from "react";

function App() {
  const [isShowModalAddNew, setIsShowModalAddNew] = useState()

  const handleClose = () => {
    setIsShowModalAddNew(false)
  }
    return (
        <div className="app-container">
            <Header />
            <Container>
                <div>
                    <div className="my-3 text-uppercase text-center title" >List User </div>
                    <div>
                      <button 
                        type="button" 
                        className="btn btn-primary my-3"
                        onClick={() => setIsShowModalAddNew(true)}
                      >Add New User +</button>
                    </div>
                    <TableUser />
                    <ModalAddNewUser 
                      show = {isShowModalAddNew}
                      handleClose = {handleClose}
                    />
                </div>
            </Container>
        </div>
    );
}

export default App;
