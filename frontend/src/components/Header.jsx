import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer} from 'react-router-bootstrap';
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";

const Header = () => {
  const cart = useSelector((state)=>state.cart);
  const cartItems = cart?.cartItems || [];
  const { userInfo } =useSelector((state)=>state.auth);

  const navigate =useNavigate();
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler= async()=>{
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
      
    } catch (error) {
      console.error(error)
      
    }

  }
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to = {'/'}>
           <Navbar.Brand>EduCart</Navbar.Brand>

          </LinkContainer>
         
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer  to ={'/cart'}>
                <Nav.Link>
                   
                <FaShoppingCart /> Cart
                {cartItems.length > 0 && (
                  <Badge bg="success" style = {{marginLeft : "5px"}}>
                    {(cartItems || []).reduce((a,c)=>
                    a + (Number(c.qty)||0),0)}
                    </Badge>
                )}
                </Nav.Link>
              </LinkContainer>
         
              {userInfo ? (

                <>
                <NavDropdown title={userInfo?.name} id="username">
                  <LinkContainer to ={"/profile"}>
                  <NavDropdown.Item>profile</NavDropdown.Item>
                  
                  </LinkContainer>
                  
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                  
                
                </NavDropdown>
                </>
              ) : (
                <LinkContainer to={"/login"}>
              <Nav.Link>
                <FaUser /> Sign In
              </Nav.Link>

              </LinkContainer>
              )}
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
