import { Typography, Stack, Link, Button } from "@mui/material";

export const TitleMainSection = ({title, link }) => {

  return (
    <>
      <Stack
        direction="row" 
        spacing={1} 
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2
        }}
      >
        <Typography variant="h5" component="h5" sx={{
          letterSpacing: '0.08em',
          textAlign: 'left',
          paddingBottom: 2 }}>
          {title}
        </Typography>
        <Link href={link}>
          <Button variant="text" color="primary">Show all</Button>
        </Link>
      </Stack>
      </>
  )
}