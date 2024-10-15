import { Typography, Stack, Box } from "@mui/material";

const dataAboutUs = [
  { name: 'Concept', description: 'Our concept is simple: bring the food court experience to your home. We aim to create a space where anyone can find and share delicious meals, from local home cooks to established restaurants. With just a few clicks, you can enjoy a diverse selection of meals tailored to your preferences.' },
  { name: 'Franchise', description: 'We offer unique opportunities for restaurants to become part of our growing platform. Whether you\'re a small local business or a larger chain, our franchise model makes it easy for you to expand your reach and serve more customers who are passionate about good food.' },
  { name: 'Business', description: 'Our platform is built on a strong business foundation, focusing on collaboration with restaurants, food providers, and home chefs. We provide a seamless and easy-to-use system for food providers to connect with a wide audience, ensuring quality and convenience for both sellers and buyers.' },
  { name: 'Restaurant Signup', description: 'Are you a restaurant owner? Join us and become part of a community that celebrates the joy of food. Signing up is quick and easy, giving you access to a larger customer base while ensuring that you can focus on what matters most—creating great meals.' },
];

export const AboutUs = () => {
  return (
    <Box sx={{ paddingBottom: 6 }}>
      <Typography variant="body1" sx={{ marginBottom: 4 }}>
        At our meal-sharing platform, we believe in connecting people through food. Whether you&apos;re looking to enjoy a meal from your favorite restaurant or share your own culinary creations, we&apos;re here to make it happen. Here&apos;s more about what drives us:
      </Typography>

      <Stack spacing={4}>
        {dataAboutUs.map((section, index) => (
          <Box key={index} sx={{ borderBottom: 1, borderColor: "divider", paddingBottom: 2 }}>
            <Typography variant="h5" component="h5" sx={{
              letterSpacing: '0.08em',
              textAlign: 'left',
              paddingBottom: 2 }}>
              {section.name}
            </Typography>
            <Typography variant="body1" component="p">{section.description}</Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};
