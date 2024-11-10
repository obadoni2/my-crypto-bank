import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
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
import { Line } from "react-chartjs-2";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CryptoGraphs = () => {
  const [cryptos, setCryptos] = useState(null);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState();
  const [range, setRange] = useState(30);
  const [options, setOptions] = useState({
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  });

  useEffect(() => {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
    axios.get(url).then((response) => {
      setCryptos(response.data);
    });
  }, []);

  useEffect(() => {
    if (!selected) return;
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${
          selected?.id
        }/market_chart?vs_currency=usd&days=${range}&${
          range === 1 ? "interval=hourly" : `interval=daily`
        }`
      )
      .then((response) => {
        console.log(response.data);
        setData({
          labels: response.data.prices.map((price) => {
            return moment
              .unix(price[0] / 1000)
              .format(range === 1 ? "HH:MM" : "MM-DD");
          }),
          datasets: [
            {
              label: "Value in $: ",
              data: response.data.prices.map((price) => {
                return price[1].toFixed(2);
              }),
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        });
        setOptions({
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text:
                `${selected?.name} Price Over Last ` +
                range +
                (range === 1 ? " Day." : " Days."),
            },
          },
        });
      });
  }, [selected, range]);

  return (
    <div>
      <select
        className="form__input form__input--to"
        onChange={(e) => {
          const c = cryptos?.find((x) => x.id === e.target.value);
          setSelected(c);
        }}
        defaultValue="default"
      >
        <option value="default">Choose an option</option>
        {cryptos
          ? cryptos.map((crypto) => {
              return (
                <option key={crypto.id} value={crypto.id}>
                  {crypto.name}
                </option>
              );
            })
          : null}
      </select>
      <select
        className="form__input form__input--to"
        onChange={(e) => {
          setRange(parseInt(e.target.value));
        }}
      >
        <option value={30}>30 Days</option>
        <option value={7}>7 Days</option>
        <option value={1}>1 Day</option>
      </select>
      {data ? (
        <div>
          <Line options={options} data={data} />
        </div>
      ) : null}
    </div>
  );
};

export default CryptoGraphs;
