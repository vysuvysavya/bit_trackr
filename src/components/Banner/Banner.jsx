import { Container, Typography, Box } from "@mui/material";
import Carousel from "./Carousel";

const Banner = () => {
  return (
    <Box
      sx={{
        backgroundImage: "url(./banner2.jpg)",
        height: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        paddingTop: 3,
      }}
    >
      <Container>
        <Box sx={{ height: "40%", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
          <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2, fontFamily: "Montserrat" }}>
            BitTrackr
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "darkgrey", textTransform: "capitalize", fontFamily: "Montserrat" }}>
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </Box>
        <Box sx={{ height: "50%", display: "flex", alignItems: "center" }}>
          <Carousel />
        </Box>
      </Container>
    </Box>
  );
};

export default Banner;
