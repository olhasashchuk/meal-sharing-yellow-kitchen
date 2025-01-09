import PropTypes from 'prop-types';
import localFont from "next/font/local";
import { Navbar } from "../../components/ui/Navbar";
import ThemeProviderClient from "../../components/contexts/ThemeContext";
import ThemeProviderFonts from "../../components/contexts/ThemeFonts";
import { ModalProvider } from "../../components/contexts/ModalContext";
import { CartProvider } from "../../components/contexts/CartContext";
import { AvailableSpotsProvider } from "../../components/contexts/AvailableSpotsContext";
import Footer from "../../components/ui/Footer";
import { Box } from "@mui/material";

const poppinsLight = localFont({
  src: "../../fonts/Poppins-Light.woff",
  variable: "--font-poppins-light",
  weight: "300",
});

const martelSansBold = localFont({
  src: "../../fonts/MartelSans-Bold.woff",
  variable: "--font-martel-sans-bold",
  weight: "700",
});

const martelSansRegular = localFont({
  src: "../../fonts/MartelSans-Regular.woff",
  variable: "--font-martel-sans-regular",
  weight: "400",
});

export const metadata = {
  title: "Yellow Kitchen",
  description: "Meal-sharing app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${martelSansRegular.variable} ${martelSansBold.variable} ${poppinsLight.variable}`}
      >
        <ThemeProviderFonts>
          <ThemeProviderClient>
            <ModalProvider>
              <CartProvider>
                <AvailableSpotsProvider>
                <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      minHeight: "100vh",
                    }}
                  >
                    <Navbar />
                    <Box sx={{ flex: 1 }}>{children}</Box>
                    <Footer />
                </Box>
                </AvailableSpotsProvider>
              </CartProvider>
            </ModalProvider>
          </ThemeProviderClient>
        </ThemeProviderFonts>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
