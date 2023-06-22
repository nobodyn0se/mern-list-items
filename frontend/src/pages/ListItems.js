import { useEffect } from "react";
import { useNavigate } from "react-router";

import "../styles/ListItems.css";

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";

import { useAuthProvider } from "../context/AuthContext";

const ListItems = () => {
  const navigate = useNavigate();

  const { token, getListItems, loading, addItem, itemList } = useAuthProvider();

  const fetchList = async () => {
    await addItem();
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      //fetch data from server
      const fetchData = async () => {
        await getListItems();
        //console.log(data);
      };

      fetchData();
    }
  }, [navigate, token]);

  return loading ? (
    <p>Loading...</p>
  ) : (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-end align-items-center ml-auto">
        <MDBCol size="5" className="text-align-right">
          <h4>Total List Items: {itemList.length}</h4>
        </MDBCol>
        <MDBCol size="5">
          <MDBBtn outline className="mx-2 px-5 my-3" color="black" size="lg">
            Logout
          </MDBBtn>
        </MDBCol>
      </MDBRow>
      <MDBRow className="w-100">
        {itemList.map((item, index) => (
          <MDBCol size="12" sm="6" md="4" lg="3">
            <MDBCard key={item.uuid} className="my-2 d-flex flex-row">
              <MDBIcon icon="trash" className="align-self-center" size="lg" />
              <MDBCardBody className="d-flex flex-column align-items-center mx-auto w-100">
                <h2 className="fw-bold mb-2 card-title">{item.title}</h2>
                <p className="mb-3">{item.description}</p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
      <button onClick={() => fetchList()}>Add a ToDo</button>
    </MDBContainer>
  );
};

export default ListItems;
