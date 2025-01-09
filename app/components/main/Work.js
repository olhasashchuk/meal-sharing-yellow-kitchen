import { Typography, Stack, Card, CardContent } from "@mui/material";

const deliverySteps = [
  {
    title: 'Pick Meals',
    description: 'Choose from our weekly menu featuring a wide variety of dishes tailored to different tastes. From healthy options to indulgent treats, there’s something for everyone. Meal planning has never been easier or more exciting!',
  },
  {
    title: 'Fast Deliveries',
    description: 'Your 15-minute dinner kits arrive in a refrigerated box, ensuring fresh ingredients at your doorstep. We prioritize fast and reliable deliveries to fit your busy schedule. Enjoy hassle-free mealtime with meals that come ready to cook!',
  },
  {
    title: 'Tasty Meals',
    description: 'At Yellow Kitchen, we prepare delicious, nutritious meals that are quick to make. Spend less time cooking and more time relaxing with your family. Every meal is crafted to bring flavor and convenience to your table.',
  },
];

export const Work = () => {
  return (
    <>
      <Typography variant="h5" component="h5" sx={{
        letterSpacing: '0.08em',
        textAlign: 'left',
        paddingBottom: 4 }}>
        How it works
      </Typography>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{ alignItems: { xs: "center", md: "center"}, paddingBottom: 8 }}
      >
        {deliverySteps.map((item, index) => (
          <Card sx={{ maxWidth: '100%', minHeight: { xs: 200, md: 300}}} key={index}>
          <CardContent>
            <Typography variant="h6" component="h6" sx={{ borderBottom: 2, borderColor: "rgba(255, 225, 69, 1)", paddingBottom: 2, marginBottom: 4 }}>{item.title}</Typography>
            <Typography variant="body1" component="p">
              {item.description}
            </Typography>
          </CardContent>
        </Card>
        ))}
      </Stack>
    </>
  );
};