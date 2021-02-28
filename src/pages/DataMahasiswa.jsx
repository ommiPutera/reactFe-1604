import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import ModalComp from '../components/Modal';
import Header from '../components/Header';

class Home extends Component {
  state = {
    isLogin: false,
    users: [
      {
        username: "Ommi Putera",
        npm: '0003',
        email: "omiputra@gmail.com  ",
        status: "aktif",
      },
      {
        username: "Okki Sat",
        npm: '0002',
        email: "o.satria@google.com",
        status: "non aktif",
      },
    ],
    status: ["aktif", "non aktif"],
    usernameInp: "",
    emailInp: "",
    statusInp: "",
    npmInp: "",
    indexdelete: -1,
    indexEdit: -1,
    EditData: {
      username: "",
      npm: "",
      email: "",
      status: "",
      userNameFix: "",
    },
    modal: false,
    editmodal: false,
  };

  renderUsers = () => {
    return this.state.users.map((val, index) => {
      if (index === this.state.indexdelete) {
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{val.username}</td>
            <td>{val.npm}</td>
            <td>{val.email}</td>
            <td>{val.status}</td>
            <td>
              <button className="btn btn-danger mx-2" onClick={this.onYesClick}>
                Delete
              </button>
              <button
                className="btn btn-primary mx-2"
                onClick={this.onCancelClick}
              >
                No
              </button>
            </td>
          </tr>
        );
      }
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{val.username}</td>
          <td>{val.npm}</td>
          <td>{val.email}</td>
          <td>{val.status}</td>
          <td>
            <button
              className="btn btn-primary mx-2"
              onClick={() => this.onEditClick(index)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger mx-2"
              onClick={() => this.onDeleteClick(index)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  renderStatus = () => {
    return this.state.status.map((val, index) => {
      return (
        <option key={index} value={val}>
          {val}
        </option>
      );
    });
  };

  onUsernameChange = (event) => {
    this.setState({ usernameInp: event.target.value });
  };

  onEmailChange = (event) => {
    this.setState({ emailInp: event.target.value });
  };

  onNpmChange = (event) => {
    this.setState({ npmInp: event.target.value });
  };

  onInputChage = (event) => {
    console.log(event);
    this.setState({ [event.target.name]: event.target.value });
  };

  onInputEditChage = (event) => {
    let Editdata = this.state.EditData;
    Editdata[event.target.name] = event.target.value;
    this.setState({ EditData: Editdata });
  };

  onAddClick = () => {
    const { statusInp, usernameInp, emailInp, npmInp, users } = this.state;
    if (usernameInp && emailInp && statusInp && npmInp) {
      let data = {
        username: usernameInp,
        npm: npmInp,
        email: emailInp,
        status: statusInp,
      };
      let usersdata = users;
      usersdata.push(data);
      this.setState({
        users: usersdata,
        statusInp: "",
        usernameInp: "",
        npmInp: "",
        emailInp: "",
        modal: false,
      });
      toast.success("berhasil", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
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
  };

  onAddModalClick = () => {
    this.setState({ modal: true });
  };

  onCancelAddClick = () => {
    this.setState({ modal: false });
  };

  onDeleteClick = (index) => {
    this.setState({ indexdelete: index });
  };

  onCancelClick = () => {
    this.setState({ indexdelete: -1 });
  };

  onYesClick = () => {
    const { users, indexdelete } = this.state;
    let usersData = users;
    usersData.splice(indexdelete, 1);
    this.setState({ users: usersData, indexdelete: -1 });
  };

  onEditClick = (index) => {
    let EditData = this.state.EditData;
    let userNameFix = this.state.userNameFix;
    let users = this.state.users;
    EditData = {
      ...EditData,
      username: users[index].username,
      email: users[index].email,
      npm: users[index].npm,
      status: users[index].status,
    };
    userNameFix = users[index].username;
    this.setState({ indexEdit: index, EditData: EditData, editmodal: true, userNameFix: userNameFix });
  };

  onCancelEditClick = () => {
    this.setState({
      EditData: {
        username: "",
        email: "",
        npm: "",
        status: "",
      },
      indexEdit: -1,
      editmodal: false,
    });
  };

  onSaveEditClick = () => {
    const { EditData, users, indexEdit } = this.state;
    const { username, email, status, npm} = EditData;
    if (username && email && status && npm) {
      let data = {
        username: username,
        npm: npm,
        email: email,
        status: status,
      };
      let usersdata = users;
      usersdata.splice(indexEdit, 1, data);
      this.setState({
        users: usersdata,
        indexEdit: -1,
        editmodal: false,
      });

      toast.success("berhasil edit ", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } else {
      this.setState({
        EditData: {
          username: "",
          email: "",
          npm: "",
          status: "",
        },
        indexEdit: -1,
      });
      toast.error("Gak jadi Edit", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  onLoginClick = () => {
    if (this.state.users.length > 2) {
      this.setState({ isLogin: true });
    } else {
      toast("data harus lebih dari 2");
    }
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  toggleEdit = () => {
    this.setState({ editmodal: !this.state.editmodal });
  };

  render() {
    const { isLogin } = this.state;
    if (isLogin) {
      return <Redirect to="/corona" />;
    }
    return (
      <div>
        <Header />
        <ModalComp
          isOpen={this.state.modal}
          toggle={this.toggle}
          title={"Add Users"}
          saveData={this.onAddClick}
          Cancel={this.onCancelAddClick}
        >
          <input
            name="usernameInp"
            type="text"
            placeholder="username"
            className="form-control my-2"
            value={this.state.usernameInp}
            onChange={this.onInputChage}
          />
          <input
            name="npmInp"
            type="text"
            placeholder="npm"
            className="form-control my-2"
            value={this.state.npmInp}
            onChange={this.onInputChage}
          />
          <input
            name="emailInp"
            type="email"
            placeholder="email"
            className="form-control my-2"
            value={this.state.emailInp}
            onChange={this.onInputChage}
          />
          <select
            name="statusInp"
            onChange={this.onInputChage}
            value={this.state.statusInp}
            className="form-control my-2"
          >
            <option hidden value="">
              pilih status
            </option>
            {this.renderStatus()}
          </select>
        </ModalComp>
        <ModalComp
          isOpen={this.state.editmodal}
          toggle={this.toggleEdit}
          title={"Edit Users " + this.state.userNameFix}
          saveData={this.onSaveEditClick}
          Cancel={this.onCancelEditClick}
          Edit={true}
        >
          <input
            name="username"
            type="text"
            placeholder="username"
            className="form-control my-2"
            value={this.state.EditData.username}
            onChange={this.onInputEditChage}
          />
          <input
            name="npm"
            type="npm"
            placeholder="test"
            className="form-control my-2"
            value={this.state.EditData.npm}
            onChange={this.onInputEditChage}
          />
          <input
            name="email"
            type="email"
            placeholder="email"
            className="form-control my-2"
            value={this.state.EditData.email}
            onChange={this.onInputEditChage}
          />
          <select
            name="status"
            onChange={this.onInputEditChage}
            value={this.state.EditData.status}
            className="form-control my-2"
          >
            {this.renderStatus()}
          </select>
        </ModalComp>
        <div className="pt-5 px-5 mx-5">
        <h1 className="mb-5"> Data mahasiswa </h1>
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Nama</th>
                <th>NPM</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{this.renderUsers()}</tbody>
          </Table>
          <button onClick={this.onAddModalClick} className="btn btn-success">
            add
          </button>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default Home;