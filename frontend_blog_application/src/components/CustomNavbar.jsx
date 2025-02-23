import { useEffect, useState } from "react";
import { NavLink as ReactLink, useNavigate } from "react-router-dom";
import { isLoggedIn, getCurrentUserDetail, doLogout } from "../auth";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";

const CustomNavbar = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  // State for login status and user details
  const [login, setLogin] = useState(false);
  const [user, setUserDetail] = useState(undefined);

  useEffect(() => {
    // console.log("User data in navbar:", getCurrentUserDetail());
    setLogin(isLoggedIn());
    setUserDetail(getCurrentUserDetail());
  }, [login]);

  const logout = () => {
    doLogout(() => {
      //Logged out
      setLogin(false);
      navigate("/login");
    });
  };

  return (
    <div>
      <Navbar color="black" dark expand="md" fixed="" className="px-5">
        <NavbarBrand>
          MyBlogs
        </NavbarBrand>
        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to="/">
                New Feed
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/about">
                About
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                Contact Us
              </NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink tag={ReactLink} to="/services">
                Services
              </NavLink>
            </NavItem> */}
{/* 
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Contact Us</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
          </Nav>
          <Nav navbar>
            {login ? (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to={`/user/profile-info/${user.id}`}>
                    Profile
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/user/dashboard">
                    {user?.email}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={logout} style={{ cursor: "pointer" }}>
                    <Button
                      size="sm"
                      className="shadow"
                      style={{ color: "black", backgroundColor: "white" }}
                    >
                      Logout
                    </Button>
                  </NavLink>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/login">
                    <Button
                      color="secondary"
                      className="shadow"
                      size="sm"
                      style={{ color: "black", backgroundColor: "white" }}
                    >
                      Login
                    </Button>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/signup">
                    <Button
                      color="secondary"
                      className="shadow"
                      size="sm"
                      style={{ color: "black", backgroundColor: "white" }}
                    >
                      Signup
                    </Button>
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default CustomNavbar;
