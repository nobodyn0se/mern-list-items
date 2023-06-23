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

import { useListProvider } from "../context/ListContext";
import { useAuthProvider } from "../context/AuthContext";

const ListItems = () => {
  const navigate = useNavigate();

  const { token } = useAuthProvider();
  const { getListItems, loading, addItem, itemList } = useListProvider();

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
      <MDBRow className="d-flex justify-content-center align-items-center">
        <MDBCol size="5" className="text-align-right">
          <h4>Total List Items: {itemList.length}</h4>
        </MDBCol>
        <MDBCol size="5">
          <MDBBtn outline className="mx-2 px-5 my-3 bg-dark text-white rounded" color="black" size="lg">
            Logout
          </MDBBtn>
        </MDBCol>
      </MDBRow>
      <MDBRow className="w-100">
        {itemList.map((item, index) => (
          <MDBCol key={`${item.uuid}+${index}`} size="12" sm="6" md="4" lg="3">
            <MDBCard key={item.uuid} className="my-2 d-flex flex-row">
              <MDBIcon
                icon="pencil"
                className="align-self-center mx-3"
                size="lg"
              />
              <MDBIcon
                icon="trash"
                className="align-self-center mx-2"
                size="lg"
              />
              <MDBCardBody className="d-flex flex-column align-items-center mx-auto w-100">
                <MDBCol>
                  <MDBRow className="w-100 text-align-left">
                    <h2 className="fw-bold mb-2 card-title">{item.title}</h2>
                  </MDBRow>
                  <MDBRow className="mb-0 w-100">
                    <p>{item.description}</p>
                  </MDBRow>
                </MDBCol>
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
