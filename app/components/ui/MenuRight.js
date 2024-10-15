import {
  Box,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Link,
  Typography,
} from "@mui/material";
import { useThemeContext } from "../contexts/ThemeContext";

const navbarItems = [
  {
    title: "About us",
    link: "/about_us",
  },
  {
    title: "Meals",
    link: "/meals",
  },
  {
    title: "Restaurants",
    link: "/restaurants",
  },
  {
    title: "Delivery info",
    link: "/delivery_info",
  }
];

export default function MenuRight({ open, toggleDrawer }) {
  const { isDarkMode, darkTheme, lightTheme } = useThemeContext();
  const theme = isDarkMode ? darkTheme : lightTheme;
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {navbarItems.map((item, index) => (
          <ListItem key={`NavItem-${index}`} disablePadding>
            <ListItemButton>
              <Link href={item.link} underline="none">
                <ListItemText
                  secondary={
                    <Typography sx={{ color: theme.palette.text.primary }}>
                      {item.title}
                    </Typography>
                  }
                />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      {list("right")}
    </SwipeableDrawer>
  );
}
