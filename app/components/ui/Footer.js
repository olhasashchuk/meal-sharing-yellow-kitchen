"use client";
import {
  Box,
  Stack,
  Container,
  IconButton,
  Typography,
  Link,
  List,
  ListItem
} from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Logo } from "./Logo";
import { useThemeContext } from "../contexts/ThemeContext";

const dataSocialMedia = [
  {href: 'https://facebook.com', icon: <FacebookIcon fontSize="small"/>},
  {href: 'https://instagram.com', icon: <InstagramIcon fontSize="small"/>},
  {href: 'https://x.com', icon: <TwitterIcon fontSize="small"/>},
]

const dataAboutUs = [
  {name: 'About us', href: '/about_us'},
  {name: 'Delivery info', href: '/delivery'},
]

const dataGetHelp = [
  {name: 'Meals', href: '/meals'},
  {name: 'Restaurants', href: '/restaurants'},
]

const Footer = () => {
  const { isDarkMode, darkTheme, lightTheme } = useThemeContext();
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <Stack sx={{ 
      backgroundColor: theme.palette.background.footer, 
      color: theme.palette.text.footer,
      paddingY: 6
      }}>
        <Container fixed>
          <Stack 
            direction={{ xs: "column", md: "row" }}
            sx={{ justifyContent: "space-between", marginBottom: 4 }}
          >
            <Stack>
              <Link href={'/'} sx={{ 
                display: 'block', 
                textDecoration: 'none', 
                paddingBottom: 4, 
                marginBottom: 2,
                borderBottom: `2px solid ${theme.palette.text.footer}`, 
                }}>
                <Logo isFooter />
              </Link>

              <Stack direction="row" spacing={1}>
                {dataSocialMedia.map((item, index) => (
                  <List key={`item-${index}`}>
                    <ListItem sx={{ padding: 0 }}>
                      <Link href={item.href} color="inherit">
                        <IconButton sx={{ color: 'inherit' }}>
                          {item.icon}
                        </IconButton> 
                      </Link> 
                    </ListItem>
                  </List>
                ))}
              </Stack>
            </Stack>

            <Stack 
              direction={{ xs: "column", sm: "row" }}
              spacing={{sm: "24px"}} 
            >
              <Box>
                {dataAboutUs.map((item, index) => (
                  <List key={`item-${index}`}>
                    <ListItem sx={{ padding: 0 }}>
                      <Typography variant="body1" component="p" sx={{ paddingBottom: 1, fontWeight: 600 }}>
                        {item.name}
                      </Typography>  
                    </ListItem>
                  </List>
                ))}
              </Box>   
              <Box>
                {dataGetHelp.map((item, index) => (
                  <List key={`item-${index}`}>
                    <ListItem sx={{ padding: 0 }}>
                      <Link href={item.href} sx={{ display: 'block', textDecoration: 'none', color: "inherit" }}>
                        <Typography variant="body1" component="p" sx={{ paddingBottom: 1, fontWeight: 600 }}>
                          {item.name}
                        </Typography> 
                      </Link> 
                    </ListItem>
                  </List>
                ))}
              </Box> 
            </Stack>
          </Stack>

          <Typography variant="body2" align="left">
            © {new Date().getFullYear()} Developed by Olha Sashchuk
          </Typography>
        </Container>
    </Stack>
  );
};

export default Footer;
