import React, { Component } from "react";
import { Link, NavLink as LinkRouter } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';

class Header extends Component {
  state = {
    isOpen: false,
  };

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand className='mt-2 mb-2 ms-5 me-5'>
            <Link to='/' className='text-decoration-none link-secondary'> Home </Link>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar className='mt-2 mb-2'>
            <Nav className="ms-auto" navbar>
              <NavItem>
                <LinkRouter  to='/corona' className='me-5 text-decoration-none link-secondary'> Corona </LinkRouter>
              </NavItem>
              <NavItem>
                <LinkRouter to='/data-mahasiswa' className='me-5 text-decoration-none link-secondary'> Mahasiswa </LinkRouter>
              </NavItem>
              <NavItem>
                <LinkRouter to='/todo' className='me-5 text-decoration-none link-secondary'> Todo </LinkRouter>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;