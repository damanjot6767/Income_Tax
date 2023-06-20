import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  ListItemButton,
  Avatar,
  ListItemIcon,
  ListItemText,
  ListItem,
  Collapse,
  useMediaQuery
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
// import Arbor from "./listItems"
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import { useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { DashboardOutlined, ExpandLess, ExpandMore, ManageAccountsOutlined } from "@mui/icons-material";
import GroupIcon from "@mui/icons-material/Group";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch } from "react-redux";
import { sideNavStyles } from "../styles/materialComponent";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import AppRoute from '../routes';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { validateUserType } from "../ValidateUserType";
import { userLogout } from "../actions/user";
import { dealerLogout } from "../actions/dealer";

const drawerWidth = 300;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function DashboardContent() {
  const classes = sideNavStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { dealers } = useSelector(({dealers}) =>dealers);
  const { users }  = useSelector(({ users }) =>users )
  const [open, setOpen] = React.useState(true);
  const [openCollapse, setOpenCollapse] = React.useState(false);
  const isMdUp = useMediaQuery(mdTheme.breakpoints.up("md"));

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleLogout = () => {
    Swal.fire({
      // title: 'Are you sure want to Logout?',
      text: "Are you sure want to Logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(validateUserType(navigate)?userLogout():dealerLogout(navigate));
        navigate("/");
      }
    });
  };

  function handleOpenSettings() {
    setOpenCollapse(!openCollapse);
  }
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex"}} className ={classes.mainBox}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          className={classes.headerView}
        >
          <Toolbar
            className={classes.toolbar}

            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                color: "rgb(115 74 153)",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
              
            >
              {!open && (
                <img
                  src="assets/images/logo.png"
                  alt=""
                  style={{paddingTop:7, display: !isMdUp && "none", height:95}}
                />
              )}
            </Typography>
            <IconButton
              sx={{               
                color: "#f2eef7",
                borderRadius: "50%",
                marginLeft:20,
                backgroundColor: "rgb(115 74 153)",
                "&:hover": { backgroundColor: "rgb(115 74 153)" },
              }}
              onClick={handleLogout}
            >
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer 
          variant="permanent" 
          open={open}
          PaperProps={{
            sx: {
              backgroundColor: "#FCFBFD",
            }
          }}
          >
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              height:100,
              px: [1],
            }}
          >
            <Typography >
              <img
                src="data:image/jpeg;base64,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"
                alt=""
                style={{paddingTop:7, height:95}}
              />
              
            </Typography>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => navigate("dealerProfilePage")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <Box className={classes.avatarView}>
                  <Avatar
                    sx={{ width: open ? 100 : 50, height: open ? 100 : 50, my: 4 }}
                    src={ validateUserType() ? users?.profileImage?users.profileImage : "assets/images/avatar.jpg":dealers?.profileImage?dealers.profileImage:"assets/images/avatar.jpg"}
                  />
                  <Typography
                    variant="body2"
                    sx={{ opacity: open ? 1 : 0 }}
                    style={{ marginTop: -10 }}
                  >
                    {validateUserType() ? `${users?.name}` : dealers ? `${dealers.name}` :""}
                  </Typography>
                </Box>
              </ListItemButton>
            </ListItem>
          </List>
          <List>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => navigate("/dealerHomepage")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <DashboardOutlined />
                </ListItemIcon>
                <ListItemText
                  primary="Dashboard"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
          <List>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => navigate("/addCar")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Add Car"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
          
        
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: "#f2eef7",
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth= {location.pathname ==="/addReport" || location.pathname==="/editReport" ? false : "lg"} sx={{ mt: 10, mb: 4, maxWidth:"95%"}}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12}>
                {/* <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                > */}
                  <AppRoute />
                {/* </Paper> */}
              </Grid>                                            
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
