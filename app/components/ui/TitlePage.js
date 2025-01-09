import { Typography } from "@mui/material";

export const TitlePage = ({ title }) => {

  return (
    <>
      <Typography variant="h4" component="h4" sx={{
        letterSpacing: '0.08em',
        textAlign: 'left',
        paddingBottom: 6 }}>
        {title}
      </Typography>
    </>
  )
}