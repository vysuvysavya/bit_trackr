import {
  CircularProgress,
  Box,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";
import { HistoricalChart } from "../config/api";
import SelectButton from "./SelectButton";
import { chartDays } from "../config/data";
import { CryptoState } from "../CryptoContext";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [flag, setFlag] = useState(false);

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setFlag(true);
    setHistoricData(data.prices);
  };

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  const darkTheme = createTheme({
    palette: {
      primary: { main: "#fff" },
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ width: { xs: "100%", md: "75%" }, p: { xs: 2, md: 5 }, display: "flex", flexDirection: "column", alignItems: "center" }}>
        {!historicData || !flag ? (
          <CircularProgress size={250} thickness={1} sx={{ color: "gold" }}  />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  const date = new Date(coin[0]);
                  const time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [{ data: historicData.map((coin) => coin[1]), label: `Price ( Past ${days} Days ) in ${currency}`, borderColor: "#EEBC1D" }],
              }}
              options={{ elements: { point: { radius: 1 } } }}
            />
            <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2, width: "100%" }}>
              {chartDays.map((day) => (
                <SelectButton key={day.value} onClick={() => { setDays(day.value); setFlag(false); }} selected={day.value === days}>
                  {day.label}
                </SelectButton>
              ))}
            </Box>
          </>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default CoinInfo;
