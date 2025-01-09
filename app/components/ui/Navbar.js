"use client";
import { useState } from "react";
import {
  Box,
  Stack,
  AppBar,
  Toolbar,
  Container,
  IconButton,
  Badge,
  Link
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Logo } from "./Logo";
import MenuRight from "./MenuRight";
import { useThemeContext } from "../contexts/ThemeContext";
import CartModal from "../meals/CartModal";
import { useModal } from "../contexts/ModalContext";
import { useCart } from "../contexts/CartContext";

export const Navbar = () => {
  const { isDarkMode, handleThemeChange, darkTheme, lightTheme } =
    useThemeContext();
  const theme = isDarkMode ? darkTheme : lightTheme;
  const { open, handleOpen, handleClose } = useModal();
  const { cartMeals } = useCart();
  const countCart = cartMeals.reduce((total, item) => total + item.quantity, 0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <Box>
      <AppBar
        position="fixed"
        style={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
        <Container fixed>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link href={'/'} sx={{ display: 'block', textDecoration: 'none' }}>
              <Logo isDarkMode={isDarkMode} />
            </Link>
            <Stack direction="row" spacing={{ xs: 0.5, sm: 2 }}>
              <IconButton color="inherit" onClick={handleOpen}>
                <Badge color="primary" overlap="circular" badgeContent={countCart}>
                  <ShoppingBagIcon fontSize="large" />
                </Badge>  
              </IconButton>
              <Link href={`/reservations`} >
                <IconButton color="inherit" disabled= {cartMeals.length === 0}>
                  <MenuBookIcon fontSize="large" />
                </IconButton> 
              </Link>
              <IconButton
                onClick={handleThemeChange}
                color="inherit"
                size="large"
              >
                {isDarkMode ? (
                  <LightModeIcon color="primary" />
                ) : (
                  <DarkModeIcon />
                )}
              </IconButton>
              <IconButton
                edge="start"
                size="large"
                color="inherit"
                aria-label="menu"
                sx={{ ml: 2 }}
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <MenuRight open={drawerOpen} toggleDrawer={toggleDrawer} />
      <CartModal open={open} handleClose={handleClose} />
    </Box>
  );
};
