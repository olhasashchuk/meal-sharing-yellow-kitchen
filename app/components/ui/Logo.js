import { Box, Stack, Typography } from "@mui/material";
import { useThemeContext } from "../contexts/ThemeContext";

export const Logo = ( { isFooter }) => {
  const { isDarkMode, darkTheme, lightTheme } = useThemeContext();
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <Stack
      sx={{
        position: "relative",
        width: {
          xs: "140px",
          sm: "184px",
        },
        height: {
          xs: "20px",
          sm: "24px",
        },
        flexGrow: 1,
        justifyContent: "center",
      }}
    >
      <Typography
        sx={{
          color: isFooter ? theme.palette.text.footer : theme.palette.text.primary,
          fontSize: {
            xs: 20,
            sm: 26,
          },
          letterSpacing: {
            xs: 2,
            sm: 3,
          },
          zIndex: 1, 
          position: "relative",
          "&::before": {
            backgroundColor: "rgba(255, 225, 69, 1)",
            content: '""',
            position: "absolute",
            top: {
              xs: "7px",
              sm: "9px",
            },
            left: 0,
            right: 0,
            width: {
              xs: "70px",
              sm: "94px",
            },
            height: {
              xs: "8px",
              sm: "10px",
            },
            zIndex: -1,
          },
        }}
      >
        <Box component="span" sx={{ fontWeight: 600 }}>
          yellow
        </Box>
        kitchen
      </Typography>
    </Stack>
  );
};