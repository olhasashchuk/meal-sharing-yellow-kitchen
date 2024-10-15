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

const dataAppDownload = [
  {href: 'https://play.google.com', src: './icons/googleplay.png',  alt: 'Google play'},
  {href: 'https://www.apple.com/app-store', src: './icons/appstore.png', alt: 'App Store'},
]

const dataSocialMedia = [
  {href: 'https://facebook.com', icon: <FacebookIcon fontSize="small"/>},
  {href: 'https://instagram.com', icon: <InstagramIcon fontSize="small"/>},
  {href: 'https://x.com', icon: <TwitterIcon fontSize="small"/>},
]

const dataAboutUs = [
  {name: 'Concept', href: '/aboutus'},
  {name: 'Franchise', href: '/aboutus'},
  {name: 'Business', href: '/aboutus'},
  {name: 'Restaurant signup', href: '/aboutus'},
]

const dataGetHelp = [
  {name: 'Read FAQs', href: '/'},
  {name: 'Restaurants', href: '/restaurants'},
  {name: 'Meals', href: '/meals'},
  {name: 'Delivery info', href: '/delivery'}
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
            spacing={4}
          >
            <Stack>
              <Link href={'/'} sx={{ 
                display: 'block', 
                textDecoration: 'none', 
                paddingBottom: 4, 
                marginBottom: 4,
                borderBottom: `2px solid ${theme.palette.text.footer}`, 
                }}>
                <Logo isFooter />
              </Link>
              <Stack direction="row" spacing={1} sx={{ marginBottom: 2 }}>
                {dataAppDownload.map((item, index) => (
                  <List key={`item-${index}`}>
                    <ListItem sx={{ padding: 0 }}>
                      <Link href={item.href} color="inherit">
                        <img
                          src={item.src}
                          alt={item.alt}
                          style={{
                            width: "120px",
                            height: "auto",
                            objectFit: "cover",
                          }}
                        />
                      </Link>
                    </ListItem>
                  </List>
                ))}
              </Stack>
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
              spacing={6}
            >
              <Box>
                <Typography variant="h5" component="h5" sx={{ paddingBottom: 2 }}>
                  About us
                </Typography>
                {dataAboutUs.map((item, index) => (
                  <List key={`item-${index}`}>
                    <ListItem sx={{ padding: 0 }}>
                      <Link href={item.href} sx={{ display: 'block', textDecoration: 'none', color: "inherit" }}>
                        {item.name}
                      </Link> 
                    </ListItem>
                  </List>
                ))}
              </Box>   
              <Box>
                <Typography variant="h5" component="h5" sx={{ paddingBottom: 2 }}>
                  Get help
                </Typography>
                {dataGetHelp.map((item, index) => (
                  <List key={`item-${index}`}>
                    <ListItem sx={{ padding: 0 }}>
                      <Link href={item.href} sx={{ display: 'block', textDecoration: 'none', color: "inherit" }}>
                        {item.name}
                      </Link> 
                    </ListItem>
                  </List>
                ))}
              </Box> 
              <Box>
                <Typography variant="h5" component="h5" sx={{ paddingBottom: 1 }}> 
                  Contact us
                </Typography>
                <address>
                  <List sx={{ fontStyle: 'normal', color: "inherit" }} >
                    <ListItem sx={{ paddingX: 0 }}>
                      Yellow Kitchen Town
                    </ListItem>
                    <ListItem sx={{ paddingX: 0 }}>
                      Yellow Kitchen Street Name, 1/2
                    </ListItem>
                    <ListItem sx={{ paddingX: 0 }}>
                      0800 111 000
                    </ListItem>
                    <ListItem sx={{ paddingX: 0 }}>
                      <Link href="mailto:contact@yellowkitchen.com" variant="body1" sx={{ display: 'block', textDecoration: 'none', color: "inherit", padding: 0 }}>
                        contact@yellowkitchen.com
                      </Link>
                    </ListItem>
                  </List>
                </address>
              </Box>
            </Stack>
          </Stack>

          <Typography variant="body2" align="left" sx={{ marginTop: 4 }}>
            © {new Date().getFullYear()} Developed by Olha Sashchuk
          </Typography>
        </Container>
    </Stack>
  );
};

export default Footer;
