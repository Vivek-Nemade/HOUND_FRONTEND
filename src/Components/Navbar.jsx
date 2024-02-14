import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PortraitOutlinedIcon from '@mui/icons-material/PortraitOutlined';
import MoreIcon from "@mui/icons-material/MoreVert";
import Avatar from "@mui/material/Avatar";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser, logOutAPI } from "../Redux/Auth/auth.actions";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { persistor } from "../Redux/store.js";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  axios.defaults.withCredentials = true;
  const { isAuth } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = async () => {
    try {
      //  dispatch(logOutAPI(user._id));
      dispatch(logOutAPI());
      toast.success(`User logged out successfully`);
      if(!isAuth){
       persistor.purge();
       navigate("/");
      }
      
      
      
    } catch (error) {
      console.log(error);
    } finally {
      console.log(isAuth)
    }
  };

  // useEffect(()=>{
  //   if(isAuth) {
  //     dispatch(getUser());
  //   }
   
  //  },[])
  console.log(isAuth)

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      style={{ marginTop: '48px' }}
    >


      
      {/* <Link to="/profile" style={{textDecoration:"none", color:"inherit"}}><MenuItem onClick={handleMenuClose}> Profile </MenuItem></Link> 
      <Link to="/my-account" style={{textDecoration:"none", color:"inherit"}}><MenuItem onClick={handleMenuClose}>My account</MenuItem></Link> */}
      
      {isAuth && (   <Box>
                {/* <MenuItem onClick={handleProfileMenuOpen}>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="primary-search-account-menu"
                      aria-haspopup="true"
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                  <p>Profile</p>
                </MenuItem> */}
                <Link to="/profile" style={{textDecoration:"none", color:"inherit"}}>
                  <MenuItem onClick={handleMenuClose}><IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="primary-search-account-menu"
                      aria-haspopup="true"
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                  <p>Profile</p></MenuItem>
                  </Link>
                  <Link to="/my-account" style={{textDecoration:"none", color:"inherit"}}>
                  <MenuItem onClick={handleMenuClose}><IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="primary-search-account-menu"
                      aria-haspopup="true"
                      color="inherit"
                    >
                      < PortraitOutlinedIcon />
                    </IconButton>
                  <p>My Account</p></MenuItem>
                  </Link>
                <MenuItem onClick={handleLogout}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                      >
                      <LogoutIcon />
                    </IconButton>
                  <p>Logout</p></MenuItem>
              </Box>
            )}
    
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      style={{ marginTop: '43px' }}
    >

      
{isAuth ? (   <Box>
                {/* <MenuItem onClick={handleProfileMenuOpen}>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="primary-search-account-menu"
                      aria-haspopup="true"
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                  <p>Profile</p>
                </MenuItem> */}
                <Link to="/profile" style={{textDecoration:"none", color:"inherit"}}>
                  <MenuItem onClick={handleMenuClose}><IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="primary-search-account-menu"
                      aria-haspopup="true"
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                  <p>Profile</p></MenuItem>
                  </Link>
                <MenuItem onClick={handleLogout}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                      >
                      <LogoutIcon />
                    </IconButton>
                  <p>Logout</p></MenuItem>
              </Box>
            ) : (
              <Box>
                <MenuItem>
                  <Link
                    to="/signup"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    SIGNUP
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to="/login"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    LOGIN
                  </Link>
                </MenuItem>
              </Box>
            )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ background: "linear-gradient(to left, #87CEEB, #1E90FF);" }}
      >
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          
          <Typography
            variant="h6"
            
            component="div"
            sx={{ display: {  sm: "block" } }}
          >
            <Link to="/" style={{textDecoration:"none", color:"inherit"}}>HOUND</Link>
            
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton> */}
            {/* <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            <MenuItem>
              <Typography>
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "inherit", fontSize: 18, fontWeight: 400 }}
                >
                  HOME
                </Link>
              </Typography>
            </MenuItem>

            {isAuth && <MenuItem>
                  <Link
                    to="/user"
                    style={{ textDecoration: "none", color: "inherit",fontSize: 18, fontWeight: 400 }}
                  >
                    UserDetails
                  </Link>
                </MenuItem>}
                {isAuth && <MenuItem>
                  <Link
                    to="/createBlog"
                    style={{ textDecoration: "none", color: "inherit",fontSize: 18, fontWeight: 400 }}
                  >
                    Post Blog
                  </Link>
                </MenuItem>}

            {/* {isAuth ? (
              <MenuItem onClick={handleLogout}>LOGOUT</MenuItem>
            ) : (
              <>
                <MenuItem>
                  <Link
                    to="/signup"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    SIGNUP
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to="/login"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    LOGIN
                  </Link>
                </MenuItem>
              </>
            )} */}

            {!isAuth && (
              <>
              <MenuItem>
                <Link
                  to="/signup"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  SIGNUP
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  LOGIN
                </Link>
              </MenuItem>
            </>
            )}

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {/* <AccountCircle /> */}
              {user?.profileImage ? (<Avatar alt="Remy Sharp" src={user.profileImage} />):(<AccountCircleIcon style={{ fontSize: 30 }} />)}
              {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
