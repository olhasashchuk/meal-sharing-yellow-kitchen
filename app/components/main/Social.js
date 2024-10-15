import * as React from 'react';
import { Typography, Stack, Card, CardContent, CardActions, Link, IconButton, ImageList, ImageListItem, Button } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

const imageData = [
  { title: 'kitchen1', image: './social/image1.png' },
  { title: 'kitchen2', image: './social/image2.png' },
  { title: 'kitchen3', image: './social/image3.png' },
  { title: 'kitchen4', image: './social/image1.png' },
];

export const dataSocialMedia = [
  { 
    href: 'https://facebook.com',
    icon: <FacebookIcon fontSize="large" />,
    date: '24 Jun at 16:20 pm',
    comment: 'Great service and delicious food! Will definitely order again. The delivery was fast, and everything was hot and fresh. My family loved it, especially the desserts!'  // Отзыв от пользователя на Facebook
  },
  { 
    href: 'https://instagram.com',
    icon: <InstagramIcon fontSize="large" />,
    date: '25 Jun at 14:10 pm',
    comment: 'Loved the ambiance and the dishes were superb. Highly recommend! The presentation of the meals was beautiful, and the staff was very friendly. Will come back for sure!',
    hasImages: true
  },
  { 
    href: 'https://x.com',
    icon: <TwitterIcon fontSize="large" />,
    date: '26 Jun at 16:20 pm',
    comment: 'Quick delivery and tasty meals! Would order again without a doubt. I was pleasantly surprised by the variety of dishes. The portions were generous and well worth the price.'
  }
];

export const Social = () => {
  return (
    <>
      <Typography variant="h5" component="h2" sx={{
        letterSpacing: '0.08em',
        textAlign: 'left',
        paddingBottom: 4
      }}>
        We are in social
      </Typography>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{ alignItems: { xs: "center", md: "center" }, paddingBottom: 8 }}
      >
        {dataSocialMedia.map((social, index) => (
          <Card key={index} sx={{ maxWidth: '100%', height: 350, flex: 1 }}>
            <CardContent>
              <CardActions sx={{
                borderBottom: 2,
                borderColor: "rgba(255, 225, 69, 1)",
                paddingBottom: 2,
                marginBottom: 4,
                display: "flex",
                justifyContent: "space-between"
              }}>
                <Link href={social.href} color="inherit">
                  <IconButton sx={{ color: 'inherit' }}>
                    {social.icon}
                  </IconButton>
                </Link>
                <Link href={social.href} color="inherit">
                  <Button variant="text" color="primary">
                    Follow us
                  </Button>
                </Link>
              </CardActions>
              {social.hasImages ? (
                <ImageList sx={{ width: "100%", height: "100%", overflow: "hidden" }} cols={2} rowHeight={100}>
                  {imageData.map((item) => (
                    <ImageListItem key={item.title}>
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              ) : (
                <>
                  <Typography variant="body1" component="p" sx={{ paddingBottom: 2 }}>{social.date}</Typography>
                  <Typography variant="body1" component="p">{social.comment}</Typography>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </Stack>
    </>
  );
}


