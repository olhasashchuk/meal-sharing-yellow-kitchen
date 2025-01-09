"use client";
import { Stack } from "@mui/material";
import { useThemeContext } from "../contexts/ThemeContext";

export const SectionFrame = ({ children }) => {
  const { isDarkMode, darkTheme, lightTheme } =
  useThemeContext();
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <Stack 
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      marginBottom={4}
      sx={{ 
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        padding: 4,
        borderRadius: 2,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {children}
    </Stack>
  )
}