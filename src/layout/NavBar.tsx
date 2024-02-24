import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Typography,
  Box,
  ListItemIcon,
  Tooltip,
  Button,
  useMediaQuery,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router";
import { paths } from "../routes/path";
import vanaLogo from "../assets/vanalogo.png";
import { handleLogout } from "../services/LoginApi";
import Logout from "@mui/icons-material/Logout";
import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

// const menuItems = [
//   { text: "Orders", icon: <AddShoppingCartIcon />, path: `${paths.ORDER}` },
//   { text: "Products", icon: <StoreIcon />, path: `${paths.PRODUCT}` },
//   { text: "Collections", icon: <CategoryIcon />, path: `${paths.CATEGORY}` },
// ];
const navMenus = [
  {
    label: "Orders",
    link: paths.ORDER,
  },
  {
    label: "Products",
    link: paths.PRODUCT,
  },
  {
    label: "Collections",
    link: paths.CATEGORY,
  },
];

const NavBar = () => {
  const navigate = useNavigate();
  const { user, updateUserData } = useAuthContext();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isNavBarOpen, setNavBarOpen] = useState(false);

  const open = Boolean(anchorEl);
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setNavBarOpen((prevState) => !prevState);
  };

  const handlePageNavigate = (path: string) => {
    navigate(`${path}`);
  };

  const handleLogoutClick = async () => {
    await handleLogout()
      .then((response) => {
        if (response.status) {
          updateUserData(null);

          // handleMenuClose();
          navigate(paths.LOGIN);
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          console.log(error.response.data);
        }
      });
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ height: "70px", display: "flex", justifyContent: "center" }}
      >
        <Toolbar>
          <Avatar
            alt="Company Logo"
            src={vanaLogo}
            sx={{
              marginRight: 2,
              backgroundColor: "#F6F6F6",
              height: "45px",
              width: "45px",
            }}
          />
          <Typography variant="h6">VANA</Typography>
          <Box
            sx={{ width: "90%", display: "flex", justifyContent: "flex-end" }}
          >
            {navMenus.map((menu, index) => (
              <Box
                key={menu.label}
                sx={{
                  marginRight: index < navMenus.length - 1 ? "20px" : "0",
                }}
              >
                <Link to={menu.link} style={{ textDecoration: "none" }}>
                  <Button
                    sx={{
                      borderRadius: "50px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "large",
                      textTransform: "none",
                      color: "white",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                      px={2}
                    >
                      {menu.label}
                    </Box>
                  </Button>
                </Link>
              </Box>
            ))}
          </Box>

          {user && (
            <Tooltip title="Account settings">
              <IconButton
                sx={{ marginLeft: "40px" }}
                onClick={handleMenuClick}
                size="small"
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : "false"}
              >
                <Avatar sx={{ width: 28, height: 28 }}>
                  {user!.name ? user!.name.toUpperCase()[0] : ""}
                </Avatar>
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={isNavBarOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            style: {
              boxSizing: "border-box",
              width: isSmallScreen ? "60vw" : "20vw",
            },
          }}
        >
          {/* <NavbarDrawer onDrawerToggle={handleDrawerToggle} /> */}
        </Drawer>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            "& .MuiAvatar-root": {
              width: 25,
              height: 25,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              // bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleLogoutClick}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default NavBar;
