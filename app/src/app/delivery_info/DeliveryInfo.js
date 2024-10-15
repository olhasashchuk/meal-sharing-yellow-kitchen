import { Typography, Stack, Box } from "@mui/material";
import DeliveryDiningRoundedIcon from "@mui/icons-material/DeliveryDiningRounded";
import AvTimerRoundedIcon from "@mui/icons-material/AvTimerRounded";
import LunchDiningRoundedIcon from "@mui/icons-material/LunchDiningRounded";

export const DeliveryInfo = () => {
  return (
    <Box sx={{ paddingBottom: 6 }}>
      <Typography variant="body1" sx={{ marginBottom: 4 }}>
        We strive to provide the best delivery service to ensure your meals arrive quickly and in perfect condition. Here’s everything you need to know about our delivery process:
      </Typography>

      <Stack direction="column" spacing={4}>
        <Box>
          <Stack direction="row" spacing={2} alignItems="center">
            <AvTimerRoundedIcon color="primary" fontSize="large" />
            <Typography variant="h5" component="h2">
              Fast Delivery
            </Typography>
          </Stack>
          <Typography variant="body1" sx={{ paddingTop: 1 }}>
            We deliver meals in all areas of town in less than 30 minutes. Thanks to our optimized logistics and close partnerships with local restaurants, you can enjoy your meal in no time!
          </Typography>
        </Box>

        <Box>
          <Stack direction="row" spacing={2} alignItems="center">
            <DeliveryDiningRoundedIcon color="primary" fontSize="large" />
            <Typography variant="h5" component="h2">
              Free Delivery
            </Typography>
          </Stack>
          <Typography variant="body1" sx={{ paddingTop: 1 }}>
            Enjoy free delivery on orders over €29. Whether you’re ordering for yourself or for a group, we make it easy and affordable to get your meal without extra costs.
          </Typography>
        </Box>

        <Box>
          <Stack direction="row" spacing={2} alignItems="center">
            <LunchDiningRoundedIcon color="primary" fontSize="large" />
            <Typography variant="h5" component="h2">
              Fresh and Ecological Products
            </Typography>
          </Stack>
          <Typography variant="body1" sx={{ paddingTop: 1 }}>
            All our meals are made with fresh, locally sourced, and ecological ingredients. We work closely with our suppliers to ensure the highest quality food is delivered to you.
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};