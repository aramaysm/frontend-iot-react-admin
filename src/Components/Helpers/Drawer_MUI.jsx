import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import "../../App.css";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import PaymentIcon from "@mui/icons-material/Payment";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import InsightsIcon from "@mui/icons-material/Insights";

import SearchIcon from "@mui/icons-material/Search";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";

import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import ReceiptIcon from "@mui/icons-material/Receipt";


import PropTypes from "prop-types";
import Services from "../../Services";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function MiniDrawer(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [totalNotif, setTotalNotif] = React.useState(0);
  const [openReport, setOpenReport] = React.useState(false);

  const history = useNavigate();
  const { children, title, itemSelected, ...other } = props;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useEffect(() => getAllNotifications, []);

  const getAllNotifications = () => {
    //const usernameStorage = Validaciones.getValueFromCookies();
/*
    axios
      .get(
        UrlServices.getAllNotificationsFromUser(),
        UrlServices.getAxiosConfig(usernameStorage)
      )
      .then((response) => {
        if (response.data.status === 1702) {
          setTotalNotif(response.data.totalItems);
        }
      })
      .catch((error) => {
        if (error.response.status !== null && error.response.status === 401)
          history("/login");
      });*/
  };

  const logout = () => {
    //const usernameStorage = Validaciones.getValueFromCookies();
    Services.saveValueInCookies("");
    history("/login");
/*
    axios
      .post(
        UrlServices.logoutUrl(),
        UrlServices.getAxiosConfig(usernameStorage)
      )
      .then((response) => {
        if (response.data.status === 1702) {
          Validaciones.saveValueInCookies(null);
          history("/login");
        }
      })
      .catch((error) => {
        if (error.response.status !== null && error.response.status === 401)
          history("/login");
      });*/
  };

  const handleClickReporte = () => {
    setOpenReport(!openReport);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position='fixed' sx={{ background: "white" }}>
        <Toolbar sx={{ background: "white" }}>
          <IconButton
           className='color-mediumGray'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{
              mr: 2,
              ...(open && { display: "none" }),
            }}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' color='gray' noWrap component='div'>
            {title}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
             <IconButton
              onClick={logout}
              size='large'
              aria-label='show 17 new notifications'
              className='color-mediumGray'>
              <ExitToAppIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <MuiDrawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant='persistent'
        anchor='left'
        open={open}>
        <DrawerHeader>
          <Typography
            className={"color-mediumGray"}
            variant='h6'
            noWrap
            component='div'>
            ADMINISTRADOR
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <CloseIcon className={"color-mediumGray"} />
            ) : (
              <CloseIcon className={"color-mediumGray"} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {itemsForDrawer.map((item,index) => (
            index === itemSelected
            ?
            <ListItemButton
              button
              className={"color-info"}
              key={item.label}
              href={item.link}
              onClick={() => history(item.link)}>
              <ListItemIcon className={"color-info"}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.label}
                
                className={"color-info"}
              />
            </ListItemButton>
            :
            <ListItemButton
              button
              className={"color-mediumGray"}
              key={item.label}
              href={item.link}
              onClick={() => history(item.link)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.label}
                
                className={"color-mediumGray"}
              />
            </ListItemButton>
          ))}
          </List>
      </MuiDrawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}

MiniDrawer.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
};

const itemsForReports = [
  {
    label: "Ofertas",
    icon: <LocalOfferIcon className={"color-mediumGray"} />,
    link: "/reportes/ofertasconsumidas",
  },
  {
    label: "Paquetes",
    icon: <ShoppingBagIcon className={"color-mediumGray"} />,
    link: "/reportes/paquetes",
  },
  {
    label: "Pagos",
    icon: <PaymentIcon className={"color-mediumGray"} />,
    link: "/reportes/pagos",
  },
  {
    label: "Membresias",
    icon: <CardMembershipIcon className={"color-mediumGray"} />,
    link: "/reportes/membresias",
  },
  {
    label: "Productos",
    icon: <ShoppingCartIcon className={"color-mediumGray"} />,
    link: "/reportes/productos",
  },
  {
    label: "Retiros",
    icon: <SaveAltIcon className={"color-mediumGray"} />,
    link: "/reportes/retiros",
  },
  {
    label: "Ganancias",
    icon: <LeaderboardIcon className={"color-mediumGray"} />,
    link: "/reportes/ganancias",
  },
  {
    label: "Ordenes",
    icon: <ReceiptIcon className={"color-mediumGray"} />,
    link: "/reportes/ordenes",
  },
];

const itemsForDrawer = [
  {
    label: "Inicio",
    icon: <HomeIcon className={"color-mediumGray"} />,
    link: "/",
  },
  {
    label: "Usuarios",
    icon: <PersonIcon className={"color-mediumGray"} />,
    link: "/users",
  },
  {
    label: "Trabajadores",
    icon: <PaymentIcon className={"color-mediumGray"} />,
    link: "/workers",
  },
  {
    label: "Dispositivos",
    icon: <ShoppingCartIcon className={"color-mediumGray"} />,
    link: "/devices",
  },
  
 
];
