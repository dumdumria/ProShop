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
import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";

function Header() {
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
            <Nav.Link as={Link} to="/login">
              <i className="fas fa-user"></i> Login
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
