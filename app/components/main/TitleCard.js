import { Typography, Stack, Box, Button, Link } from "@mui/material";
import DeliveryDiningRoundedIcon from "@mui/icons-material/DeliveryDiningRounded";
import AvTimerRoundedIcon from "@mui/icons-material/AvTimerRounded";
import LunchDiningRoundedIcon from "@mui/icons-material/LunchDiningRounded";

export const TitleCard = () => {
  return (
    <>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{ alignItems: { xs: "center", md: "center" }, paddingBottom: 8 }}
      >
        <Stack
          direction="column"
          spacing={2}
          sx={{ flex: "40%", justifyContent: "center" }}
        >
          <Typography
            gutterBottom
            variant="h2"
            component="div"
            sx={{ color: "text.primary", fontSize: { xs: "2rem", md: "4rem" } }}
          >
            Your Food court at home
          </Typography>
          <Link href={'/meals'} >
            <Button variant="contained" color="primary">Meals of the day</Button>
          </Link>
          <Stack direction="row" spacing={4} sx={{ paddingY: 4 }}>
            <Box sx={{ flex: 1 }}>
              <AvTimerRoundedIcon color="primary" fontSize="large" />
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Delivery in all town in less than 30 minutes
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <DeliveryDiningRoundedIcon color="primary" fontSize="large" />
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Free delivery from €29
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <LunchDiningRoundedIcon color="primary" fontSize="large" />
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Only fresh and ecological products
              </Typography>
            </Box>
          </Stack>
        </Stack>
        <Box sx={{ flex: { xs: "100%", md: "50%" } }}>
          <img
            src="./image-titlePhoto.png"
            alt="Food court"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
            }}
          />
        </Box>
      </Stack>
    </>
  );
};
