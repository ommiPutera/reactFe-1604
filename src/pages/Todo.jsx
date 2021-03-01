import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { TextField } from '@material-ui/core';
import { styles } from "../components/MaterialUi";
import Header from "../components/Header";
import { BsFillPlusSquareFill } from "react-icons/bs";
import Card from "../components/Card";
import ModalComp from "../components/Modal";
import swal from 'sweetalert';
import { ToastContainer, toast } from 'react-toastify';
import Axios from "axios";

class Todo extends Component {
  state = {
    posting: [],
    fotoInp: "",
    captionInp: "",
    indexEdit: -1,
    indexDelete: -1,
    EditData: {
      foto: "",
      caption: "",
      id: 0,
    },
    modal: false,
    editModal: false,
  };

  componentDidMount() {
    Axios
      .get(`http://localhost:5000/posts`)
      .then((res) => {
        console.log(res);
        this.setState({ posting: res.data });
      })
      .catch((err) => {
        console.log(err);
        toast.error("internal server error");
      });
  };

  onEditChange = (event) => {
    let EditData = this.state.EditData;
    EditData[event.target.name] = event.target.value;
    this.setState({ EditData: EditData });
  }
  onEditCancelClick = () => {
    this.setState({
      EditData: {
        foto: "",
        caption: "",
      },
      indexEdit: -1,
      editModal: false,
    });
  }
  onEditClick = (index) => {
    console.log(index);
    let EditData = this.state.EditData;
    let posting = this.state.posting;
    EditData = {
      ...EditData,
      id: posting[index].id,
      foto: posting[index].foto,
      caption: posting[index].caption,
    }
    this.setState({ indexEdit: index, EditData: EditData, editModal: true });
  }
  onEditSaveClick = () => {
    const { EditData } = this.state;
    const { foto, caption, id } = EditData;
    if (foto && caption && id) {
      let dataEdit = {
        foto: foto,
        caption: caption,
      };
      Axios
        .put(`http://localhost:5000/posts/${id}`, dataEdit)
        .then((res1) => {
          console.log(res1)
          Axios
            .get(`http://localhost:5000/posts`)
            .then((res) => {
              console.log(res)
              this.setState({
                posting: res.data,
                indexEdit: -1,
                editModal: false,
              });
              toast.success("Data berhasil diedit!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
              });
            })
            .catch((err2) => {
              console.log(err2)
              toast.error("Internal server error")
            });
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      this.setState({
        EditData: {
          foto: "",
          caption: "",
        },
        indexEdit: -1,
      })
      toast.error("Data gagal diedit", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  }

  onInputChage = (event) => {
    console.log(event);
    this.setState({ [event.target.name]: event.target.value });
  };
  onAddModalClick = () => {
    this.setState({ modal: true });
  };
  onCancelAddClick = () => {
    this.setState({ modal: false });
  };
  onAddClick = () => {
    const { fotoInp, captionInp } = this.state;
    if (fotoInp && captionInp) {
      let dataInp = {
        foto: fotoInp,
        caption: captionInp,
      };
      Axios
        .post(`http://localhost:5000/posts`, dataInp)
        .then((res1) => {
          console.log(res1);
          Axios
            .get(`http://localhost:5000/posts`)
            .then((res) => {
              console.log(res);
              this.setState({
                posting: res.data,
                fotoInp: "",
                captionInp: "",
                modal: false,
              })
            })
            .catch((err1) => {
              console.log(err1)
            })
        })
        .catch((err) => {
          console.log(err)
          toast.error("Internal server error");
        })

    } else {
      toast.error("Data harus diisi", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  }

  onClickDelete = (id) => {
    Axios
      .delete(`http://localhost:5000/posts/${id}`)
      .then((res1) => {
        console.log(res1)
        Axios
          .get(`http://localhost:5000/posts`)
          .then((res) => {
            console.log(res)
            swal({
              title: "Anda yakin?",
              text: "Data akan dihapus permanen",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            })
              .then((willDelete) => {
                if (willDelete) {
                  swal("Data berhasil terhapus!", {
                    icon: "success",
                  });
                  this.setState({ posting: res.data });
                } else {
                  swal("Data gagal terhapus!");
                }
              });
          })
          .catch((err1) => {
            console.log(err1)
          })
      })
      .catch((err) => {
        console.log(err)
      })
  };

  renderCard = () => {
    return this.state.posting.map((val, index) => {
      return (
        <div className="col-md-3 mt-5" key={index}>
          <Card foto={val.foto} caption={val.caption} onDelete={() => this.onClickDelete(val.id)} onEdit={() => this.onEditClick(index)} />
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <Header />
        <div className="me-5 ms-5">
          <ModalComp
            isOpen={this.state.modal}
            toggle={this.toggle}
            title={"Add data"}
            saveData={this.onAddClick}
            Cancel={this.onCancelAddClick}
          >
            <input
              name="fotoInp"
              type="text"
              placeholder="Url foto"
              className="form-control my-2"
              value={this.state.usernameInp}
              onChange={this.onInputChage}
            />
            <TextField
              name="captionInp"
              type="text"
              placeholder="Caption"
              className="form-control my-2"
              value={this.state.captionInp}
              onChange={this.onInputChage}
              multiline
              rows={1}
              rowsMax={2}
            />
          </ModalComp>
          <ModalComp
            isOpen={this.state.editModal}
            toggle={this.toggle}
            title={"Edit data"}
            saveData={this.onEditSaveClick}
            Cancel={this.onEditCancelClick}
            Edit={true}
          >
            <input
              name="foto"
              type="text"
              placeholder="Url foto"
              className="form-control my-2"
              value={this.state.EditData.foto}
              onChange={this.onEditChange}
            />
            <TextField
              name="caption"
              type="text"
              placeholder="Caption"
              className="form-control my-2"
              value={this.state.EditData.caption}
              onChange={this.onEditChange}
              multiline
              rows={1}
              rowsMax={2}
            />
          </ModalComp>
          <div className="row d-flex justify-content-start">{this.renderCard()}</div>
          <div className=" mt-5 d-flex flex-column justify-content-center align-items-center">
            <div className="mb-5">
              <BsFillPlusSquareFill style={{ fontSize: "2.5em", fontWeight: "700" }} onClick={this.onAddModalClick} />
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default withStyles(styles)(Todo);