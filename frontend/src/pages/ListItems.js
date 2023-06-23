import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import "../styles/ListItems.css";

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
} from "mdb-react-ui-kit";

import { useListProvider } from "../context/ListContext";
import { useAuthProvider } from "../context/AuthContext";
import ModalController from "../components/ModalController";

const ListItems = () => {
  const navigate = useNavigate();

  const { token } = useAuthProvider();
  const { getListItems, loading, addItem, itemList } = useListProvider();

  const [todoMode, setTodoMode] = useState("add");
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleShow = () => {
    setModalOpen(!modalOpen);
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedTodo(null);
    setTodoMode("add");
  };

  const handleDelete = (item) => {
    setTodoMode("delete");
    setSelectedTodo({
      uuid: item.uuid,
      text: item.text,
      description: item.description,
    });
    toggleShow();
  };

  const handleEdit = (item) => {
    setTodoMode("edit");
    setSelectedTodo({
      uuid: item.uuid,
      text: item.text,
      description: item.description,
    });
    toggleShow();
  };

  const handleAdd = () => {
    setTodoMode("add");
    setSelectedTodo(null);
    toggleShow();
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      //fetch data from server
      const fetchData = async () => {
        await getListItems();
      };

      fetchData();
    }
  }, [navigate, token]);

  return loading ? (
    <p>Loading...</p>
  ) : (
    <>
      <MDBContainer fluid>
        <button className="fab" onClick={handleAdd}>
          +
        </button>
        <MDBRow className="d-flex justify-content-center align-items-center">
          <MDBCol size="5" className="text-align-right">
            <h4>Total List Items: {itemList.length}</h4>
          </MDBCol>
          {/* <MDBCol size="5">
            <MDBBtn
              outline
              className="mx-2 px-5 my-3 bg-dark text-white"
              color="black"
              size="lg"
              rounded
              onClick={handleLogOut}
            >
              Logout
            </MDBBtn>
          </MDBCol> */}
        </MDBRow>
        <MDBRow className="w-100 mb-5">
          {itemList.map((item, index) => (
            <MDBCol
              key={`${item.uuid}+${index}`}
              size="12"
              sm="6"
              md="4"
              lg="3"
            >
              <MDBCard key={item.uuid} className="my-2 d-flex flex-row">
                <MDBIcon
                  icon="pencil"
                  className="align-self-center mx-3"
                  size="lg"
                  onClick={() => handleEdit(item)}
                  role="button"
                />
                <MDBIcon
                  icon="trash"
                  className="align-self-center mx-2"
                  size="lg"
                  onClick={() => handleDelete(item)}
                  role="button"
                />
                <MDBCardBody className="px-3 pt-2 d-flex flex-column align-items-center mx-auto w-100">
                  <div className="w-100 mb-0 fw-bold card-title text-no-wrap">
                    {item.text}
                  </div>
                  <p className="w-100">{item.description}</p>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>
      {modalOpen && (
        <ModalController
          open={modalOpen}
          todoMode={todoMode}
          todoItem={selectedTodo}
          setShow={setModalOpen}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default ListItems;
