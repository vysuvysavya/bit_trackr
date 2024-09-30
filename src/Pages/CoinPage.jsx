import { LinearProgress, Typography, Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { numberWithCommas } from "../components/CoinsTable";
import { CryptoState } from "../CryptoContext";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "center", md: "start" },
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "30%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 3,
          borderRight: "2px solid grey",
          padding: { xs: 2, md: 4 },
        }}
      >
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          {coin?.name}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            width: "100%",
            padding: 2,
            textAlign: "justify",
          }}
        >
          {parse(coin?.description.en.split(". ")[0])}.
        </Typography>
        <Box
          sx={{
            alignSelf: "start",
            width: "100%",
            display: { xs: "flex", md: "block" },
            justifyContent: { xs: "space-around" },
            flexDirection: { sm: "column", xs: "column" },
            paddingTop: 2,
          }}
        >
          <Box sx={{ display: "flex", marginBottom: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5">{numberWithCommas(coin?.market_cap_rank)}</Typography>
          </Box>

          <Box sx={{ display: "flex", marginBottom: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5">
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", marginBottom: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5">
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </Box>
        </Box>
      </Box>

      <CoinInfo coin={coin} />
    </Box>
  );
};

export default CoinPage;
