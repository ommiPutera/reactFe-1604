import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "../components/MaterialUi";
import Header from "../components/Header";
import { BsPlusCircle } from "react-icons/bs";
import Card from "../components/Card";
import ModalComp from "../components/Modal";
import swal from 'sweetalert';
import { ToastContainer, toast } from 'react-toastify';

class Todo extends Component {
  state = {
    data: [
      {
        foto:
          "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        judul: "Makan makan",
        caption: "makan teratur",
      },
      {
        foto:
          "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/1800x1200_potassium_foods_other.jpg?resize=750px:*",
        judul: "Makan makan",
        caption: "makan teratur",
      },
    ],
    fotoInp: "",
    judulInp: "",
    captionInp: "",
    indexEdit: -1,
    indexDelete: -1,
    EditData: {
      foto: "",
      judul: "",
      caption: "",
    },
    modal: false,
    editModal: false,
  };

  onAddModalClick = () => {
    this.setState({ modal: true });
  };

  onCancelAddClick = () => {
    this.setState({ modal: false });
  };

  onClickDelete = (index) => {
    this.setState({ indexDelete: index });
    swal({
      title: "Anda yakin?",
      text: "Data yang didelete akan dihapus permanen",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("Data berhasil dihapus!", {
            icon: "success",
          });
          const { data, indexDelete } = this.state;
          let usersData = data;
          usersData.splice(indexDelete, 1);
          console.log(indexDelete)
          this.setState({ data: usersData, indexDelete: -1 });
        } else {
          swal("Data gagal dihapus!");
        }
      });
  };

  onEditClick = (index) => {
    console.log(index);
    let EditData = this.state.EditData;
    let data = this.state.data;
    EditData = {
      ...EditData,
      foto: data[index].foto,
      judul: data[index].judul,
      caption: data[index].caption,
    }
    this.setState({ indexEdit: index, EditData, editModal: true });
  }

  onEditSaveClick = () => {
    const { EditData, data, indexEdit } = this.state;
    const { foto, judul, caption } = EditData;
    if (foto && judul && caption) {
      let dataEdit = {
        foto: foto,
        judul: judul,
        caption: caption,
      };
      let dataUser = data;
      dataUser.splice(indexEdit, 1, dataEdit);
      this.setState({
        foto: dataUser,
        indexEdit: -1,
        editModal: false,
      })
    } else {
      this.setState({
        EditData: {
          foto: "",
          judul: "",
          caption: "",
        },
        indexEdit: -1,
      })
    }
  }

  onEditCancelClick = () => {
    this.setState({
      EditData: {
        foto: "",
        judul: "",
        caption: "",
      },
      indexEdit: -1,
      editModal: false,
    });
  }

  onAddClick = () => {
    const { fotoInp, judulInp, captionInp, data } = this.state;
    if (fotoInp && judulInp && captionInp) {
      let dataInp = {
        foto: fotoInp,
        judul: judulInp,
        caption: captionInp,
      };
      let dataUsers = data;
      dataUsers.push(dataInp);
      this.setState({
        data: dataUsers,
        fotoInp: "",
        judulInp: "",
        captionInp: "",
        modal: false,
      })
    } else {
      toast.error("input harus diisi bro", {
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

  onInputChage = (event) => {
    console.log(event);
    this.setState({ [event.target.name]: event.target.value });
  };

  onEditChange = (event) => {
    let EditData = this.state.EditData;
    EditData[event.target.name] = event.target.value;
    this.setState({ EditData: EditData });
  }

  renderCard = () => {
    return this.state.data.map((val, index) => {
      return (
        <div className="col-md-3 col-sm-12 mt-5" key={index}>
          <Card foto={val.foto} judul={val.judul} caption={val.caption} onDelete={() => this.onClickDelete(index)} onEdit={() => this.onEditClick(index)} />
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
            <input
              name="judulInp"
              type="text"
              placeholder="Judul"
              className="form-control my-2"
              value={this.state.judulInp}
              onChange={this.onInputChage}
            />
            <input
              name="captionInp"
              type="text"
              placeholder="Caption"
              className="form-control my-2"
              value={this.state.captionInp}
              onChange={this.onInputChage}
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
            <input
              name="judul"
              type="text"
              placeholder="Judul"
              className="form-control my-2"
              value={this.state.EditData.judul}
              onChange={this.onEditChange}
            />
            <input
              name="caption"
              type="text"
              placeholder="Caption"
              className="form-control my-2"
              value={this.state.EditData.caption}
              onChange={this.onEditChange}
            />
          </ModalComp>
          <div className="row d-flex justify-content-flex-start">{this.renderCard()}</div>
          <div className=" mt-5 d-flex flex-column justify-content-center align-items-center">
            <h2>Tambah Data</h2>
            <div className="mb-5">
              <BsPlusCircle style={{ fontSize: "3em", fontWeight: "700" }} onClick={this.onAddModalClick} />
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default withStyles(styles)(Todo);