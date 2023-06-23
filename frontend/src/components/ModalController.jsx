import { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput
} from 'mdb-react-ui-kit';
import { useListProvider } from "../context/ListContext";
import { useAuthProvider } from "../context/AuthContext";
 
const ModalController = ({ open, todoItem, todoMode, setShow, handleClose }) => {
 
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
 
    const { token } = useAuthProvider();
    const { addItem, updateItem, deleteItem } = useListProvider();
 
    const getTitle = () => {
        if(todoMode === "add") {
            return "Add New Item";
        } else if(todoMode === "edit" && todoItem)  {
            return `Edit Item - ${todoItem.uuid}`;
        } else if(todoMode === 'delete') {
            return `Delete Item - ${todoItem.uuid}`;
        }
    };
 
    const onSubmit = (e) => {
      if(todoMode === "add") {
        addItem(title, description);
      } else if(todoMode === "edit" && todoItem) {
        updateItem(todoItem.uuid, title, description);
      } else if(todoMode === 'delete') {
        deleteItem(todoItem.uuid);
      }
      handleClose();
    };
 
    useEffect(() => {
      if(todoMode === "edit" && todoItem) {
        setTitle(todoItem.text);
        setDescription(todoItem.description);
      }
    }, [todoItem, todoMode]);
 
    const getBody = () => {
      if(todoMode === "add") {
        return (
          <form
            onSubmit={(e) => {
              console.log(e);
              e.preventDefault();
              onSubmit();
              handleClose();
            }
          }>
            <div className='form-outline mb-4'>
              <div className="mb-3">
                <MDBInput type='text' id='enterTitle' className='form-control' label={'Enter title'} value={title} onChange={(e) => {
                  setTitle(e.target.value);
                }}/>
              </div>
              <div>
                <MDBInput type='text' id='enterDesc' className='form-control' label={'Enter description'} value={description} onChange={(e) => {
                  setDescription(e.target.value);
                }}/>
              </div>
            </div>
            <MDBBtn type='submit' className='btn btn-primary btn-block mb-4'>
              Add
            </MDBBtn>
          </form>
        );
      } else if(todoMode === "edit" && todoItem) {
        return (
          <form
            onSubmit={(e) => {
              console.log(e);
              e.preventDefault();
              onSubmit();
              handleClose();
            }
          }>
            <div className='form-outline mb-4'>
              <div className="mb-3">
                  <MDBInput type='text' id='editTitle' className='form-control' label={'Edit title'} value={title} onChange={(e) => {
                    setTitle(e.target.value);
                  }}/>
              </div>
              <div>
                <MDBInput type='text' id='editDesc' className='form-control' label={'Edit description'} value={description} onChange={(e) => {
                  setDescription(e.target.value);
                }}/>
              </div>
            </div>
            <MDBBtn type='submit' className='btn btn-primary btn-block mb-4'>
              Save
            </MDBBtn>
          </form>
        );
      } else if(todoMode === 'delete') {
        return (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
              handleClose();
            }
          }>
            <p>Are you sure you want to delete this item?</p>
            <MDBBtn type='submit' className='btn btn-primary btn-block mb-4'>
              Delete
            </MDBBtn>
          </form>
        );
      }
    }
 
    return (
        <MDBModal show={open} setShow={setShow}>
            <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{getTitle()}</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={handleClose}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              {getBody()}
            </MDBModalBody>
 
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={handleClose}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
       </MDBModal>
    );
 
 
};
 
export default ModalController;