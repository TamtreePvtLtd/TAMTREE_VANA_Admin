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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import StoreIcon from "@mui/icons-material/Store";
import { useNavigate } from "react-router";
import { paths } from "../routes/path";
import vanaLogo from "../assets/vanalogo.png";
import { handleLogout} from "../services/LoginApi";
import Logout from "@mui/icons-material/Logout";
import { useAuthContext } from "../context/AuthContext";
const menuItems = [
  { text: "Orders", icon: <AddShoppingCartIcon />, path: `${paths.ORDER}` },
  { text: "Products", icon: <StoreIcon />, path: `${paths.PRODUCT}` },
  { text: "Collections", icon: <CategoryIcon />, path: `${paths.CATEGORY}` },
];


const NavBar = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user,updateUserData} = useAuthContext();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);


  const open = Boolean(anchorEl);



  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget as HTMLButtonElement);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handlePageNavigate = (path: string) => {
    navigate(`${path}`);
    setDrawerOpen(false);
  };


  const handleLogoutClick = async () => {
    await handleLogout()
      .then((response) => {
        if (response.status) {
          updateUserData(null);

          handleMenuClose();
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
          <IconButton edge="start" color="inherit" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
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
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            VANA
          </Typography>
          
          {user && (
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleMenuOpen}
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

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerClose}
        PaperProps={{
          sx: {
            width: "250px",
            height: "100%",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "15px",
            alignItems: "center",
            paddingX: 2,
          }}
        >
          <Typography variant="h6">VANA Jewellery</Typography>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon sx={{ color: "#bd8d67" }} />
          </IconButton>
        </Box>

        <List>
          {menuItems.map((item, index) => (
            <ListItem
              key={index}
              onClick={() => handlePageNavigate(item.path)}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#e0e0e0",
                },
              }}
            >
              {item.icon && (
                <ListItemIcon
                  sx={{ minWidth: 40, marginRight: 0, color: "#bd8d67" }}
                >
                  {item.icon}
                </ListItemIcon>
              )}
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Menu
             anchorEl={anchorEl}
             id="account-menu"
             open={open}
             onClose={handleMenuClose}
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
                   bgcolor: "background.paper",
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
