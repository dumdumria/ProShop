// import React from 'react'
// import { Container } from 'react-bootstrap';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import { LinkContainer } from 'react-router-bootstrap';

// function Header() {
//   return (
//     <header>
//       <Navbar expand="lg" bg="dark" variant="dark" collapseOnSelect>
//         <Container>
//         <Navbar.Brand as={Nav.Link} href="/">ProShop</Navbar.Brand>


//           <Nav className="mr-auto">
//             <LinkContainer to='/cart'>
//               <Nav.Link><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
//             </LinkContainer>

//             <LinkContainer to='/login'>
//               <Nav.Link><i className="fas fa-user"></i> Login</Nav.Link>
//             </LinkContainer>
//           </Nav>
//         </Container>
//       </Navbar>
//     </header>
//   );
// }

// export default Header;


import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Container, NavDropdown } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';
import { logout} from '../actions/userActions'

function Header() {

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }


  return (
    <header>
      <Navbar expand="lg" bg="dark" variant="dark" collapseOnSelect>
        <Container>
          {/* Use Link instead of LinkContainer */}
          <Navbar.Brand as={Link} to="/">ProShop</Navbar.Brand>

          <Nav className="mr-auto">
            {/* Use Nav.Link as={Link} directly */}
            <Nav.Link as={Link} to="/cart">
              <i className="fas fa-shopping-cart"></i> Cart
            </Nav.Link>

            {userInfo ? (
                <NavDropdown title={userInfo.name} id= 'username'>
                  <LinkContainer to= '/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
            ): (
            
            <Nav.Link as={Link} to="/login">
              <i className="fas fa-user"></i> Login
            </Nav.Link>
            
            )}
             
            {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id= 'adminmenu'>

                <LinkContainer to= '/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to= '/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to= '/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>

              </NavDropdown>
            )}

          </Nav>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
