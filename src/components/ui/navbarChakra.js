import {
  Box,
  Flex,
  HStack,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import {
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { NavLink as RouterNavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { IconButton } from "@chakra-ui/react";
import { ShoppingCartTwoTone } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "./../../assets/logo.png";
import { useCustomAuth } from "../user-auth/authContext";
import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material";
import theme from "../../theme";
import { useHistory } from "react-router-dom";

const Links = [
  { link: "Home", href: "/" },
  { link: "Add Product", href: "/add-product" },
  { link: "Products", href: "/product" },
  { link: "Events", href: "/events" },
];

export const NavbarChakra = () => {
  const history = useHistory();
  const [loggedInUser, setLoggedInUser] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const { appLogin, appLogout, appUser, isAppUserAuthenticated } =
    useCustomAuth();

  const login = () => {
    history.push("/login");
  };

  useEffect(() => {
    const loggedUser = appUser() ? appUser() : user;
    if (loggedUser) {
      setLoggedInUser(loggedUser);
    }
  }, []);

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.charAt(0)}`,
    };
  }

  const logoutWithRedirect = () => {
    // logout({
    //   logoutParams: {
    //     returnTo: window.location.origin,
    //   },
    appLogout();
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <img
                src={Logo}
                alt="Logo"
                className="nav-user-profile rounded-circle"
                width="38"
              />
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {loggedInUser &&
                Links.map((item) => (
                  <NavLink
                    tag={RouterNavLink}
                    to={item.href}
                    exact
                    activeClassName="router-link-exact-active"
                  >
                    {item.link}
                  </NavLink>
                ))}
            </HStack>
          </HStack>
          {/* <Flex alignItems={"center"}> */}
          <Nav className="d-none d-md-block" navbar>
            {!loggedInUser && (
              <NavItem>
                <Button
                  id="qsLoginBtn"
                  color="primary"
                  className="btn-margin"
                  // onClick={() => loginWithRedirect()}
                  onClick={login}
                >
                  Log in
                </Button>
              </NavItem>
            )}
          </Nav>
          {loggedInUser && (
            <Flex h={6} alignItems={"center"} justifyContent={"space-between"}>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret id="profileDropDown">
                  {/* <img
                    src={user.picture}
                    alt="Profile"
                    className="nav-user-profile rounded-circle"
                    width="38"
                  /> */}
                  <ThemeProvider theme={theme}>
                    <Avatar {...stringAvatar(loggedInUser.name)} />
                  </ThemeProvider>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>{loggedInUser.name}</DropdownItem>
                  <DropdownItem
                    tag={RouterNavLink}
                    to="/profile"
                    className="dropdown-profile"
                    activeClassName="router-link-exact-active"
                  >
                    <FontAwesomeIcon icon="user" className="mr-3" /> Profile
                  </DropdownItem>
                  <DropdownItem
                    id="qsLogoutBtn"
                    onClick={() => logoutWithRedirect()}
                  >
                    <FontAwesomeIcon icon="power-off" className="mr-3" /> Log
                    out
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <Nav>
                <NavItem>
                  <NavLink
                    tag={RouterNavLink}
                    to="/cart"
                    exact
                    // activeClassName="router-link-exact-active"
                  >
                    <IconButton
                      isRound={true}
                      variant="solid"
                      colorScheme="green"
                      aria-label="Done"
                      fontSize="100"
                      icon={<ShoppingCartTwoTone />}
                    />
                  </NavLink>
                </NavItem>
              </Nav>
            </Flex>
          )}

          {!loggedInUser && (
            <Nav className="d-md-none" navbar>
              <NavItem>
                <Button
                  id="qsLoginBtn"
                  color="primary"
                  block
                  // onClick={() => loginWithRedirect({})}
                  onClick={login}
                >
                  Log in
                </Button>
              </NavItem>
            </Nav>
          )}
        </Flex>
        {/* </Flex> */}

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};
